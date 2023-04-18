<template>
	<z-swiper v-model="info" :custom-style="{height:90+'vh'}" :options="options" ref="zSwiper"  @swiper="swiper">
		<z-swiper-item :custom-style="slideCustomStyle" v-for="(item,index) in info" :key="index" class="page">
		<view class="info" :style="{background:color[index]}">
			<view>
				读取内容：
				<view class="text">
					<text class="">
						{{item}}
					</text>
				</view>
			</view>
			<view class="translateText" v-if="translate.length != 0">
				翻译内容：
				<view class="">
					<text class="">
						{{translate[index]}}
					</text>
				</view>
			</view>
			<!-- 播放器 -->
			<view class="player">
				<slider :value="newTime" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000"
					block-color="#8A6DE9" block-size="20" />
				<view class="iconfont icon-zanting icon" v-if="state" @click="bindstate(false)"></view>
				<view class="iconfont icon-bofang icon" v-if="!state" @click="bindstate(true)"></view>
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
				translate:[],
				recognition_type:'',
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
		onLoad(option) {
			if(this.bgAudioManager!=null){
				this.bgAudioManager.stop()
			}
			const type = JSON.parse(decodeURIComponent(option.type));
			if(type == 'Translate'){
				console.log(type);
				const item = JSON.parse(decodeURIComponent(option.content));
				console.log('上一个页面传递过来的参数对象',item);
				for(var i = 0 ; i < item.length;i++){
					this.info.push(item[i][0]);
					this.translate.push(item[i][1]);
				}
				// const content = JSON.parse(decodeURIComponent(option.content));
				// console.log(JSON.parse(decodeURIComponent(option.content)));
				// this.content = JSON.parse(options.content).data.body;
				this.audio(0)
			}else{
				const item = JSON.parse(decodeURIComponent(option.content));
				console.log('上一个页面传递过来的参数对象',item);
				// const content = JSON.parse(decodeURIComponent(option.content));
				// console.log(JSON.parse(decodeURIComponent(option.content)));
				// this.content = JSON.parse(options.content).data.body;
				this.info = item;
				this.audio(0)
				console.log("要的就是你",this.info[0]);
			}
			
		},
		onUnload(e){
			console.log(e,"页面卸载");
				this.info=[];
				if(this.bgAudioManager!=null){
						this.bgAudioManager.stop()
					}
					this.bgAudioManager=null
					this.audioNesw = '';
					this.state = false;
					// console.log(this.newTime,this.audioNesw,this.state);
					this.newTime =0;
		},
		methods: {
			// 新闻音频的获取
			audio(e) {
				// console.log("音频获取",this.info[e]);
				if(this.translate.length != 0){
					post({
							url: "/voice/OcrToVoice",
							data: ({
								native_voice_name: "xiaoyan",
								ocrText: this.translate[e],
								speed: 100,
								volume: 0,
							})
						})
						.then(res => {
							console.log(res.data.data.data, );
							this.audioNesw = res.data.data.data;
						})
				}else{
				post({
						url: "/voice/OcrToVoice",
						data: ({
							native_voice_name: "xiaoyan",
							ocrText: this.info[e],
							speed: 100,
							volume: 0,
						})
					})
					.then(res => {
						console.log("要的就是你",res.data.data.data);
						this.audioNesw = res.data.data.data;
					})
				}
			},
			swiper() {
				this.$refs.zSwiper.swiper.on("slideChange", (swiper) => {
					console.log("在当前Slide切换到另一个Slide时执行",swiper)
		        	if(this.bgAudioManager!=null){
		        		this.bgAudioManager.stop()
		        	}
					this.bgAudioManager=null
					this.audioNesw = '';
					this.state = false;
					console.log(this.newTime,this.audioNesw,this.state);
					this.audio(swiper.activeIndex)
					this.newTime =0;
					if (swiper.activeIndex == this.info.length - 2) {
						console.log("获取新数据");
					} else {
					
					}
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
					// console.log("播放",this.newTime,this.audioNesw);
					if (this.newTime!=0) {
						this.bgAudioManager.play();
						this.newTime=0
					} else{
		                        this.backgroundAudio()
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
					if(this.bgAudioManager!=null){
					      this.bgAudioManager.stop()
					     }
					     this.bgAudioManager=null
					     this.state = false;
					     this.newTime =0;
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
	page{
		background-color: #F6F6F6;
	}
	.player {
		height: 30%;
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
		// background-color:#86909c;
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
	.translateText{
		margin-top: 45rpx;
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
</style>
