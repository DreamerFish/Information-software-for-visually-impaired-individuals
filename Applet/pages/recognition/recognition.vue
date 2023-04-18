<template>
	<view class="cameraBg">
		<camera :device-position="qianhou" flash="auto" @error="error" style="width: 100%; height: 85vh;">
			<cover-view class="scanBtn" v-if="scanShow">
			</cover-view>
		</camera>
		<view class="func">
			<button :class="piliang == true?'piliang':'Nopiliang'" @click="changepiliang">
				<image class="piliangImg" :src="this.imgSrc" mode=""></image>
			</button>
			<view class="photoNum" v-if="piliang == true">
				已拍照数：<span style="color:red;opacity: 1;">{{photoArr.length}}</span> 张
			</view>
			<view class="beat" @click="chooseImg">
				<image class="beatImg" src="../../static/index/album.png"></image>
			</view>
			<view class="album" @click="takePhoto" @longpress="piliangshibie" @touchend="touchend">
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
				src: "",
				scanShow: true,
				piliang: false,
				imgSrc: "../../static/index/piliang1.png",
				photoArr: [],
				qianhou: "back",
				re_type: "GeneralText",
				resultArr:[],
				islongPress: false, //长按记录变量
			}
		},
		onLoad(option) {
			this.re_type = option.sort;
			console.log(this.re_type);
			uni.setNavigationBarTitle({
				title: "图像识别",
			});
			// this.getnews()

		},
		onUnload(e){
			console.log(e,"页面卸载");
				this.photoArr=[];
				this.resultArr=[];
				this.piliang = true;
				this.imgSrc = "../../static/index/piliang1.png"
				// this.changepiliang();
		},
		methods: {
			//拍照声音
			PhotoVoice() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src =
					'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659092709353.mp3';
				innerAudioContext.onPlay(() => {
					// console.log('拍照声音');
				});
			},
			piliangshibie() {
				this.islongPress = true;
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src =
					'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312921036.wav';
				innerAudioContext.onPlay(() => {
					console.log('批量识别中');
				});
				for(var i = 0;i<JSON.parse(JSON.stringify(this.photoArr)).length;i++){
					uploadFile({
							url: "/pictureDetection/" + this.re_type,
							src: JSON.parse(JSON.stringify(this.photoArr[i]))
						})
						.then(res => {
							console.log(JSON.parse(res.data));
							if (JSON.parse(res.data).message == "失败") {
								const innerAudioContext = uni.createInnerAudioContext();
								innerAudioContext.autoplay = true;
								innerAudioContext.src = JSON.parse(res.data).data.voiceUrl;
								innerAudioContext.onPlay(() => {
									console.log('失败提示声');
								});
							} else if (JSON.parse(res.data).message == "成功") {
								this.resultArr.push(JSON.parse(res.data).data.body[0]);
								if(this.resultArr.length == JSON.parse(JSON.stringify(this.photoArr)).length){
									innerAudioContext.src =
										'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312958435.wav';
									innerAudioContext.onPlay(() => {
										console.log('批量识别成功');
									});
									uni.navigateTo({
										url: `../photoDetails/photoDetails?content=${encodeURIComponent(JSON.stringify(this.resultArr))}&type=${encodeURIComponent(JSON.stringify(this.re_type))}`
									})
								}
							}else{
								
							}
						})
				}


			},
			touchend(){
			               //延时执行为了防止 click() 还未判断 islongPress 的值就被置为 fasle
			                setTimeout(() => {
								this.islongPress = false
							}, 200)
			           },
			takePhoto() {
				if(this.islongPress == false){
                   // console.log("不是长按事件");
				   // console.log(this.piliang);
				   const ctx = uni.createCameraContext();
				   this.PhotoVoice();
				   ctx.takePhoto({
				   	quality: 'high',
				   	success: (res) => {
				   		this.src = res.tempImagePath
				   		if (this.piliang == true) {
				   			this.photoArr.push(this.src);
				   			console.log(JSON.parse(JSON.stringify(this.photoArr)));
				   			// console.log(this.piliang);
				   		} else {
				   			uploadFile({
				   					url: "/pictureDetection/" + this.re_type,
				   					src: this.src
				   				})
				   				.then(res => {
				   					console.log(JSON.parse(res.data));
				   					if (JSON.parse(res.data).message == "失败") {
				   						const innerAudioContext = uni.createInnerAudioContext();
				   						innerAudioContext.autoplay = true;
				   						innerAudioContext.src = JSON.parse(res.data).data.voiceUrl;
				   						innerAudioContext.onPlay(() => {
				   							console.log('失败提示声');
				   						});
				   					} else if (JSON.parse(res.data).message == "成功") {
										const innerAudioContext = uni.createInnerAudioContext();
										innerAudioContext.autoplay = true;
										innerAudioContext.src =
											'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660271089599.wav';
										innerAudioContext.onPlay(() => {
											console.log('识别成功');
										});
										console.log(JSON.parse(res.data).data.body[0]);
										if(this.re_type == 'Translate'){
											uni.navigateTo({
												url: "../SinglePhoto/SinglePhoto?content=" + JSON.stringify(JSON.parse(res.data).data.body[0])
											})
										}else{
											uni.navigateTo({
												url: "../SinglePhoto/SinglePhoto?content=" + JSON.stringify(JSON.parse(res.data).data.body)
											})
										}
				   						
				   					}
				   
				   				})
				   			// uni.request({
				   			//     url: 'https://www.gdouhc.top/blind/api/pictureDetection/GeneralText', 
				   			//     data: {},
				   			// 	method:'POST',//请求方式  或GET，必须为大写
				   			//     header: {
				   			// 		"Content-Type": "multipart/form-data",
				   			//         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZSI6MTY1NTUyMDg0OTcwMiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NTU1NDI0NDksImFjY291bnQiOiI2MjdjODk5M2ZkMDRkMjAwMDFlZGZmODUifQ.5gN1pdLZUXhkiwIpu2J2R8VX5pRfera20UXxieBPo44" //自定义请求头信息
				   			//     },
				   			//     success: (res) => {
				   			// 		uni.navigateTo({
				   			// 			url:"../result/result"
				   			// 		})
				   			//         console.log(res.data);
				   			//         this.text = 'request success';
				   
				   			//     }
				   			// });
				   		}
				   		/* 返回调用页面并把图片URL传递过去 */
				   		// let pages = getCurrentPages();
				   		// let prevPage = pages[pages.length - 2]; 
				   		// prevPage.setData({
				   		// 	"image": res.tempImagePath,
				   		// })
				   		// uni.navigateBack();
				   
				   		// 调用页面获取图片URL方法 
				   		let pages = getCurrentPages();
				   		let currPage = pages[pages.length - 1];
				   		if (typeof(currPage.data.image) != undefined && currPage.data.image != null) {
				   			console.log('获取图片：', currPage.data.image)
				   		}
				   	}
				   });
               }else if(this.islongPress == true){
                   console.log("长按事件");
               }

				
			},
			error(e) {
				console.log(e.detail);
			},
			changepiliang() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				this.piliang = !this.piliang;
				// console.log("要的就是你", this.piliang);
				if (this.piliang == true) {
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312759433.wav";
					innerAudioContext.onPlay(() => {
						console.log('批量开启提示声');
					});
					this.imgSrc = "../../static/index/piliang2.png"
				} else {
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312846754.wav";
					innerAudioContext.onPlay(() => {
						console.log('批量关闭提示声');
					});
					this.imgSrc = "../../static/index/piliang1.png"
				}
			},
			chooseImg() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			changeqianhou() {
				this.qianhou = this.qianhou === "back" ? "front" : "back"
				console.log(this.qianhou);
			}
		}
	}
</script>

<style lang="scss" scoped>
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

			.piliang {
				position: absolute;
				bottom: 18vh;
				left: 7vw;
				border: 1px solid #000;
				display: flex;
				background-color: #ffffff;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;
				border-radius: 50%;
				width: 110rpx;
				height: 110rpx;
				transition: all .2s;

				.piliangImg {
					width: 88rpx;
					height: 88rpx;
				}
			}

			.Nopiliang {
				position: absolute;
				bottom: 18vh;
				left: 7vw;
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

				.piliangImg {
					width: 88rpx;
					height: 88rpx;
				}
			}
		}
	}

	.photoNum {
		position: absolute;
		bottom: 20vh;
		right: 7vw;
		background-color: #fff;
		padding: 8rpx;
		border-radius: 13rpx;

	}
</style>
