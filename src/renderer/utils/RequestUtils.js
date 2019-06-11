import { ErrorType } from '../views/im/utils/chatUtils';
import conf from '../views/im/conf/index.js';

class RequestUtils {
  constructor() {
    this.instance = null;
    this.isRefreshing = false;
    this.subscribers = [];
    this.token = null;
  }

  /**
   * 单例构造方法，构造一个广为人知的接口，供用户对该类进行实例化
   * @returns {RequestUtils}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new RequestUtils();
    }
    return this.instance;
  }

  /**
   * 带token的请求
   * @param url 请求路径
   * @param options 请求参数
   * @returns {Promise<Response | never>}
   */
  request(url, options) {
    let self = this;
    options.set('access_token', self.token.access_token);
    return self.timeoutFetch(fetch(url, {
      method: 'POST',
      model: 'cros', //跨域
      headers: {
        Accept: 'application/json'
      },
      body: options
    }), 5000)
      .then(response => {
        return self.checkStatus(response, url, options);
      })
      .then(json => {
        console.log(json);
        return new Promise(resolve => {
          resolve(json);
        });
      });
  }

  /**
   * 检查token 是否失效，如果失效，刷新token
   * @param response 拦截的请求 response
   * @param url 请求路径
   * @param options 请求参数
   * @returns {Promise<any>|*}
   */
  checkStatus(response, url, options) {
    // eslint-disable-next-line no-console
    console.log('checkStatus', response.status);
    let self = this;
    if (response && response.status === 401) {
      // eslint-disable-next-line no-console
      console.log('response.status', response.status);

      // 这个Promise函数很关键
      let p = new Promise((resolve) => {
        self.addSubscriber(() => {
          resolve(self.request(url, options));
        });
      });
      // eslint-disable-next-line no-console
      console.log('isRefreshing', self.isRefreshing);
      // 刷新token的函数,这需要添加一个开关，防止重复请求
      if (!self.isRefreshing) {
        self.isRefreshing = true;
        self.flushToken();
      }
      return p;
    } else {
      return response;
    }
  }

  /**
   * 重新执行token 失效的函数
   */
  onAccessTokenFetched() {
    let self = this;
    // eslint-disable-next-line no-console
    console.log('subscribers', self.subscribers);
    self.subscribers.forEach((callback) => {
      callback();
    });
    self.subscribers = [];
  }

  /**
   * 把请求的token 失效的函数放到 subscribers
   * @param callback 请求的token 失效的函数
   */
  addSubscriber(callback) {
    let self = this;
    // eslint-disable-next-line no-console
    console.log('addSubscriber', callback);
    self.subscribers.push(callback);
    // eslint-disable-next-line no-console
    console.log('this.subscribers', self.subscribers);
  }

  /**
   * 用户登录的方法
   * @param username 用户名
   * @param password 密码
   * @returns {Promise<Response>} 登录状态
   */
  login(username, password) {
    let self = this;
    let param = new FormData();
    param.set('client_id', 'v-client');
    param.set('client_secret', 'v-client-ppp');
    param.set('grant_type', 'password');
    param.set('scope', 'select');
    param.set('username', username.trim());
    param.set('password', password.trim());
    return fetch(conf.getTokenUrl(), {
      method: 'POST',
      model: 'cros', //跨域
      headers: {
        Accept: 'application/json'
      },
      body: param
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          return new Promise((resolve, reject) => {
            reject('用户名密码错误');
          });
        } else {
          return new Promise((resolve, reject) => {
            reject('服务器错误');
          });
        }
      }).then(json => {
        self.token = json;
        sessionStorage.setItem("token",json.access_token);
        self.isRefreshing = false;
        setTimeout(function() {
          self.isRefreshing = true;
          self.flushToken();

        }, ((json.expires_in - 10) * 1000));
        return new Promise((resolve) => {
          resolve(json);
        });
      });
  }

  /**
   * 刷新token
   * @returns {Promise<Response | never>}
   */
  flushToken() {
    console.log('刷新token');
    let self = this;
    self.isRefreshing = true;
    let param = new FormData();
    param.set('client_id', 'v-client');
    param.set('client_secret', 'v-client-ppp');
    param.set('grant_type', 'refresh_token');
    param.set('scope', 'select');
    param.set('refresh_token', self.token.refresh_token);
    fetch(conf.getTokenUrl(), {
      method: 'POST',
      model: 'cros', //跨域
      headers: {
        Accept: 'application/json'
      },
      body: param
    })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log('刷新token response.status', response.status);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          return new Promise((resolve, reject) => {
            reject('刷新token错误：请退出重新登录');
          });
        } else {
          return new Promise((resolve, reject) => {
            reject('刷新token错误：服务器错误');
          });
        }
      })
      .then(json => {
        self.token = json;
        sessionStorage.setItem("token",json.access_token);
        self.onAccessTokenFetched();
        self.isRefreshing = false;

        setTimeout(function() {
          self.flushToken();
        }, ((json.expires_in - 10) * 1000));
      })
      .catch(error => {
        console.log(error);
        self.isRefreshing = false;
      });
  }

  timeoutFetch(fetchPromise, timeout) {
    let abortFn = null;

    //这是一个可以被reject的promise
    let abortPromise = new Promise(function(resolve, reject) {
      abortFn = function() {
        reject(ErrorType.TIMEOUT_ERROR);
      };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortAblePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(function() {
      abortFn();
    }, timeout);

    return abortAblePromise;
  }
}

export default RequestUtils;
