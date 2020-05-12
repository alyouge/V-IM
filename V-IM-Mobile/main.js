import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import group from './pages/group/index.vue'
Vue.component('group',group)

import mine from './pages/mine/index.vue'
Vue.component('mine',mine)

import tel from './pages/tel/index.vue'
Vue.component('tel',tel)

import card from './pages/tel/components/card.vue'
Vue.component('card',card)

import chat from './pages/chat/index.vue'
Vue.component('chat',chat)

import windows from './pages/chat/components/windows.vue'
Vue.component('windows',windows)

import login from './pages/login/login.vue'
Vue.component('login',login)

import forget from './pages/login/forget.vue'
Vue.component('forget',forget)

import register from './pages/login/register.vue'
Vue.component('register',register)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
