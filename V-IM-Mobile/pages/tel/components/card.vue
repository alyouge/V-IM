<template name="card">
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
			<block slot="backText"></block>
		</cu-custom>
		<view class="bg-white flex align-center justify-center bg-img-mine margin-bottom-sm">
			<view class="padding-xl text-white">
				<view class="padding">
					<view class="cu-avatar round xl logo-xxl shadow-warp" :style="{ backgroundImage:'url(' +  bgImgsrc+ ')' }">
						<view class="cu-tag badge cuIcon-female bg-pink" v-if="bgImgsex === '0'"></view>
						<view class="cu-tag badge cuIcon-male bg-blue" v-else-if="bgImgsex === '1'"></view>
					</view>
				</view>
				<view class="text-xl text-center text-black">
					{{bgImgname}}
				</view>
			</view>
		</view>
		<view class="cu-list menu menu-margin">
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="/pages/mine/orderList" navigateTo>
					<text class="cuIcon-profile text-pink"></text>
					<text class="text-grey">显示id名字</text>
				</navigator>
				<view class="action">
					<text class="text-grey">
						貌似空壳诺
					</text>
				</view>	
			</view>
			
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="/pages/mine/orderList" navigateTo>
					<text class="cuIcon-activity text-pink"></text>
					<text class="text-grey">性别</text>
				</navigator>
				<view class="action">
					<text class="text-grey">
						女
					</text>
				</view>	
			</view>
			
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="/pages/mine/orderList" navigateTo>
					<text class="cuIcon-community text-cyan"></text>
					<text class="text-grey">所在区域</text>
				</navigator>
				<view class="action">
					<text class="text-grey">
						辽宁省大连市甘井子区
					</text>
				</view>	
			</view>
		</view>
		
		<view class="padding flex flex-direction">
		   	<navigator class="cu-btn bg-olive margin-tb-sm lg" url="/pages/chat/components/windows" navigateTo hover-class="none">发消息</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImgname: '貌似空壳诺',
				bgImgsex: '0',
				bgImgsrc:'../../static/mine/logo.jpg'
			};
		}
	}
</script>

<style>
</style>
