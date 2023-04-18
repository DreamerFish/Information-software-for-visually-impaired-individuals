<script>
	//心跳
	let heartCheck = {
	    timeout: 100000,
	    timeoutObj: null,
	    serverTimeoutObj: null,
	    reset: function() {
	        clearTimeout(this.timeoutObj);
	        clearTimeout(this.serverTimeoutObj);
	        return this;
	    },
	    start: function() {
	        this.timeoutObj = setTimeout(() => {
	            //   console.log("发送ping");
	            let msg = {
	                msg: 'ping',
	                toUser: 'root'
	            }
	            const that = this;
	            uni.sendSocketMessage({
	                data: JSON.stringify(msg)
	            })
	            this.serverTimeoutObj = setTimeout(() => {
	                uni.closeSocket();
	            }, this.timeout);
	        }, this.timeout);
	    }
	};
	export default {
		onLaunch: function() {
			this.connectStart()
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//与socket建立连接
			connectStart() {
				uni.connectSocket({
					url: "wss://www.gdouhc.top/blind/api/web",
					success: (res) => {
						console.log("进入聊天", res)
						this.onSocketMessage()

					},
					fail: (err) => {
						uni.showToast({
							title: '网络异常!',
						})
						console.log(err)
					},
				})

			},
			// 监听消息
			onSocketMessage() {
				//  连接成功
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					heartCheck.reset().start()
				});
				//连接失败
				uni.onSocketError((err) => {
					console.log('websocket连接失败', err);
					this.reconnect()

				})
				//关闭
				uni.onSocketClose((res) => {
					console.log('WebSocket 已关闭！')
					this.reconnect()

				})
			},
			 reconnect() {
			        console.log("重新连接");
			        this.lockReconnect = true;
			        clearTimeout(this.timer)
			            this.timer = setTimeout(() => {
			                this.connectStart();
			            }, 5000);
			    },
		}

	}
</script>

<style>
	@import "/style/iconfont.css";
</style>
