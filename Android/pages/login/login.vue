<template>
	<view class="login"  v-if="!login">
		<!-- 登录页面 -->
		<view class="main">
			<!-- <view class="item" @click="logins(true)">
				人脸登录
			</view> -->
			        <view class="h1">登录
			        </view>
			<img src="https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097442011.jpg" alt="" style="width: 85vw;height: 30vh;">
				<view class="learn-more" @click="logins(true)">人脸登录</view>

		</view>
		<!-- 验证页面 -->
		<!-- <view class="fail" > -->
			<!-- <view class="" v-if="sort">
				<camera device-position="front" flash="auto" @error="error" style="width: 100%; height: 300px;">
				</camera>
				<button type="primary" @click="takePhoto">拍照</button>
				<image mode="widthFix" :src="src"></image>
			</view> -->
		
		<!-- </view> -->
	</view>
	<view class="cameraBg" v-if="login">
		<camera :device-position="this.qianhou" flash="auto" @error="error" style="width: 100%; height: 85vh;">				
		</camera>
		<view class="func">
			<view class="album" @click="takePhoto">
			  <image class="albumImg" src="../../static/index/beat.png"></image>
			</view>
			<view class="change" @click="changeqianhou">
			  <image class="changeImg" src="../../static/index/change.png"></image>
			</view>
		</view>
		<!-- <image mode="widthFix" class="photos-box" :src="src"></image> -->
	</view>
</template>

<script>
	import {
		get,
		post,
		uploadFile
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				login: false, //登录页面
				sort: true, //登录方式
				src: "",
			};
		},
		onLoad(options) {		const innerAudioContext = uni.createInnerAudioContext();},
		methods: {
			logins(e) {
				this.login = true;
				this.sort = e;
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309754973.wav";
				innerAudioContext.onPlay(() => {
					console.log('登录提示声');
				});
			},
			// 拍照注册
			takePhoto() {
				const camera = uni.createCameraContext()
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src =
					'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659092709353.mp3';
				innerAudioContext.onPlay(() => {
					// console.log('拍照声音');
				});
				camera.takePhoto({
					quality: 'high',
				}).then(res => {
					this.src = res.tempImagePath;
					console.log("拍照",res.tempImagePath);
					uploadFile({
							url: "/face/registerAndLogin",
							src: res.tempImagePath
						})
						.then(res => {
							console.log(JSON.parse(res.data));
							switch (JSON.parse(res.data).data.msg) {
								case "用户已存在":
									this.logIn(this.src)
									break;
								case "登录成功":
									innerAudioContext.autoplay = true;
									innerAudioContext.src =
										'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309862226.wav';
									innerAudioContext.onPlay(() => {
										// console.log('拍照声音');
									});
									console.log(res.header)
									uni.setStorageSync("Authorization", res.header.Authorization)
									uni.setStorageSync("user", JSON.parse(res.data).data.user)
									uni.reLaunch({
										url: '../index/index?login=true'+"&tab_id="+2
									});
									uni.showToast({
										title: '登录成功',
										duration: 2000
									});
									break;
								case "注册成功":
									innerAudioContext.autoplay = true;
									innerAudioContext.src =
										'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309862226.wav';
									innerAudioContext.onPlay(() => {
										// console.log('拍照声音');
									});
									uni.setStorageSync("Authorization", res.header.Authorization)
									uni.setStorageSync("user", JSON.parse(res.data).data.user)
									uni.reLaunch({
										url: '../index/index?login=true'+"&tab_id="+2
									});
									uni.showToast({
										title: '登录成功',
										duration: 2000
									});
									break;
								default:
									uni.showToast({
										title: '登录失败',
										duration: 2000
									});
									break;
							}
							uni.setStorageSync("Authorization", res.header.Authorization)
						})
				})
			},
			// logIn(e) {
			// 	console.log(e);
			// 	uploadFile({
			// 			url: "/face/login",
			// 			src: e
			// 		})
			// 		.then(res => {
			// 			console.log(JSON.parse(res.data),res);
			// 			switch (JSON.parse(res.data).data.msg) {
			// 				case "登录成功":
			// 					uni.setStorageSync("Authorization", res.header.Authorization)
			// 					uni.setStorageSync("user", JSON.parse(res.data).data.user)
			// 					uni.reLaunch({
			// 						url: '../index/index?login=true'+"&tab_id="+2
			// 					});
			// 					uni.showToast({
			// 						title: '登录成功',
			// 						duration: 2000
			// 					});
			// 					break;
			// 				default:
			// 					uni.showToast({
			// 						title: '登录失败',
			// 						duration: 2000
			// 					});
			// 					break;
			// 			}
			// 		})
			// },
			

		},
	}
</script>

<style lang="less">
	.main{
		    margin: 0 auto;
		    background-color: #fff;
		    box-shadow: 0 0 5px 5px  #d6d6d6;
		    padding: 0.625rem;
		    border-radius: 40px;
			height: 90vh;
	}
	.login {
		// margin: 0 5vw;
		background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);
		height: 100vh;
		padding: 5vw;
		.main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			// padding: 40vw 0 0 0;

			.item {
				width: 80vw;
				height: 16vw;
				color: #fff;
				background-color: #fecd09;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 40rpx;
				margin: 0 0 10vw 5vw;
			}
		}
	}
	.h1 {
	  display: block;
	  font-size: 30px;
	  line-height: 48px;
	  margin-bottom: 32px;
	  font-weight: 600;
	  margin-top: 0;
	  text-align: center;
	  position: relative;
	}
	
	.h1::before {
	  content: '';
	  height: 2px;
	  position: absolute;
	  left: 50%;
	  width: 15vw;
	  transform: translateX(-50%);
	  bottom: 0;
	  background: #4158D0;
	  border-radius: 3px;
	  transition: 0.3s;
	}
	.cameraBg {
	  width: 100%;
	  height: 85vh;
	  position: fixed;
	  .func {
	    width: 100%;
	    z-index: 99999;
	    position: fixed;
		background-color: #222627;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
		height: 15vh;
	    .beat {
	      position: absolute;
	      left: 100rpx;
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	      font-size: 24rpx;
	      font-weight: 400;
	      color: #ffffff;
	      .beatImg {
	        width: 88rpx;
	        height: 88rpx;
	      }
	    }
	    .album {
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	      font-size: 24rpx;
	      font-weight: 400;
	      color: #ffffff;
	      .albumImg {
	        width: 120rpx;
	        height: 120rpx;
	      }
	    }
		.change {
		  position: absolute;
		  right: 100rpx;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  font-size: 24rpx;
		  font-weight: 400;
		  color: #ffffff;
		  .changeImg {
		    width: 88rpx;
		    height: 88rpx;
		  }
		}
		.piliang{
		position: absolute;
		bottom: 18vh;
		right: 7vw;
		border: 1px solid #000;
		display: flex;
		background-color: #000;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-weight: 400;
		color: #ffffff;
		border-radius: 50%;
		width: 110rpx;
		height: 110rpx;
		opacity: 0.4;
		transition: all .2s;
		/*这里demo演示过，思路也在上面说过*/
		.piliangImg {
		  width: 88rpx;
		  height: 88rpx;
		}
		}
	  }
	}
	
	//按钮特效
	.learn-more {
	  position: relative;
	  display: inline-block;
	  cursor: pointer;
	  outline: none;
	  border: 0;
	  vertical-align: middle;
	  text-decoration: none;
	  font-size: inherit;
	  font-family: inherit;
	}
	
	.learn-more {
	  font-weight: 600;
	  margin: 0 auto;
	  color: #382b22;
	  text-transform: uppercase;
	  padding: 0.5em 1em;
	  background: #fff0f0;
	  border: 2px solid #b18597;
	  width: 35%;
	  font-size: 20px;
	  border-radius: 0.75em;
	  transform-style: preserve-3d;
	      text-align: center;
	  margin-top: 10vh;
	  margin-bottom: 20px;
	  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
	}
	
	.learn-more::before {
	  position: absolute;
	  content: "";
	  width: 100%;
	  height: 87%;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background: #f9c4d2;
	  border-radius: inherit;
	  box-shadow: 0 0 0 2px #b18597, 0 0 0 0 #ffe3e2;
	  transform: translate3d(0, 0.75em, -1em);
	  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
	}
	
	.learn-more:hover {
	  background: #ffe9e9;
	  transform: translate(0, 0.25em);
	}
	
	.learn-more:hover::before {
	  box-shadow: 0 0 0 2px #b18597, 0 0 0 0 #ffe3e2;
	  transform: translate3d(0, 0.5em, -1em);
	}
	
	.learn-more:active {
	  background: #ffe9e9;
	  transform: translate(0em, 0.75em);
	}
	
	.learn-more:active::before {
	  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
	  transform: translate3d(0, 0, -1em);
	}

</style>
