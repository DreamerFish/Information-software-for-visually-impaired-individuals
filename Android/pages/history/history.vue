<template>
	<view class="page">
		<view class="news_list" :key="index" v-for="(item,index) in list">
			<view class="news" @click="toDetail(index)">
				<view class="title">
					{{item.newsTitle}}
				</view>
				<view class="content">
					{{item.newsContent}}
				</view>
			</view>
		</view>
	</view>
	<voice></voice>
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
				list: []
			};
		},
		onLoad(options) {
			this.title = options.sort;
			uni.setNavigationBarTitle({
				title: options.sort,
			});
			this.gethistoryByuserId();
			
		},
		methods:{
			gethistoryByuserId() {
				this.user = uni.getStorageSync('user');
				get({
					url: "/news/gethistoryByuserId",
					data:{userId:this.user.userId}
				}).then(res=>{
					this.list = res.data.data.newsHistories
				})
			},
			toDetail(e){
				// console.log(this.list[e]);
				var data = JSON.stringify(this.list[e])
				uni.navigateTo({
					url: "../listDetail/listDetail?content=" + data
				})
			}
		}
	}
</script>

<style lang="less">
	template {

		background-color: #f6f6f6
	}

	.page {
		padding: 2vw 5vw;
		background-color: #f6f6f6;
		height: 100vh;
		
	}

	.news_list {
		background-color: #fff;
		width: 90vw;
		height: 38vw;
		margin: 0 0 10rpx 0;
		border-radius: 20rpx;
	}
	.news{
		padding: 20rpx 30rpx;
		font-size: 32rpx;
		.title{
			font-size: 40rpx;
			font-weight: bold;
			
			  white-space: nowrap;
			  /* 超出范围隐藏 */
			  overflow: hidden;
			  /* 文字超出用省略号 */
			  text-overflow: ellipsis;
			  margin-bottom: 30rpx;
		}
		.content{
			/* 超出范围隐藏 */
			overflow: hidden;
			/* 文字超出用省略号 */
			text-overflow: ellipsis;
			/* 盒子模型 */
			display: -webkit-box;
			/* 显示的文本行数 */
			-webkit-line-clamp: 3;
			/* 子元素的垂直排列方式 */
			-webkit-box-orient: vertical;
			line-height: 48rpx;
		}
	}
</style>
