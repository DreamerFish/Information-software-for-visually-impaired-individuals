<template>
	<view class="body">
		<view class='group-header'>问题反馈类型</view>
		<view class="tagbody">
			<view class="tag-view" v-for="(item,index) in info">
				<uni-tag :text="item" :inverted="index == tagid?false:true" type="primary" size="100"
					@click="setInverted(index)" />
			</view>
		</view>

		<view class='group-body'>
			<textarea placeholder='问题描述(请尽量详细描述)' name="neirong" v-model="content"></textarea>
		</view>
		<button type="default" class="Submit" @click="submit()">提交</button>
	</view>
	<voice :type="'feedback'" @Voice_content="setcontent"></voice>
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
				type: "default",
				tagid: 0,
				info: ["功能异常", "产品建议", "内容建议", "其它问题"],
				content: "",
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "反馈",
			});
		},
		methods: {
			setType() {
				let types = ["default", "primary", "success", "warning", "error"];
				let index = types.indexOf(this.type);
				types.splice(index, 1);
				let randomIndex = Math.floor(Math.random() * 4);
				this.type = types[randomIndex];
			},
			setInverted(index) {
				this.tagid = index;
			},
			submit() {
				console.log(this.content);
				post({
					url: "/opinion/add",
					data:{opinion:this.content,
					type:this.info[this.tagid]}
				}).then(res=>{
					console.log(res.data);
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224772068.wav";
					innerAudioContext.onPlay(() => {
						console.log('提交成功提示声');
					});
					uni.navigateBack()
					uni.showToast({
						title: '提交成功',
						duration: 2000
					});
				})
			},
			setcontent(content){
				console.log(content);
				if(content.includes("功能异常")){
					this.setInverted(0)
				}else if(content.includes("产品建议")){
					this.setInverted(1)
				}else if(content.includes("内容建议")){
					this.setInverted(2)
				}else if(content.includes("其它问题")){
					this.setInverted(3)
				}else{
					this.content = content
				}
				// this.content = content
			}
		},
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-tag.data-v-3f606880 {
		font-size: 32rpx;
	}

	.body {
		padding: 20rpx;
		padding-top: 40rpx;
		background-color: #F6F6F6;
		height: 100vh;
	}

	.tagbody {
		display: flex;
		justify-content: space-around;
		margin-top: 25rpx;
		margin-bottom: 40rpx;
	}

	.group-body {
		margin: 10rpx;
		padding: 25rpx;
		background-color: #fff;
		border-radius: 20rpx;

	}

	.Submit {
		position: relative;
		bottom: -45vh;
		background-color: #2979FF;
		color: #fff;
		border-radius: 50rpx;
	}
</style>
