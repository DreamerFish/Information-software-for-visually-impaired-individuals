<template>
	<view class="raw">
		<view class="scan_top">
		<!-- 搜索框 -->
		<view class="inputp">
			<view class="inputs">
				<input  type="text" v-model="keyword" :placeholder="placeholder" ref='searchinput' class='scaninput'
				maxlength="24" @input="inputChange" @search="doSearch(false)" @confirm="doSearch(false)"><!-- 输入框 :placeholder：未输入时显示内容，
				v-model：绑定字段，maxlength：设置输入长度，@input：输入框内容有变化时触发事件 @confirm：能让手机输入框的确认变成搜索-->
				<uni-icons type="close" size="20" color="#a7a7a7" style="padding-right: 20rpx;" v-if="isDelShow" @click="clear"></uni-icons>
				<view class="scan_weizhi">
					<view class="scan_btn" @tap="doSearch(false)">搜索</view><!-- 执行搜索事件 -->
				</view>
			</view>
		</view>
		</view>
		<!-- 搜索记录 -->
		<view class="record">
			<view class="record_heand">
				<text >搜索历史</text>
				<image src="https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660273298513.png" @click="delete_key"></image><!-- 点击历史记录直接执行搜索 -->
			</view>
			<!-- 搜索历史内容 -->
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
			<view class="keyword-block" v-if="oldKeywordList.length>0"><!-- v-if:判断是否存在历史记录 -->
				<view class="keyword">
					<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view><!-- 循环渲染历史记录数组内容 -->
				</view>
			</view>
			</scroll-view>
		</view>
		<!-- 热门搜索 -->
		<view class="record">
			<view class="record_heand">
				<text >热门搜索</text>
				<image :src="this.forbid== '1'? 'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660273361715.png':'https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660273636683.png'"
				 @tap="hotToggle"></image><!-- ：class:判断是否点击，每次点击会改变绑定的字段(也可以是样式)，根据字段不同展示不同的图标	自定义图标在style	 -->		
			</view>
			<!-- 搜索热门内容 -->
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y><!-- 判断是否展示热门内容 -->
			<view class="keyword-block" v-if="forbid==''">
				<view class="keyword">
					<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view><!-- 循环热门消息标签，并添加点击标签搜索事件 -->
				</view>
			</view>
			<view class="yingcang" v-else>
				<view>当前搜热门搜索已隐藏</view>
			</view>
			</scroll-view>
		</view>
	</view>
	<voice :type="'search'"></voice>
</template>

<script>
	import {
		get,
		post,
		uploadFile
	} from "../../utils/request.js"
	export default {
		props: {
			
			placeholder: {//占位符，为输入时显示的内容
				type: String,
				default: '娱乐，好玩的'
			},
			   
		},
		data() {
			return {
				keyword: "",//关键字
				oldKeywordList: [],//历史记录
				hotKeywordList: [],//热门搜索
				isShowKeywordList: false,
				isDelShow: false,//判断是否出现删除标志
				forbid:"",//热搜显隐标志
				showsearchbtn: false,
				searchval: '',
				target: 0,
				
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			//页面刷新渲染
			init() {
				//this.loadDefaultKeyword();
				 this.loadOldKeyword();
				this.loadHotKeyword();

			},
			//页面渲染时自动读取本地存储的历史记录
			loadOldKeyword(){
				uni.getStorage({
					key:'OldKeys',
					success:(res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					},
				})
			},
			//页面渲染加载热门搜索关键字，后期通过后台获取数据赋值
			loadHotKeyword(){
				this.hotKeywordList = ['华为手机', '苹果电脑', '中国', '视障人士', '乒乓球', '独行月球', '广东海洋大学', 'USB', '3.1415926'];
			},
			//监听输入
			inputChange: async function(event){
				//判断输入框是否有值输入，决定是否出现删除符号
					if (this.keyword.length>0) {
						console.log(this.keyword.length)
						this.isDelShow = true;
						console.log("大过零")
					}else{
						this.isDelShow = false;
						console.log("不大于零")
					}
					//兼容引入组件时传入参数情况
					var keyword = event.detail?event.detail.value:event;
					if(!keyword){
						this.isShowKeywordList = false;
						return;
					}
					this.isShowKeywordList = true;
					//替换自己接口
				
			},
			//执行搜索
			doSearch(keyword){
				if(keyword==''){
					if(this.keyword.length==0){//判断是否输入内容
						console.log("不执行搜索")
						uni.showToast({//没有则弹出提示框，提示未输入
							title:"请输入关键字",
							icon:'none',
							
						})
					}else if(this.keyword.length>=1){//若存在输入内容，执行搜索
						console.log("执行了搜索")
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660275137676.wav";
						innerAudioContext.onPlay(() => {
							console.log('搜索中提示声');
						});
						keyword = keyword===false?this.keyword:keyword;
						this.keyword = keyword;
						this.saveKeyword(keyword); //保存为历史,执行此事件
						// uni.showToast({//弹出提示框
						// 	title: keyword,
						// 	icon: 'none',
						// 	duration: 2000
						// })
						post({
							url: '/news/getNewsBytext',
							data: ({
								text: this.keyword,
							})
						}).then(res => {
							// console.log(JSON.parse(res.data));
							const result = res.data.data.result
							uni.navigateTo({
								url: '../searchResult/searchResult?sort=' + result,
							});
						})
							
						
					}	
				}else if(keyword!=''){
					this.keyword = keyword
					console.log("执行了搜索")
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660275137676.wav";
					innerAudioContext.onPlay(() => {
						console.log('搜索中提示声');
					});
					keyword = keyword===false?this.keyword:keyword;
					this.keyword = keyword;
					this.saveKeyword(keyword); //保存为历史,执行此事件
					uni.showToast({
						title: keyword,
						icon: 'none',
						duration: 2000
					})
					post({
						url: '/news/getNewsBytext',
						data: ({
							text: keyword,
						})
					}).then(res => {
						console.log(res.data.data.result);
						const result = res.data.data.result
						uni.navigateTo({
							url: '../searchResult/searchResult?sort=' + result,
						});
					})
				}
				
			},
			//保存关键字到历史
			saveKeyword(keyword){
				uni.getStorage({
					key:'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if(findIndex == -1){
							OldKeys.unshift(keyword);
						}else{
							OldKeys.splice(findIndex,1);
							OldKeys.unshift(keyword);
						}
						//最多十个记录
						OldKeys.length>10 && OldKeys.pop();//删除数组尾部元素
						uni.setStorage({
							key:'OldKeys',
							data:JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys;//更新历史记录
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key:'OldKeys',
							data:JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys;//更新历史记录
					}
				})
			},
			//清空输入框
			clear(){
				console.log(this.keyword)
				uni.hideKeyboard();
				this.keyword = '';
				this.inputChange('')
				console.log("没有"+this.keyword.length+this.keyword)
			},
			//删除历史记录-全部
			delete_key(){
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
							if(res.confirm){
								this.oldKeywordList = [];
								uni.removeStorage({
									key:'OldKeys'
								});
						}else if(res.cancenl){
							console.log("用户点击取消")
						}
					}
					})
			},
			//热门开关
			hotToggle(){
				this.forbid = this.forbid ? '' : '1'//两个图标的差别在这个数字"1"上
				console.log(this.forbid);
				},
		},
		watch: {
			searchval(v) {
				var me = this;
				me.$emit('inputchange', v)
				if (v != '') {
					me.showsearchbtn = true;
				} else {
					me.showsearchbtn = false;
				}
			},
			target(val) {
				this.tap(val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import "/style/iconfont.css";
	 // @import './style/icons/iconcss.css'; 
	 
    .scan_top{
		margin-top: 80rpx;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		.inputp {
			width: 580rpx;
			margin-left: 30rpx;
			margin-top: -10rpx;
			.inputs {
				background: #F2F2F2;
				border-radius: 20upx;
				position: relative;
		        display: flex;
				align-items: center;
				
				.scaninput {
					width: 500rpx;
					height: 60rpx;
					padding-left: 10rpx;
					display: flex;
					align-items: center;
					//background-color: #007AFF;
				}
		
				.searchimg {
					width: 1em;
					height: 1em;
					position: absolute;
					//top: 25upx;
					left: 20upx;
				}
		
				.scanimg {
					width: 1em;
					height: 1em;
					position: absolute;
					//top: 25upx;
					right: 20upx;
				}
		
				.searchbtn {
					position: absolute;
					//right: 20upx;
					//top: 15upx;
					border-radius: 5upx;
					//margin-right: -250rpx;
					background-color: #007AFF;
					color: #fff;
					width: 4em;
					line-height: 2em;
					text-align: center;
					font-size: 0.8em;
					
				}
				.scan_weizhi{
					display: flex;
					justify-content: flex-end;
					.scan_btn{
						width: 140rpx;
						height: 65rpx;
						color: #FFF;
						background-color: #165DFF;
						border-radius: 40rpx;
						display:flex;
						flex-direction:row;    
						align-items: center;
						justify-content:center;
						
					}
				}
				
			}
		}
	}
	.inputp {
		width: 500rpx;
	    margin-top: 80rpx;
		margin-left: 110rpx;
		.inputs {
			background: #F2F2F2;
			border-radius: 20upx;
			position: relative;
	        display: flex;
			align-items: center;
			
			.scaninput {
				width: 370rpx;
				height: 60rpx;
				padding-left: 10rpx;
				display: flex;
				align-items: center;
			}
	
			.searchimg {
				width: 1em;
				height: 1em;
				position: absolute;
				top: 25upx;
				left: 20upx;
			}
	
			.scanimg {
				width: 1em;
				height: 1em;
				position: absolute;
				top: 25upx;
				right: 20upx;
			}
	
			.searchbtn {
				position: absolute;
				right: 20upx;
				top: 15upx;
				border-radius: 5upx;
				//margin-right: -250rpx;
				//background: #007AFF;
				color: #fff;
				width: 4em;
				line-height: 2em;
				text-align: center;
				font-size: 0.8em;
				
			}
		}
	}
	.record{
		
		.record_heand{
			margin-top: 30rpx;
			display: flex;
			text{
				width: 80%;
				height: 50rpx;
				//background-color: #007AFF;
				margin-left: 50rpx;
				
			}
			image{
				width: 7%;
				    height: 40rpx;
					opacity: .5;
				//background-color: #1AAD19;
				margin-right: 50rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-left: 70rpx;
			}
			
		}
		.record_buttom{
			
		}
	}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
	.yingcang{
		margin: 50rpx 50rpx;
	}
</style>
