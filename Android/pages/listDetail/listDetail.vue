<template>
	<z-swiper v-model="info" :custom-style="{height:90+'vh'}" :options="options">
		<z-swiper-item :custom-style="slideCustomStyle" v-for="(item,index) in info" :key="index" class="page">
		<view class="info">
			<view class="title">
			 {{item.newsId}}. {{item.newsTitle}}
			</view>
			<view class="text">
			 文章摘要：{{item.summary}}
			</view>
			<!-- 播放器 -->
			<view class="player">
				<slider :value="newTime" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000"
					block-color="#8A6DE9" block-size="20" />
				<view class="iconfont icon-zanting icon" v-if="state" @click="bindstate(false)"></view>
				<view class="iconfont icon-bofang icon" v-if="!state" @click="bindstate(true)"></view>
				<view id="star" @click="shoucang(index)" :class="item.star == true?'fill':''"></view>
			</view>
		</view>
		</z-swiper-item>
	</z-swiper>
<voice  @Voice_play="bindstate(true)" @Voice_zanting="bindstate(false)"></voice>
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
				info: [],
				color:["#F53F3F","#F77234","#FF7D00","#F7BA1E","#FADC19","#9FDB1D","#00B42A","#3491FA","#165DFF","#722ED1"],
				newTime:0,
				slideCustomStyle: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '36rpx',
				},
				options: {
					effect: 'cards',
					direction: 'vertical'
				},
				state: false,
				audioNesw:"",
				content: "",
			}
		},
		onLoad(options) {
			this.content = JSON.parse(options.content)
			console.log(this.content);
			
			post({
					url: "/nlp/summary",
					data: ({
						count : 3,
						text : this.content.newsContent,
					})
				})
				.then(res => {
					this.content.summary = res.data.substring(1,res.data.length-1)
					console.log(this.content.summary);
				})
				if(options.star == 'star'){
					this.content.star = true;
				}
			this.backgroundAudio()
			this.audio()
			this.info.push(this.content)
			
		},
		onUnload(e){
			console.log(e,"页面卸载");
				this.info=[];
				this.bgAudioManager.pause();
		},
		methods: {
			//收藏
			shoucang(index){
				this.info[index].star = !this.info[index].star;
				console.log("当前新闻",this.info[index]);
				if(this.info[index].star == true){
					post({
						url: "/newsCollect/addnews",
							data: ({
								newsId: this.info[index].newsId,
								newsTitle:this.info[index].newsTitle,
								newsContent:this.info[index].newsContent,
								newstype:this.info[index].newstype
							})
						})
						.then(res => {
							console.log(res);
						})
				}else{
					post({
						url: "/newsCollect/delnews",
							data: ({
								id: this.info[index].newsId,
							})
						})
						.then(res => {
							console.log("删除收藏",res);
						})
				}
				
			},
			// 新闻音频的获取
			audio(e) {
				console.log("音频获取");
				post({
						url: "/voice/OcrToVoice",
						data: ({
							native_voice_name: "xiaoyan",
							ocrText: this.content.newsContent,
							speed: 100,
							volume: 0,
						})
					})
					.then(res => {
						console.log(res.data.data.data, );
						this.audioNesw = res.data.data.data;
					})
			},
			// 背景音频
			backgroundAudio(){
				this.bgAudioManager = uni.getBackgroundAudioManager();
				this.bgAudioManager.startTime = 0
			},
			// 播放与暂停
			bindstate(e) {
				this.state = e;
				if (e) {
					if( isNaN(this.newTime) ){
							this.newTime=0
						}
					console.log("播放",this.newTime,this.audioNesw);
					if (this.newTime!=0) {
						this.bgAudioManager.play();
						this.newTime=0
					} else{
						this.bgAudioManager.src = this.audioNesw;
						this.bgAudioManager.title = "读取内容"; //标题
						this.bgAudioManager.singer = '暂无'; //作者
						this.bgAudioManager.coverImgUrl =
							'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png'; //封面
						this.newTime=0
							this.bgAudioManager.play();
					}
				} else {
					this.bgAudioManager.pause()
				}
				// !-----!
				const that = this;
				this.bgAudioManager.onTimeUpdate((res) => {
					that.outTimes();
				})
			},
			outTimes() {
				// 当前进度除以总时长
				// console.log(parseInt(this.bgAudioManager.duration), "总的长度")
				// console.log(parseInt(this.bgAudioManager.currentTime), "当前的长度")
				let allduration = this.bgAudioManager.duration
				let currentTime = this.bgAudioManager.currentTime
				this.newTime = parseInt(parseInt(currentTime) / parseInt(allduration) * 100)
				if (this.newTime >= 100) {
					this.bgAudioManager.startTime = 0
					// clearInterval(timeSet); //停止调用
				}
			},
			// 拖动进度
			sliderChange(e) {
				console.log(e.detail.value);
				let allduration = this.bgAudioManager.duration
				this.newTime = e.detail.value
				this.bgAudioManager.seek(parseInt(parseInt(allduration) * parseInt(e.detail.value) / 100))
			},
					
		},
		}
</script>

<style  lang="less">
	.player {
		height: 20%;
		position: relative;
		.icon{
			font-size: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.content{
		padding: 5vw;
	}
	page{
		overflow:hidden;
	}
	.image {
		height: 640rpx;
		width: 480rpx;
		border-radius: 24rpx;
	}
	.scroll {
		width: 90vw;
		height: 100vh;
		padding: 2vw 5vw;
	
		.page {
			// background-color: #5d435f;
			width: 100%;
			height: 100vh;
			// height: 85%!important;
			border-radius:40rpx;
			box-shadow: 0 5px 5px 0  #d6d6d6;
		}
	}
	
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color:#86909c;
		height: 80%;
		color: white;
		margin: 40rpx;
		width: 75vw;
		padding: 30rpx;
		border-radius: 40rpx;
		.title {
			font-size: 42rpx;
			align-self: center;
			margin-bottom: 30rpx;
		}
	
		.date {
			position: relative;
			width: 100%;
	
		}
	
		.text {
			/* 超出范围隐藏 */
			overflow: hidden;
			/* 文字超出用省略号 */
			text-overflow: ellipsis;
			/* 盒子模型 */
			display: -webkit-box;
			/* 显示的文本行数 */
			-webkit-line-clamp: 15;
			/* 子元素的垂直排列方式 */
			-webkit-box-orient: vertical;
		}
	}
	// 收藏
	@keyframes banuce {
	      0% {
	        transform: scale(0.8);
	      }
	      100% {
	        transform: scale(1.35);
	      }
	    }
	    @keyframes circle {
	      0% {
	        transform: scale(0.2);
	        opacity: 0.8;
	      }
	      100% {
	        transform: scale(1.5);
	        opacity: 1;
	      }
	    }
	    @keyframes show {
	      0% {
	        opacity: 1;
	      }
	    }
	    .wrap {
	      width: 100vw;
	      height: 100vh;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	    }
	    #star {
	      display: inline-block;
	      width: 30px;
	      height: 30px;
			position: absolute;
		    right: 100rpx;
			bottom: 65rpx;
	      background-image: url(https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659189962421.png);
	      background-repeat: no-repeat;
	      background-size: 100%;
	      background-position: center;
	    }
	    .fill {
	      position: relative;
	      animation: banuce 0.2s ease 0s 2 alternate;
	      background-image: url(https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659180972931.png) !important;
	    }
	    .fill::before {
	      opacity: 0;
	      content: '';
	      position: absolute;
	      left: 50%;
	      top: 50%;
	      width: 10%;
	      height: 10%;
	      transform: translate(-50%, -50%);
	      border-radius: 50%;
	      background: transparent;
	      box-shadow: 15px -15px 0 #fed001, 15px 15px 0 #fed001,
	        -15px -15px 0 #fed001, -15px 15px 0 #fed001;
	      animation: show 0.2s steps(1, end) 0s 1;
	    }
	    .fill::after {
	      opacity: 0;
	      content: '';
	      position: absolute;
	      left: 0;
	      right: 0;
	      top: 0;
	      bottom: 0;
	      animation: circle 0.3s ease 0.02s 1 alternate;
	      border-radius: 50%;
	      background: rgba(254, 208, 1, 0.1);
	    }

</style>
