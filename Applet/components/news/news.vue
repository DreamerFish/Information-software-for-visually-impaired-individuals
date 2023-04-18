<template>
	<view class="news" @click="openNewPage"  data-url="pages/detail/detail">
		<view class="title">
			暂无新闻播放
		</view>
		<view class="iconfont icon-bofang">
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			news: {
				type: Number,
				default: 0,
				required: Object,
				validator: function(value) {
					return value >= 0
				}

			}
		},
		data() {
			return {
			};
		},
		methods:{
			openNewPage(e){
				uni.navigateTo({
					url:`../../${e.currentTarget.dataset.url}`
				})
			}
		},
		//在实例创建完成后被立即调用
		created() {
			console.log("组件创建");
		},
		// 在挂载开始之前被调用
		beforeMount() {
			console.log("111");
		},
		// 挂载到实例上去之后调用
		mounted() {
			console.log(222);
		},
		// 数据更新之后时调用
		updated() {
			console.log(333);
		},
		//Vue 实例销毁后调用。
		destroyed() {
			console.log("组件销毁");
		},
	}
</script>

<style lang="less">
	.news {
		position: fixed;
		z-index: 10;
		bottom: 2vh;
		width: 91vw;
		height: 15vw;
		margin: 0 0vw 0 3vw;
		border-radius: 30rpx;
		background-color: #165DFF;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 50rpx;
		padding-left: 25rpx;
		.img {
			flex: 2;
		}

		.title {
			flex: 6;
			font-size: 40rpx;
		}

		.iconfont {
			flex: 2;
			font-size: 80rpx;
		}

	}
</style>
