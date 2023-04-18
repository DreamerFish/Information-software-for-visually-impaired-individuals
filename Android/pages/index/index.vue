<template>
	<!-- 顶部tab -->
	<view class="top_tab" st>
		<view class="tabitem" :key="index" v-for="(item,index) in title" @click="bindtop((index))"
			:aria-selected="tab_id==index" :aria-label="item.label" aria-role="tab" :tabindex="tab_id==index?'0':'-1'">
			<view :class="tab_id==index?'selected':''">
				{{item.name}}
			</view>
		</view>
		<view id="" class="bottom_line" :style="'left:' + left + 'rpx'"></view>
	</view>
	<!-- 搜索 -->
	<swiper 
	class="swiper-box" 
	aria-role="Tab"
	:style="{height:tab_id == 0?245+'vh':100+'vh'}" 
	@change="tabChange"
	:current=tab_id
	>
	<!-- 资讯 -->
		<swiper-item>
		<view class="content">
		<view class="input" @click="toSearch">
			搜索
		</view>
	<view class="newtext">
		新闻类型
	</view>
	<view class="list">
		<view class="item" @click="detail(item.name)" :key="index" v-for="(item,index) in list" aria-role="text">
			<view class="item_image">
				<image :src="item.url" mode="scaleToFill"></image>
			</view>
			<view class="text">
				{{item.name}}
			</view>
		</view>
	</view>
	</view>
	</swiper-item>
	<!-- 识别 -->
	<swiper-item>
	<view class="content">
	<view class="">
		<view class="input" @click="toSearch">
			搜索
		</view>
		<view class="newtext">
			识别类型
		</view>
		<view class="big">
			<view class="choice" >
				<view class="yinshua" @click="openNewPage('GeneralText')" aria-role="text">
					<view class="textA">
						<view class="text">
							印刷
						</view>
						<view class="smalltext">
							(支持外文)
						</view>
					</view>
					<image src="../../static/book.png" mode=""></image>
				</view>
				<view class="shouxie"  @click="openNewPage('HandWriting')" aria-role="text">
					<view class="text">
						手写
					</view>
					<image src="../../static/shouxie.png" mode="" class="shouxieImg"></image>
				</view>
				<view class="wendang"  aria-role="text" @click="openNewPage('Word')">
					<view class="text">
						文档
					</view>
					<image src="../../static/wendang.png" mode=""></image>
				</view>
				<view class="wangluo" aria-role="text" @click="openNewPage('WebImage')">
					<view class="text">
						网络图片
					</view>
					<image src="../../static/wangluo.png" mode=""></image>
				</view>
				<view class="wupin" aria-role="text" @click="openNewPage('EngineImage')">
					<view class="text">
						物品
					</view>
					<image src="../../static/wupin.png" mode=""></image>
				</view>
				<view class="biaoge" aria-role="text" @click="openNewPage('Form')">
					<view class="text">
						表格
					</view>
					<image src="../../static/biaoge.png" mode=""></image>
				</view>
				<view class="shiping" aria-role="text" @click="openNewPage('Translate')">
					<view class="text">
						中英互译
					</view>
					<image src="https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659788498634.png" mode=""></image>
				</view>

			</view>
		</view>
	</view>
	</view>
	</swiper-item>
	<!-- 我的 -->
	<swiper-item>
	<view class="mine">
		<view class="userMsg">
			<image class="userImg" :src="user.pictureUrl"></image>
			<view class="userName">{{user.realName}}</view>
		</view>
		<view class="Collection" @click="likeList('我的收藏')">
			<image class="wdImg" mode="aspectFit" src="/static/love.png"></image>
			<view class="funcName">我的收藏</view>
		</view>
		<view class="Collection" @click="toHistory('历史记录')">
			<image class="wdImg" mode="aspectFit" src="/static/time.png"></image>
			<view class="funcName">历史记录</view>
		</view>
		<view class="Collection" @click="preference('偏好')">
			<image class="wdImg" mode="aspectFit" src="/static/biaoqian.png"></image>
			<view class="funcName">我的偏好</view>
		</view>
		<view class="Collection" @click="feedback('反馈')">
			<image class="wdImg" mode="aspectFit" src="/static/pinlun.png"></image>
			<view class="funcName">反馈</view>
		</view>
		<button class="quit" @click="logIn" data-url="pages/login/login">退出账号</button>
	</view>
	</swiper-item>
</swiper>
<voice></voice>
</template>

<script>
	import {
		get,
		post,
		uploadFile
	} from "../../utils/request.js"
	export default {
		// 组件注册
		data() {
			return {
				url: '',
				tab_id: 0,
				left: 124,
				tabs: ["资讯", '识别', '我的'],
				title: [{
					name: "资讯",
					label: "资讯阅读"
				}, {
					name: "识别",
					label: "图文识别"
				}, {
					name: "我的",
					label: "我的信息"
				}],
				list: [{
						name: "猜你喜欢",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657095707693.png",
					}, {
						name: "时政",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657095591428.png",
					}, {
						name: "财经",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657096919245.png",
					}, {
						name: "科技",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659277245913.png",
					}, {
						name: "体育",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657096942991.png",
					},
					{
						name: "教育",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097069810.png",
					},
					{
						name: "家具",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097079483.png",
					},
					{
						name: "游戏",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097093771.png",
					},
					{
						name: "社会",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097106396.png",
					},
					{
						name: "娱乐",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097117157.png",
					},
					{
						name: "股票",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097129625.png",
					}, {
						name: "彩票",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097146108.png",
					}, {
						name: "时尚",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097151580.png",
					}, {
						name: "星座",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097162495.png",
					}, {
						name: "房产",
						url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097178609.png",
					},
				],
				minelist: ["收听历史", "我的订阅", "我喜欢的", "我的下载", "设置", "反馈"],
				user: uni.getStorageSync('user'),
				animationData: {} // 动画

			}
		},

		onLoad(options) {
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			this.scrollIntoView()
			console.log("要的就是你",options);
			// this.tab_id = options.content
			this.tab_id = options.tab_id || 0;
			this.user = uni.getStorageSync('user');
			uni.$on('news', (data) => {
				console.log('标题：', data)
			});
		
			
		},
watch: {
    tab_id (newName, oldName) {
        this.scrollIntoView()
    }
},
		onBackPress: function(e) {
			console.log("页面返回", e);
		},
		methods: {
			detail(e) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				switch(e){
					case '猜你喜欢':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311167112.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '时政':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311324923.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '财经':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311460863.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '科技':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311479798.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '体育':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311492004.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '教育':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311506148.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '家具':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311526375.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '游戏':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311536372.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '社会':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311550408.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '娱乐':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311562643.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '股票':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311576242.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '彩票':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311594740.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '时尚':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311602834.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '星座':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311613259.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
					case '房产':
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311629719.wav";
					innerAudioContext.onPlay(() => {
						console.log('退出提示声');
					});
					break;
				}
				// console.log(e);
				uni.navigateTo({
					url: '../detail/detail?sort=' + e,
				});
			},
			bindtop(e) {
				this.tab_id = e;
			},
			logIn(res) {
				console.log("要的就是你");
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309655303.wav";
				innerAudioContext.onPlay(() => {
					console.log('退出提示声');
				});
				uni.redirectTo({
					url: '../login/login'
				});
			},
			toSearch() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311025475.wav";
				innerAudioContext.onPlay(() => {
					console.log('搜索提示声');
				});
				uni.navigateTo({
					url: '../search/search',
				});
			},
			openNewPage(e) {
				console.log(e);
				if(e == 'GeneralText'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310711072.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}else if(e == 'HandWriting'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310813720.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}else if(e == 'Word'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310906665.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}else if(e == 'WebImage'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310922962.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}else if(e == 'EngineImage'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310952755.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}else if(e == 'Form'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310964169.wav";
					innerAudioContext.onPlay(() => {
						console.log('提示声');
					});
				}
				uni.navigateTo({
					// url: "../recognition/recognition?sort=" + e
					url: `../recognition/recognition?sort=${e}`
				})
			},
			// 我的页面收藏跳转
			likeList(e) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310451007.wav";
				innerAudioContext.onPlay(() => {
					console.log('历史记录提示声');
				});
				uni.navigateTo({
					url: "../list/list?sort=" + e
				})
			},
			toHistory(e) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310158312.wav";
				innerAudioContext.onPlay(() => {
					console.log('历史记录提示声');
				});
				uni.navigateTo({
					url: "../history/history?sort=" + e
				})
			},
			feedback(e) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310056253.wav";
				innerAudioContext.onPlay(() => {
					console.log('反馈提示声');
				});
				console.log(e);
				uni.navigateTo({
					url: "../feedback/feedback"
				})
			},
			preference(e) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310124454.wav";
				innerAudioContext.onPlay(() => {
					console.log('我的偏好提示声');
				});
				console.log(e);
				uni.navigateTo({
					url: "../preference/preference"
				})
			},
			// tab栏动画
			tabChange(e){
			this.tab_id = e.detail.current;
			console.log(this.tab_id);
			},
			// 计算tabs位置
			scrollIntoView() {  // item滚动
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
					let lineLeft = 0;
					if(this.tab_id == 0){
						this.left = 124
						innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310264774.wav";
						innerAudioContext.onPlay(() => {
							console.log('资讯提示声');
						});
					}else if(this.tab_id == 1){
						this.left = 350
						innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310282722.wav";
						innerAudioContext.onPlay(() => {
							console.log('识别提示声');
						});
					}else if(this.tab_id == 2){
						this.left = 574
						innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310296222.wav";
						innerAudioContext.onPlay(() => {
							console.log('我的提示声');
						});
					}
			},

		}
	}
</script>

<style lang="less">
	page{
		background-color: #F6F6F6;
	}
	.line {
		width: 100%;
		height: 2rpx;
		background: #000;
	}

	.newtext {
		font-size: 40rpx;
		height: 2vh;
		font-weight: 600;
		padding: 5px;
		margin-top: 4rpx;
	}

	template {
		background-color: #B9B9B9
	}

	.top_tab {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #101010;
		padding: 2vw 5vw;
		background-color: #F6F6F6;
		position: relative;
		.bottom_line {
			// content: '';
			// width: 50%;
			// position: relative;
			// display: block;
			// top: 6rpx;
			// left: 25%;
			// border-bottom: 6rpx solid #165DFF;
			width: 50rpx;
			height: 7rpx;
			background-color: #165DFF;
			position: absolute;
			bottom: 5rpx;
			transition: all .2s linear;
		}

		.tabitem {
			font-size: 40rpx;
			font-weight: bold;

			.selected {
				color: #165DFF;
				transition: all 0.3s;
			}

			// .selected::after {
			// 	content: '';
			// 	width: 50%;
			// 	position: relative;
			// 	display: block;
			// 	top: 6rpx;
			// 	left: 25%;
			// 	border-bottom: 6rpx solid #165DFF;
			// }
		}

	}

	.content {
		display: flex;
		flex-direction: column;
		padding: 2vw 5vw;
		background-color: #F6F6F6;
		// height: 100vh;
	}

	.input {
		width: 90vw;
		height: 5vh!important;
		border: 1rpx solid #B9B9B9;
		border-radius: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color: #B9B9B9;
		background-color: #ffffff
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		// margin-top: 4vh;
		color: #272e3b;

		.item {
			width: 43vw;
			height: 50vw;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 80rpx;
			border-radius: 25rpx;
			margin-top: 2vh;
			position: relative;
			z-index: 1;
			overflow: hidden;
			flex-direction: column;
			background-color: #fff;

			.item_image {
				width: 43vw;
				height: 43vw;
				border-radius: 25rpx 25rpx 0 0;
				background-color: rgba(0, 0, 0, 0.2);
				overflow: hidden;

				image {
					height: 116%;
					width: 100%;

					border-radius: 25rpx 25rpx 0 0;
				}
			}

			.text {
				font-size: 40rpx;
				height: 88rpx;
				line-height: 88rpx;
				width: 82%;
			}
		}

	}

	.mine {
		padding: 5vw 5vw 0 5vw;

		.info {
			display: flex;
			align-items: center;

			.img {
				width: 16vw;
				height: 16vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.login {
				font-size: 40rpx;
				margin: 0 0 0 20rpx;

				.login_text1 {
					color: #3d3e3f;
					font-size: 36rpx;
				}
			}
		}

		.minelist {
			margin: 0 0 2vw 0;
			width: 100%;
			height: 15vw;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			background-color: #b6b6b6;

			.text {
				font-size: 36rpx;
				margin: 0 0 0 20%;
				font-weight: bold;
				color: #FFF;
			}
		}
	}

	.big {}

	.choice {
		width: 100%;
		height: 90%;
		margin: 0 auto;
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.choice .shiping {
		position: relative;
		left: -170rpx;
		background-color: #B6D7DC;
		color: #2a4a4b;
	}

	.choice .yinshua {
		background-color: #CEE2A5;
		color: #4C613E;
	}

	.choice .shouxie {
		background-color: #F0C2C2;
		color: #755754;
	}

	.choice .wendang {
		background-color: #B1D6F1;
		color: #545E7E;
	}

	.choice .wangluo {
		background-color: #D4D3FB;
		color: #52507F;
	}

	.choice .wupin {
		background-color: #E2BBD6;
		color: #724B67;
	}

	.choice .biaoge {
		background-color: #EEDAA8;
		color: #784D49;
	}

	.choice view {
		margin-top: 20rpx;
		display: flex;
		width: 285rpx;
		height: 175rpx;
		border-radius: 20rpx;
		padding-top: 25rpx;
		padding-left: 25rpx;
		font-weight: bold;
		font-family: SimHei;
		overflow: hidden;
		font-size: 50rpx;
	}

	.choice view image {
		width: 100%;
		height: 100%;
		position: relative;
		bottom: -75rpx;
		right: -50rpx;
	}

	.choice view .shouxieImg {
		width: 100%;
		height: 100%;
		position: relative;
		bottom: 0px;
		right: -40px;
	}

	.choice view .text {
		width: 160rpx;
		padding: 0;
		margin-top: 0;
	}

	/* 我的 */
	.wd view {
		background-color: rgb(255, 255, 255);
	}

	.userMsg {
		display: flex;
		/* border: 1px solid #000; */
		background-color: rgb(246, 246, 246) !important;
		border-radius: 10rpx;
		width: 90%;
		height: 150rpx;
		margin: 0 auto;
		margin-top: 15rpx;
	}

	.userImg {
		margin-top: 10rpx;
		width: 120rpx;
		height: 120rpx;
		border: 1px solid #000;
		border-radius: 50%;
		// margin-left: 10rpx;
	}

	.userName {
		line-height: 150rpx;
		font-size: 40rpx;
		margin-left: 40rpx;
		background-color: rgb(246, 246, 246) !important;
	}

	// .userMsg .quit{
	//     margin-top: 50rpx;
	//     width: 180rpx;
	//     height: 60rpx;
	//     line-height: 60rpx;
	//     border-radius: 50rpx;
	//     font-weight: normal;
	//     border: 1px solid #000;
	//     padding: 0;
	//     position: absolute;
	//     right: 25rpx;
	//     font-size: medium;
	// }
	.Collection {
		display: flex;
		/* border: 1px solid #000; */
		border-radius: 20rpx;
		width: 90%;
		height: 150rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		line-height: 150rpx;
		background-color: #fff;
	}

	.quit {
		width: 90%;
		height: 150rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
		line-height: 150rpx;
		color: #fff;
		background-color: #4080FF;
	}

	.wdImg {
		width: 60rpx;
		height: auto;
		/* border: 1px solid #000; */
		margin-left: 50rpx;
		margin-top: 8rpx;
	}

	.funcName {
		line-height: 150rpx;
		font-size: 40rpx;
		margin-left: 40rpx;
	}

	.mine {
		background-color: #F6F6F6;
		height: 100vh;
	}

	.choice .textA .smalltext {
		font-size: 25rpx;
		width: 200rpx;
	}

	.choice .textA {
		display: flex;
		flex-direction: column;
		margin-top: 0;
		padding: 0;
	}
</style>
