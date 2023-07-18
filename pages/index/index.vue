<template>
	<view>
		<view class="uni-btn-v">
			<navigator url="/pages/index/logging/logging" hover-class="navigator-hover">
				<button type="primary">录入金额</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onShow() {
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
                	// console.log(res);
                    const data = res.result.data;
                    const readDeviceId = data[0].deviceId;
                }).catch((err) => {
                    uni.hideLoading()
                    uni.showModal({
                    	content: "请先注册",
                    	showCancel: false
                    })
                    uni.switchTab({
                    	url : '../setting/setting',
                    	success : function(res) {
                    		// console.log('回调成功',res);
                    	},
                    	fail : function(err) {
                    		console.log('回调失败',err);
                    	}
                    });
                	// console.log(err);
                });
            }
		}
	}
</script>

<style>
    .uni-btn-v {
    	 margin-top: 50rpx;
    	 margin-bottom: 50rpx;
    	 margin-left: 50rpx;
    	 margin-right: 50rpx;
    }
    
    .navigator-hover {
    	 margin-top: 50rpx;
    	 margin-bottom: 50rpx;
    }
</style>
