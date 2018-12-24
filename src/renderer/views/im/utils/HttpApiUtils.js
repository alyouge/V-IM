import conf from '../conf';
import { ErrorType, timeoutFetch, tokenFetch } from './chatUtils';

class HttpApiUtils {
  constructor() {
    this.timeOutTime = 5000; //请求超时时间
  }

  /**
   * 用户登录
   * @param formData 参数
   * @returns {Promise<any>} 返回 Promise
   */
  login(formData) {
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


  }

  /**
   * 初始化信息
   * @returns {Promise<any>}
   */
  initInfo(){
    return timeoutFetch(tokenFetch(conf.getInitUrl(), new FormData()),this.timeOutTime);
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
      this.timeOutTime
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