<template>
	<view>
		<chat v-if="PageCur=='chat'"></chat>
		<tel v-if="PageCur=='tel'"></tel>
		<group v-if="PageCur=='group'"></group>
		<mine v-if="PageCur=='mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="chat">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/chat' + [PageCur=='chat'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='chat'?'text-green':'text-gray'">聊天</view>
			</view>
			<view class="action" @click="NavChange" data-cur="tel">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/tel' + [PageCur == 'tel'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='tel'?'text-green':'text-gray'">通讯录</view>
			</view>
			<view class="action" @click="NavChange" data-cur="group">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/group' + [PageCur == 'group'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='group'?'text-green':'text-gray'">群组</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'chat'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
