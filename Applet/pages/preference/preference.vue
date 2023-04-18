<template>
	<view class="pre_body">
		<view class="h1">我的内容偏好</view>
		<view class="pre-view" v-for="(item,index) in Newslike" @touchend="addReferrals(item,index)"
			@longpress="reduceReferrals(item,index)">
			<view class="pre-view-bgc" :style="{'width':long[index],'background-image':backcolor[index]}">
				<view class="pre_item">
					<span>{{item.newsType}}</span>
					<span v-if="item.value===10" class="recommend">强力推荐</span>
					<span v-if="item.value===8" class="recommend">增加推荐</span>
					<span v-if="item.value===5" class="recommend">正常推荐</span>
					<span v-if="item.value===3" class="recommend">减少推荐</span>
					<span v-if="item.value===0" class="recommend">不推荐</span>
				</view>
			</view>
		</view>
	</view>
	<voice @Voice_addReferrals="addReferrals" @Voice_reduceReferrals="reduceReferrals"></voice>
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
				Newslike: [],
				touchNum: 0,
				 isactive : -1,
				backcolor:[],
				long:[],
			};
		},
		onLoad() {
			this.GetNewsType();
		},
		methods: {
			GetNewsType() {
				get({
					url: "/newsType/userGetAllNewsType"
				}).then(res => {
					// console.log(res);
					this.Newslike = res.data.data.userNewsTypes
					// console.log(this.Newslike);
					for(var i = 0 ; i<this.Newslike.length;i++){
						switch(this.Newslike[i].value){
							case 10:
							this.backcolor.push('linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)');
							this.long.push('100%');
							break;
							case 8:
							this.backcolor.push('linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)');
							this.long.push('70%');
							break;
							case 5:
							this.backcolor.push('linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)');
							this.long.push('50%');
							break;
							case 3:
							this.backcolor.push('linear-gradient(to right,#9ADAFD 0%,#D8C4FF 100%)');
							this.long.push('30%');
							break;
							case 0:
							this.backcolor.push('linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)');
							this.long.push('15%');
							break;
						}
					}
				})
			},
			//推荐请求
			Referrals(type,houduanflag,likeNewsTypeId,newsType,value){
				console.log(type,houduanflag,likeNewsTypeId,newsType,value);
				post({
					url: "/newsType/update",
					data: ({
						houduanflag: houduanflag,
						likeNewsTypeId,
						newsType,
						value,
					})
				
				}).then(res => {
					console.log(res);
					if(res.data.success){
						this.GetNewsType();
						uni.showToast({
							title: type?"增加推荐成功":"减少推荐成功",
							duration: 2000
						});
					}
				})
			},
			//减少推荐
			reduceReferrals(e,index) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224944611.wav";
				innerAudioContext.onPlay(() => {
					console.log('减少推荐成功提示声');
				});
				this.isactive = index;
					let {
						houduanflag,
						likeNewsTypeId,
						newsType,
						value
					} = this.Newslike[index];
				switch (value) {
					case 10:
						value = 8;
						this.long[this.isactive] = '70%'
						this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)'
						break;
					case 8:
						 value = 5;
						 this.long[this.isactive] = '50%'
						 this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)'
						
						break;
					case 5:
						value = 3;
						this.long[this.isactive] = '30%'
						this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 100%)'
						break;
					case 3:
						value = 0;
						this.long[this.isactive] = '15%'
						this.backcolor[this.isactive] = 'linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)'
						break;
					default:
						value = 0;
						this.long[this.isactive] = '15%'
						this.backcolor[this.isactive] = 'linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)'
						break;
				}
				this.Referrals(false,houduanflag,likeNewsTypeId,newsType,value,)
			},
			//增加推荐
			addReferrals(e,index) {
				console.log("要的就是你",index);
				
				console.log(this.Newslike[index]);
				this.isactive = index;
				this.touchNum++
				if(e == ""){
					this.touchNum++
				}
				let {
					houduanflag,
					likeNewsTypeId,
					newsType,
					value
				} = this.Newslike[index];
				const that=this
				setTimeout(() => {
					if (this.touchNum == 1) {}
					if (this.touchNum >= 2) {
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224995782.wav";
						innerAudioContext.onPlay(() => {
							console.log('增加推荐成功提示声');
						});
						switch (value) {
							case 0:
								value = 3;
								this.long[this.isactive] = '30%'
								this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)'
								break;
							case 3:
								value = 5;
								this.long[this.isactive] = '50%'
								this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)'
								break;
							case 5:
								value = 8;
								this.long[this.isactive] = '70%'
								this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)'
								break;
							case 8:
								value = 10;
								this.long[this.isactive] = '100%'
								this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)'
								break;
							default:
								value = 10;
								this.long[this.isactive] = '100%'
								this.backcolor[this.isactive] = 'linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)'
								break;
						}
							this.Referrals(true,houduanflag,likeNewsTypeId,newsType,value,)

					}
					this.touchNum = 0
				}, 300)
			},
			
		},
		//推荐

	}
</script>

<style lang="scss">
	.h1 {
		font-size: 45rpx;
	}

	.recommend {
		position: absolute;
		right: 75rpx;
		font-size: 30rpx;
		opacity: .7;
	}

	.pre-view {
		display: flex;
		// background-image: linear-gradient(to right, #9ADAFD 0%, #D8C4FF 40%, #EBC5F8 60%, #ffe6f1 100%);
		background-color: #E4F0FE;
		height: 90rpx;
		// padding-left: 35rpx;
		line-height: 90rpx;
		margin: 25rpx 0;
		border-radius: 40rpx;
	}
.pre-view-bgc {
		display: flex;
		background-image: linear-gradient(to right, #9ADAFD 0%, #D8C4FF 50%, #EBC5F8 60%, #ffe6f1 100%);
		height: 90rpx;
		padding-left: 35rpx;
		    width: 100%;
		line-height: 90rpx;
		border-radius: 40rpx;
		transition: all .7s;
	}
	.pre_body {
		padding: 35rpx;
		height: 125vh;
		background-color: #F6F6F6;
	}
</style>
