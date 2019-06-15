import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用 CSS
import VueParticles from 'vue-particles';

Vue.use(VueParticles);
Vue.use(iView);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
if (process.env.IS_WEB) {
  Vue.prototype.winControl = require('../main/webControl').default;
}else {
  Vue.prototype.winControl = require('../main/windowControl').default;
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
