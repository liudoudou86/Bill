<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
            this.getSystemInfo();
		},
		methods: {
            getSystemInfo() {
                // 获取本机设备ID
                const that = this
                uni.getSystemInfo({
                	success: function(res) {
                		that.deviceId = res.deviceId
                	},
                	fail: function(err) {
                		console.log(err)
                	}
                });
                console.log("本机设备ID：" + this.deviceId);
                // 调用云函数查询设备ID
                uniCloud.callFunction({
                	name: "readUserInfo",
                	data: {
                		deviceId: this.deviceId,
                	}
                }).then((res) => {
                	console.log(res);
                    const data = res.result.data;
                    const readDeviceId = data[0].deviceId;
                }).catch((err) => {
                    uni.hideLoading()
                    uni.showModal({
                    	content: "请先注册",
                    	showCancel: false
                    })
                	// console.log(err);
                });
            }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
