<template name="chat">
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg">
			<block slot="content">聊天</block>
		</cu-custom>
		<view class="cu-list menu-avatar tabbar-mar">
			
			<navigator class="cu-item bg-white" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 14" :key="index" hover-class="none" url="/pages/chat/components/windows" 
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				 
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
					<view class="content">
						<view class="text-grey">文晓港</view>
						<view class="text-gray text-sm text-cut">
							<!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达 -->
							 这里显示上次结束最后聊天的内容这里显示上次结束最后聊天的内容
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-orange sm">5</view>
					</view>
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			     PageCur: 'chat',
				 modalName: null,
			};
		},
		methods:{
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
</style>
