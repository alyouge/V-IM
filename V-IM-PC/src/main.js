import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import { dateStr, formatDateTime } from "./utils/ChatUtils.js";
Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.prototype.formatDateTime = formatDateTime;
Vue.prototype.dateStr = dateStr;
if (process.env.VUE_APP_MODE === "web") {
  Vue.prototype.winControl = require("@/mode/webControl").default;
} else {
  Vue.prototype.winControl = require("@/mode/windowControl").default;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
