import conf from '../conf';
import { ErrorType, timeoutFetch, tokenFetch } from './chatUtils';

class HttpApiUtils {
  constructor(vueObj) {
    this.vueObj = vueObj;
    this.timeOutTime = 5000; //请求超时时间
  }

  /**
   * 用户登录
   * @param formData 参数
   * @returns {Promise<any>} 返回 Promise
   */
  login(formData) {
    let self = this;
    return timeoutFetch(
      fetch(conf.getTokenUrl(), {
        method: 'POST',
        model: 'cros', //跨域
        headers: {
          Accept: 'application/json'
        },
        body: formData
      }),
      this.timeOutTime
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          return new Promise((resolve, reject) => {
            reject(ErrorType.TOKEN_ERROR);
          });
        } else {
          return new Promise((resolve, reject) => {
            reject(ErrorType.SERVER_ERROR);
          });
        }
      })
      .then(token => {
        //提前10秒刷新 token
        setTimeout(function() {
          self.flushToken();
        }, (token.expires_in - 10) * 1000);

        self.vueObj.$store.commit('setToken', token);
        self.vueObj.$store.commit('setTokenStatus', true);
        //获取用户好友
        return tokenFetch(conf.getInitUrl(), new FormData());
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          return new Promise((resolve, reject) => {
            reject(ErrorType.TOKEN_ERROR);
          });
        } else {
          return new Promise((resolve, reject) => {
            reject(ErrorType.SERVER_ERROR);
          });
        }
      })
      .then(json => {
        //个人信息
        self.vueObj.$store.commit('setUser', json.me);
        //好友
        self.vueObj.$store.commit('setUserFriendList', json.friends);
        //群
        self.vueObj.$store.commit('setChatGroupList', json.groups);

        // 跳转到index 页面
        self.vueObj.$router.push({
          path: '/index/chatBox',
          params: {}
        });
      })

  }

  /**
   * 刷新token
   * @param flushTokenTimerId
   */
  flushToken() {
     let param = new FormData();
    param.set('client_id', 'v-client');
    param.set('client_secret', 'v-client-ppp');
    param.set('grant_type', 'refresh_token');
    param.set('scope', 'select');
    param.set('refresh_token', sessionStorage.getItem('refresh_token'));
    return timeoutFetch(
      fetch(conf.getTokenUrl(), {
        method: 'POST',
        model: 'cros', //跨域
        headers: {
          Accept: 'application/json'
        },
        body: param
      }),
      5000
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return new Promise((resolve, reject) => {
            reject(ErrorType.FLUSH_TOKEN_ERROR);
          });
        }
      })
  }
}


export default HttpApiUtils;