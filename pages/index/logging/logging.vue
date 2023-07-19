<template>
	<view class="form">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">类型：</view>
					<radio-group name="type">
						<label>
							<radio value="income" /><text>收入</text>
						</label>
						<label>
							<radio value="expenditure" /><text>支出</text>
						</label>
					</radio-group>
					<view class="title">金额：</view>
					<input class="uni-input" name="inputMoney" @input="inputMoney" placeholder="请输入金额" />
				</view>
				<view class="uni-btn-v">
					<button  type="primary" form-type="submit">保存提交</button>
					<button type="warn" form-type="reset">重置页面</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
    export default {
    	data() {
    		return {}
    	},
    	onLoad() {},
    	methods: {
    		formSubmit: function(e) {
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
                    const readUserName = data[0].userName;
                    const formData = e.detail.value;
                    console.log('提交表单数据：' + JSON.stringify(e.detail.value));
                    // 调用云函数向云数据库插入数据
                    uniCloud.callFunction({
                    	name: "insertUserMoney",
                    	data: {
                    		userName : readUserName,
                    		type : formData.type,
                    		amount : formData.inputMoney,
                    	}
                    }).then((res) => {
                    	console.log(res);
                    	uni.hideLoading()
                    	uni.showModal({
                    		content: "保存成功",
                    		showCancel: false
                    	})
                        // 返回上一级菜单
                        uni.navigateBack({
                        	delta: 1
                        });
                    }).catch((err) =>{
                    	console.log(err);
                    	uni.hideLoading()
                    	uni.showModal({
                    		content: "保存失败",
                    		showCancel: false
                    	})
                    });
                }).catch((err) => {
                	console.log(err);
                });
    		},
    		formReset: function(e) {
    			console.log('清空数据')
    		}
    	}
    }
</script>

<style lang="scss">
    .form{
    	padding: 0 30upx;
    	margin-top: 10px;
    	.uni-padding-wrap {
    	    margin-top: 40rpx;
    	    margin-bottom: 40rpx;
    		margin-left: 40rpx;
    		margin-right: 40rpx;
    		.uni-form-item {
    		    margin-top: 40rpx;
    		    margin-bottom: 40rpx;
    			margin-left: 40rpx;
    			margin-right: 40rpx;
    			.title {
    			    margin-top: 40rpx;
    			    margin-bottom: 40rpx;
    			}
    			.uni-input {
    			    margin-top: 40rpx;
    			    margin-bottom: 40rpx;
    			}
    			label {
    				margin-left: 20rpx;
    				margin-right: 20rpx;
    			}
    		}
    	}
    }
    
    .uni-btn-v {
        margin: 0 auto;
        width: 95%;
    	button {
    	    margin-top: 50rpx;
    	    margin-bottom: 50rpx;
    	}
    }
</style>