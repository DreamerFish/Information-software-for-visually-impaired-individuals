<template>
	<view :class="longPress == '1' ? 'record-layer' : 'record-layer1'">
		<view  :class="longPress == '1' ? 'record-box' : 'record-box1'">
			<view class="record-btn-layer">
				<button class="record-btn" :class="longPress == '1' ? 'record-btn-1' : 'record-btn-2'" :style="VoiceTitle != '松开手指,取消发送' && longPress != '1'?'background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);':'background-color: rgba(0, 0, 0, .5);color:white'"
					@longtap="longpressBtn" @touchend="touchendBtn()" @touchmove="handleTouchMove" @touchstart="longpressBtn">
					<image
						src="https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659237233452.png" />
					<text>{{VoiceText}}</text>
				</button>
			</view>
			<!-- 语音音阶动画 -->
			<view :class="VoiceTitle != '松开手指,取消发送'?'prompt-layer prompt-layer-1':'prompt-layer1 prompt-layer-1'"  v-if="longPress == '2'">
				<view class="prompt-loader">
					<view class="em" v-for="(item,index) in 15" :key="index"></view>
				</view>
				<text class="span">{{VoiceTitle}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		get,
		post,
		uploadFile
	} from "../../utils/request.js"
	const recorderManager = uni.getRecorderManager()
	var init // 录制时长计时器
	var timer // 播放 录制倒计时
	export default {
		data() {
			return {
				longPress: '1', // 1显示 按住 说话 2显示 说话中
				delShow: false, // 删除提示框显示隐藏
				time: 0, //录音时长
				duration: 60000, //录音最大值ms 60000/1分钟
				tempFilePath: '', //音频路径
				startPoint: {}, //记录长按录音开始点信息,用于后面计算滑动距离。
				sendLock: true, //发送锁，当为true时上锁，false时解锁发送
				VoiceTitle:'松手结束录音',
				recorderManager: uni.getRecorderManager(), 
				VoiceText:'按住 说话',
				types:''
			}
		},
		props:['type'],
		created:function(){
				this.types=this.type;
				console.log(this.type)//打印父组件传过来的参数
		},
		methods: {
			// 长按录音事件
			longpressBtn(e) {
				this.startPoint = e.touches[0];//记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
				this.longPress = '2';
				this.VoiceText='说话中...';
				recorderManager.onStop((res) => {
					// console.log(res);
					this.tempFilePath = res.tempFilePath;
				})
				const options = {
					duration: this.duration, // 指定录音的时长，单位 ms
					sampleRate: 16000, // 采样率
					numberOfChannels: 1, // 录音通道数
					encodeBitRate: 96000, // 编码码率
					format: 'mp3', // 音频格式，有效值 aac/mp3
					frameSize: 10, // 指定帧大小，单位 KB
				}
				this.recorderManager.start(options);
				// 监听音频开始事件
				this.sendLock = false;//长按时是不上锁的。
				recorderManager.onStart((res) => {})
			},
			// 长按松开录音事件
			touchendBtn() {
				this.longPress = '1';
				this.VoiceText='按住 说话';
				this.VoiceTitle = '松手结束录音'
				recorderManager.onStop((res) => {
					console.log(this.sendLock);
					if (this.sendLock) {
					  //上锁不发送
					} else {//解锁发送，发送网络请求
					  if (res.duration < 1000)
					        wx.showToast({
					              title: "录音时间太短",
					              icon: "none",
					              duration: 1000
					        });
					   else {
						   this.tempFilePath = res.tempFilePath
						   uploadFile({
						   	url: '/voice/VoiceControl',
						   	src: res.tempFilePath,
						   }).then(res => {
						   	console.log(JSON.parse(res.data));
							const innerAudioContext = uni.createInnerAudioContext();
							innerAudioContext.autoplay = true;
							innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660225073079.wav";
							innerAudioContext.onPlay(() => {
								console.log('语音操作成功提示声');
							});
							if(JSON.parse(res.data).data.service.includes("新闻") && JSON.parse(res.data).data.service.length > 2){
								const service = JSON.parse(res.data).data.service
								uni.navigateTo({
									url: '../searchResult/searchResult?sort=' + service,
								});
							}else if(JSON.parse(res.data).message == "失败" && this.types == "feedback"){
								this.$emit("Voice_content",JSON.parse(res.data).data.result)
							}
							switch(JSON.parse(res.data).data.service){
								case '资讯':
								uni.navigateTo({
									url: "../index/index?content=" + 0
								});
								break;
								case '识别':
								uni.navigateTo({
									url: "../index/index?content=" + 1
								});
								break;
								case '收藏':
								uni.navigateTo({
									url: "../list/list?sort=" + '我的收藏'
								})
								break;
								case '历史记录':
								uni.navigateTo({
									url: "../history/history?sort=" + '历史记录'
								})
								break;
								case '偏好':
								uni.navigateTo({
									url: "../preference/preference"
								})
								break;
								case '反馈':
								uni.navigateTo({
									url: "../feedback/feedback"
								})
								break;
								case '猜你喜欢':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '猜你喜欢',
								});
								break;
								case '时政':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '时政',
								});
								break;
								case '财经':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '财经',
								});
								break;
								case '科技':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '科技',
								});
								break;
								case '体育':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '体育',
								});
								break;
								case '教育':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '教育',
								});
								break;
								case '家具':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '家具',
								});
								break;
								case '游戏':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '游戏',
								});
								break;
								case '社会':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '社会',
								});
								break;
								case '娱乐':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '娱乐',
								});
								break;
								case '股票':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '股票',
								});
								break;
								case '彩票':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '彩票',
								});
								break;
								case '时尚':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '时尚',
								});
								break;
								case '星座':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '星座',
								});
								break;
								case '房产':
								uni.navigateTo({
									url: '../detail/detail?sort=' + '房产',
								});
								break;
								case '印刷体':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'GeneralText'}`
								})
								break;
								case '手写体':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'HandWriting'}`
								})
								break;
								case '文档':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'Word'}`
								})
								break;
								case '网络图片':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'WebImage'}`
								})
								break;
								case '物品':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'EngineImage'}`
								})
								break;
								case '表格':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'Form'}`
								})
								break;
								case '翻译':
								uni.navigateTo({
									url: `../recognition/recognition?sort=${'Translate'}`
								})
								break;
								case '播放':
								this.$emit("Voice_play")
								break;
								case '暂停':
								this.$emit("Voice_zanting")
								break;
								case '搜索':
								const innerAudioContext = uni.createInnerAudioContext();
								innerAudioContext.autoplay = true;
								innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311025475.wav";
								innerAudioContext.onPlay(() => {
									console.log('搜索提示声');
								});
								uni.navigateTo({
									url: '../search/search',
								});
								break;
								case '增加科技':
								this.$emit("Voice_addReferrals","",0)
								break;
								case '增加房产':
								this.$emit("Voice_addReferrals","",1)
								break;
								case '增加星座':
								this.$emit("Voice_addReferrals","",2)
								break;
								case '增加时政':
								this.$emit("Voice_addReferrals","",3)
								break;
								case '增加时尚':
								this.$emit("Voice_addReferrals","",4)
								break;
								case '增加家具':
								this.$emit("Voice_addReferrals","",5)
								break;
								case '增加社会':
								this.$emit("Voice_addReferrals","",6)
								break;
								case '增加彩票':
								this.$emit("Voice_addReferrals","",7)
								break;
								case '增加娱乐':
								this.$emit("Voice_addReferrals","",8)
								break;
								case '增加体育':
								this.$emit("Voice_addReferrals","",9)
								break;
								case '增加教育':
								this.$emit("Voice_addReferrals","",10)
								break;
								case '增加股票':
								this.$emit("Voice_addReferrals","",11)
								break;
								case '增加游戏':
								this.$emit("Voice_addReferrals","",12)
								break;
								case '增加财经':
								this.$emit("Voice_addReferrals","",13)
								break;
								case '减少科技':
								this.$emit("Voice_reduceReferrals","",0)
								break;
								case '减少房产':
								this.$emit("Voice_reduceReferrals","",1)
								break;
								case '减少星座':
								this.$emit("Voice_reduceReferrals","",2)
								break;
								case '减少时政':
								this.$emit("Voice_reduceReferrals","",3)
								break;
								case '减少时尚':
								this.$emit("Voice_reduceReferrals","",4)
								break;
								case '减少家具':
								this.$emit("Voice_reduceReferrals","",5)
								break;
								case '减少社会':
								this.$emit("Voice_reduceReferrals","",6)
								break;
								case '减少彩票':
								this.$emit("Voice_reduceReferrals","",7)
								break;
								case '减少娱乐':
								this.$emit("Voice_reduceReferrals","",8)
								break;
								case '减少体育':
								this.$emit("Voice_reduceReferrals","",9)
								break;
								case '减少教育':
								this.$emit("Voice_reduceReferrals","",10)
								break;
								case '减少股票':
								this.$emit("Voice_reduceReferrals","",11)
								break;
								case '减少游戏':
								this.$emit("Voice_reduceReferrals","",12)
								break;
								case '减少财经':
								this.$emit("Voice_reduceReferrals","",13)
								break;
							}
						   })
					   }
					}
				})
				
				// this.recordingTimer(this.time)
				this.recorderManager.stop();//结束录音
			},
			// 删除录音
			      handleTouchMove(e) {
			          //touchmove时触发
			          var moveLenght = e.touches[e.touches.length - 1].clientY - this.startPoint.clientY; //移动距离
			          if (Math.abs(moveLenght) > 70) {
			            // wx.showToast({
			            //       title: "松开手指,取消发送",
			            //       icon: "none",
			            //       duration: 60000
			            // });
						// console.log("松开手指,取消发送");
						this.VoiceTitle = "松开手指,取消发送";
						this.VoiceText='松开手指,取消发送';
						this.delBtn()
			            this.sendLock = true;//触发了上滑取消发送，上锁
			          } else {
			            // wx.showToast({
			            //       title: "正在录音，上划取消发送",
			            //       icon: "none",
			            //       duration: 60000
			            // });
						this.VoiceTitle = "松手结束录音";
						this.VoiceText='松手结束录音';
			            this.sendLock = false;//上划距离不足，依然可以发送，不上锁
			          }
			    },
			delBtn() {
				this.delShow = false;
				this.time = 0
				this.tempFilePath = '';
				// this.VoiceTitle = '松手结束录音'
			},
		}
	}
</script>

<style lang="less">
	/* 语音录制开始--------------------------------------------------------------------- */
	.record-layer {
		width: 91vw;
		// padding: 300px 0;
		box-sizing: border-box;
		height: 15vw;
		position: fixed;
		margin-left: 4vw;
		z-index: 10;
		bottom: 3vh;
	}
	
	.record-layer1 {
		width: 100vw;
		// padding: 300px 0;
		box-sizing: border-box;
		height: 100vh;
		position: fixed;
		background-color: rgba(0, 0, 0, .6);
		// padding: 0 4vw;
		z-index: 10;
		bottom: 0vh;
	}

	.record-box {
		width: 100%;
		position: relative;
	}
	.record-box1 {
		width: 100%;
		position: relative;
		    bottom: -83vh;
		    height: 17vh;
	}
	.record-btn-layer {
		width: 100%;
	}

	.record-btn-layer button::after {
		border: none;
		transition: all 0.1s;
	}

	.record-btn-layer button {
		font-size: 14px;
		line-height: 50px;
		width: 100%;
		height: 50px;
		border-radius: 8px;
		text-align: center;
		background: #FFD300;
		transition: all 0.1s;
	}

	.record-btn-layer button image {
		width: 16px;
		height: 16px;
		margin-right: 4px;
		vertical-align: middle;
		transition: all 0.3s;
	}
.record-btn-layer .record-btn-1 {
		background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
		color: #000000!important;
		
	}

	.record-btn-layer .record-btn-2 {
		border-radius: 168rpx 168rpx 0 0;
		height: 17vh;
		line-height: 17vh;
		transition: all 0.3s;
	}

	/* 提示小弹窗 */
	.prompt-layer {
		border-radius: 15px;
		background: #95EB6C;
		padding: 8px 16px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		height: 11vh;
		transform: translateX(-50%);
		transition: all 0.3s;
	}

	.prompt-layer::after {
		content: '';
		display: block;
		border: 12px solid rgba(0, 0, 0, 0);
		border-radius: 10rpx;
		border-top-color: #95EB6C;
		position: absolute;
		bottom: -46rpx;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.3s;
	}
    //取消动画
	.prompt-layer1 {
		border-radius: 15px;
		background: #FB5353;
		padding: 8px 16px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		height: 11vh;
		transform: translateX(-50%);
		transition: all 0.3s;
	}
	
	.prompt-layer1::after {
		content: '';
		display: block;
		border: 12px solid rgba(0, 0, 0, 0);
		border-radius: 10rpx;
		border-top-color: #FB5353;
		position: absolute;
		bottom: -46rpx;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.3s;
	}
	.prompt-layer-1 {
		font-size: 12px;
		width: 150px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: -400rpx;
	}

	.prompt-layer-1 .p {
		color: #000000;
	}

	.prompt-layer-1 .span {
		color: rgba(0, 0, 0, .6);
	}

	.prompt-loader .em {}

	/* 语音音阶------------- */
	.prompt-loader {
		width: 96px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.prompt-loader .em {
		display: block;
		background: #333333;
		width: 1px;
		height: 10%;
		margin-right: 2.5px;
		float: left;
	}

	.prompt-loader .em:last-child {
		margin-right: 0px;
	}

	.prompt-loader .em:nth-child(1) {
		animation: load 2.5s 1.4s infinite linear;
	}

	.prompt-loader .em:nth-child(2) {
		animation: load 2.5s 1.2s infinite linear;
	}

	.prompt-loader .em:nth-child(3) {
		animation: load 2.5s 1s infinite linear;
	}

	.prompt-loader .em:nth-child(4) {
		animation: load 2.5s 0.8s infinite linear;
	}

	.prompt-loader .em:nth-child(5) {
		animation: load 2.5s 0.6s infinite linear;
	}

	.prompt-loader .em:nth-child(6) {
		animation: load 2.5s 0.4s infinite linear;
	}

	.prompt-loader .em:nth-child(7) {
		animation: load 2.5s 0.2s infinite linear;
	}

	.prompt-loader .em:nth-child(8) {
		animation: load 2.5s 0s infinite linear;
	}

	.prompt-loader .em:nth-child(9) {
		animation: load 2.5s 0.2s infinite linear;
	}

	.prompt-loader .em:nth-child(10) {
		animation: load 2.5s 0.4s infinite linear;
	}

	.prompt-loader .em:nth-child(11) {
		animation: load 2.5s 0.6s infinite linear;
	}

	.prompt-loader .em:nth-child(12) {
		animation: load 2.5s 0.8s infinite linear;
	}

	.prompt-loader .em:nth-child(13) {
		animation: load 2.5s 1s infinite linear;
	}

	.prompt-loader .em:nth-child(14) {
		animation: load 2.5s 1.2s infinite linear;
	}

	.prompt-loader .em:nth-child(15) {
		animation: load 2.5s 1.4s infinite linear;
	}

	@keyframes load {
		0% {
			height: 10%;
		}

		50% {
			height: 100%;
		}

		100% {
			height: 10%;
		}
	}

	/* 语音音阶-------------------- */
	.prompt-layer-2 {
		top: -40px;
	}

	.prompt-layer-2 .text {
		color: rgba(0, 0, 0, 1);
		font-size: 12px;
	}

	/* 语音录制结束---------------------------------------------------------------- */
</style>
