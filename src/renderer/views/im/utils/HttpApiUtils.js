import conf from '../conf';
import { timeoutFetch } from './chatUtils';

class HttpApiUtils {
  constructor(store) {
    this.store = store;
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
      5000
    );


  }
}