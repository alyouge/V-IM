import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import group from './pages/group/group.vue'
Vue.component('group',group)

import mine from './pages/mine/mine.vue'
Vue.component('mine',mine)

import tel from './pages/tel/tel.vue'
Vue.component('tel',tel)

import card from './pages/tel/components/card.vue'
Vue.component('card',card)

import chat from './pages/chat/chat.vue'
Vue.component('chat',chat)

import windows from './pages/chat/components/windows.vue'
Vue.component('windows',windows)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
