<template name="mine">
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<view class="bg-img  flex align-center justify-center bg-img-mine" :style="{ backgroundImage:'url(' +  bgImgsSrc+ ')' }">
				<view class="padding-xl text-white">
					<view class="padding">
						<view class="cu-avatar round xl logo-xxl" :style="{ backgroundImage:'url(' +  bgImgsrc+ ')' }">
							<view class="cu-tag badge cuIcon-female bg-pink" v-if="bgImgsex === '0'"></view>
							<view class="cu-tag badge cuIcon-male bg-blue" v-else-if="bgImgsex === '1'"></view>
						</view>
					</view>
					<view class="text-xl text-center">
						{{bgImgname}}
					</view>
					<image mode="scaleToFill" src="../../static/mine/wave.gif" class="gif-wave"/>
				</view>
			</view>
			<view class="cu-list menu menu-margin">
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/mine/orderList" navigateTo>
						<text class="cuIcon-edit text-cyan"></text>
						<text class="text-grey">我的xx</text>
					</navigator>
					<view class="action">
						<text class="cuIcon-right text-gray"></text>
					</view>	
				</view>
				
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="" navigateTo>
						<text class="cuIcon-samefill text-red"></text>
						<text class="text-grey">我的xx</text>
					</navigator>
					<view class="action">
						<text class="cuIcon-right text-gray"></text>
					</view>	
				</view>
				
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/mine/position" navigateTo>
						<text class="cuIcon-profile text-orange"></text>
						<text class="text-grey">我的xx</text>
					</navigator>
					<view class="action">
						<text class="cuIcon-right text-gray"></text>
					</view>	
				</view>
				
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/mine/addre" navigateTo>
						<text class="cuIcon-activity text-orange"></text>
						<text class="text-grey">我的xx</text>
					</navigator>
					<view class="action">
						<text class="cuIcon-right text-gray"></text>
					</view>	
				</view>
			</view>
		</scroll-view>
	</view>		
</template>

<script>
	export default {
		name:"mine",
		data() {
			return {
				PageCur: 'mine',
				modalName: null,
				bgImgname: '貌似空壳诺',
				bgImgsex: '0',
				bgImgsrc:'../../static/mine/logo.jpg',
				bgImgsSrc:'../../static/mine/mine.jpg'
			};
		}
	}
</script>

<style scoped>
	.logo-xxl{
		width: 85px;
		height: 85px;
		margin-top: 50px;
	}
	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
    }
	.cu-tag{
		top: 2px;
        right: 2px;
	}
	.bg-img-mine{
		height: 250px;
		position: relative;
	}
	.menu-margin{
		margin-bottom: 51px;
	}
</style>
