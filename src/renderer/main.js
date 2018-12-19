import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";

import iView from "iview";
import "iview/dist/styles/iview.css"; // 使用 CSS
import { dateStr, formatDateTime } from "./views/im/utils/chatUtils.js";
import VueParticles from "vue-particles";

Vue.use(VueParticles);
Vue.use(iView);
Vue.prototype.formatDateTime = formatDateTime;
Vue.prototype.dateStr = dateStr;

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
