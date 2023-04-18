<template>
	<z-swiper  v-model="info" :custom-style="{height:90+'vh'}" ref="zSwiper" :options="options"  @swiper="swiper">
		<z-swiper-item :custom-style="slideCustomStyle" v-for="(item,index) in info" :key="index" class="page">
			<view class="info" :style="{background:color[index%10]}">
		<view class="title">
		 {{item.newsId}}. {{item.newsTitle}}
		</view>
		<view class="text">
		 文章摘要：{{item.newsSummary.substring(1, item.newsSummary.length-1)}}
		</view>
		<!-- 播放器 -->
		<view class="player">
		 <slider :value="newTime" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000"
		  block-color="#8A6DE9" block-size="20" />
		 <view class="iconfont icon-zanting icon" v-if="state" @click="bindstate(false)"></view>
		 <view class="iconfont icon-bofang icon" v-if="!state" @click="bindstate(true)"></view>
		<view id="star" @click="shoucang(index)" :class="item.star == true?'fill':''">
		</view>
		</view>
		</view>
		</z-swiper-item>
	</z-swiper>
  <voice @Voice_shoucang="shoucang(this.newsIndex)" @Voice_play="bindstate(true)" @Voice_zanting="bindstate(false)"></voice>
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
				historyNews:[],
				shouchang:false,
				audioNesw: '',
				state: false,
				newTime: 0,
				newsInfo:"",
				newsNow:{},
				allowmusic:false,
				color:["#F53F3F","#F77234","#FF7D00","#F7BA1E","#FADC19","#9FDB1D","#00B42A","#3491FA","#165DFF","#722ED1"],
				slideCustomStyle: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '36rpx',
				},
				options: {
					effect: 'cards',
					direction: 'vertical',
					loop : true,
				},
				list: [],
				News_index:0,//记录轮播图展示数组在历史记录数组中的组数
			};
		},
		onLoad(options) {
			if(this.bgAudioManager!=null){
				this.bgAudioManager.stop()
			}
			// this.backgroundAudio()
			this.title = options.sort;
			uni.setNavigationBarTitle({
				title: options.sort,
			});
			this.news(options.sort)
			uni.onSocketMessage((res) => {
				console.log('收到服务器内容：', JSON.parse(res.data))
				if (this.historyNews.length >= 10) {
					// this.info = JSON.parse(res.data).Bytext;
					console.log("加一轮");
					this.historyNews = this.historyNews.concat(JSON.parse(res.data).Bytext);
					// for(var i = 0;i<this.historyNews.length;i++){
					// 	this.historyNews[i].star = false;
					// }
					console.log(this.info);
					console.log(this.historyNews);
				} else {
					console.log('第一轮');
					// this.info = JSON.parse(res.data).Bytext;
					this.news(options.sort)
					this.historyNews = this.historyNews.concat(JSON.parse(res.data).Bytext);
					for(var i = 0;i<this.historyNews.length;i++){
						this.historyNews[i].star = false;
					}
					this.info = this.historyNews
					console.log(this.info);
				}
				this.audio()
			});
		},
		// 下拉刷新数据
		onPullDownRefresh() {
			// this.info = [],
			// this.news(this.title)
		},
		onReachBottom() {
			// console.log(555);
		},
		onUnload(e){
			console.log(e,"页面卸载");
			if(this.bgAudioManager!=null){
					this.bgAudioManager.stop()
				}
				this.bgAudioManager=null
				this.audioNesw = '';
				this.state = false;
				// console.log(this.newTime,this.audioNesw,this.state);
				this.newTime =0;
				// console.log("111");
				uni.$emit('news', {  
					newsNow:{newsNow:this.newsNow,audioNesw:this.audioNesw,newTime: this.newTime}
				});
				// this.bgAudioManager.src = ""
		},
		methods: {
			//收藏
			shoucang(index){
				this.info[index].star = !this.info[index].star;
				console.log("当前新闻",this.newsNow);
				if(this.info[index].star == true){
					post({
						url: "/newsCollect/addnews",
							data: ({
								newsId: this.newsNow.newsId,
								newsTitle:this.newsNow.newsTitle,
								newsContent:this.newsNow.newsContent,
								newstype:this.newsNow.newstype
							})
						})
						.then(res => {
							console.log(res);
						})
				}else{
					post({
						url: "/newsCollect/delnews",
							data: ({
								id: this.newsNow.newsId,
							})
						})
						.then(res => {
							console.log(res);
						})
				}
				
			},
			// 新闻的获取
			news(e) {
				console.log("获取一次");
				get({
					url: "/news/sendTypeToDeepin",
						data: ({
							typeName: e
						})
					})
					.then(res => {
						console.log(res);
					})
			},
			// 新闻音频的获取
			audio(e) {
				this.allowmusic = false;
				const {newsId,newsTitle,newsContent} = this.info[e || 0]
				// console.log(newsId,newsTitle,newsContent);
				this.newsNow=this.info[e||0];//存入当前页面的新闻
				console.log("音频获取",this.newsNow);
				post({
						url: "/news/createToVoice",
						data: ({
							native_voice_name: "xiaoyan",
							newsId: newsId,
							newsContent: newsContent,
							newsTitle: newsTitle,
							speed: 100,
							volume: 0,
							newsType:this.title
						})
					})
					.then(res => {
						console.log(res.data);
						this.allowmusic = true;
						this.audioNesw = res.data.data.data;
					})
			},
			// 获取下一条新闻//合成新闻语音
			swiper() {
				this.$refs.zSwiper.swiper.on("slideChange", (swiper) => {
					if(this.bgAudioManager!=null){
						this.bgAudioManager.stop()
					}
					this.bgAudioManager=null
					this.audioNesw = '';
					this.state = false;
					console.log(this.newTime,this.audioNesw,this.state);
					this.audio(swiper.activeIndex)
					this.newTime =0;
				})
				this.$refs.zSwiper.swiper.on("fromEdge", async(swiper) => {
					// console.log("从第一个或最后一个Slide切换时执行",swiper.activeIndex)
				if(swiper.activeIndex == 11){
					// console.log("从最后一个Slide切换时执行",swiper)
					// this.$refs.zSwiper.swiper.detachEvents();
					this.News_index+=1;
					console.log(this.News_index);
					console.log(this.historyNews.slice(this.News_index*10,this.News_index*10+11));
					this.info =this.historyNews.slice(this.News_index*10,this.News_index*10+10)
					this.news(this.title)
					// this.$refs.zSwiper.swiper.attachEvents();
				}else if(swiper.activeIndex == 0){
					// console.log("从第一个Slide切换时执行",swiper)
					if(this.News_index > 0){
						// console.log("更新到上一轮的新闻");
						this.info =this.historyNews.slice((this.News_index-1)*10,(this.News_index-1)*10+10)
					}
					this.News_index -= 1;
					if(this.News_index == -1){
						this.News_index += 1;
					}
					console.log(this.News_index);
					
				}
				})
			},
			// 背景音频
			backgroundAudio(){
				this.bgAudioManager = uni.getBackgroundAudioManager();
				// this.bgAudioManager.pause()
				this.bgAudioManager.startTime = 0
			},
			// 播放与暂停
			bindstate(e) {
				if(this.allowmusic == false){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = 'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659182473850.wav';
					innerAudioContext.onPlay(() => {
					  console.log('没识别完音频的提示声音');
					});
				}else{
				this.state = e;
				if (e) {
					if( isNaN(this.newTime) ){
							this.newTime=0
						}
					console.log("播放",this.newTime,this.audioNesw);
					if (this.newTime!=0) {
						this.bgAudioManager.play();
						// this.newTime=0
					} else{
						//console.log(this.audioNesw);
						this.backgroundAudio()
						this.bgAudioManager.src = this.audioNesw;
						this.bgAudioManager.title = this.newsNow.newsTitle; //标题
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
				})}
			},
			outTimes() {
				// 当前进度除以总时长
				// console.log(parseInt(this.bgAudioManager.duration), "总的长度")
				// console.log(parseInt(this.bgAudioManager.currentTime), "当前的长度")
				if(this.bgAudioManager!=null){
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
				}
			},
			// 拖动进度
			sliderChange(e) {
				console.log(e.detail.value);
				if(this.audioNesw!=''){
					let allduration = this.bgAudioManager.duration
					this.newTime = e.detail.value
					this.bgAudioManager.seek(parseInt(parseInt(allduration) * parseInt(e.detail.value) / 100))
				}
				
			},
		}
	}
</script>

<style lang="less">
	page{
		overflow:hidden;
			background-color: #F6F6F6;
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

	.player {
		    position: relative;
		height: 20%;

		.icon {
			font-size: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
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
