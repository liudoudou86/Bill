<template>
    <view class="form">
    	<view class="inputWrapper">
    		<input class="input" type="text" @input="inputUserName" value="" placeholder="请输入用户名"/>
    	</view>
    	<view class="inputWrapper">
    		<input class="input" type="text" @input="inputPassWord" value="" placeholder="请输入密码"/>	
    	</view>
    	<view class="uni-padding-wrap uni-common-mt">
    	    <button type="primary" @click="getUserInfo()" >注册</button>
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
            inputUserName: function(e) {
            	this.userName = e.detail.value
            },
            inputPassWord: function(e) {
            	this.passWord = e.detail.value
            },
            getUserInfo() {
            	const that = this;
            	uni.getSystemInfo({
            		success: function(res) {
            			that.deviceId = res.deviceId
            		},
            		fail: function(err) {
            			console.log(err)
            		}
            	});
            	console.log("用户昵称：" + this.userName);
            	console.log("手机号：" + this.passWord);
            	console.log("设备ID：" + that.deviceId);
            	if (this.userName === null || this.userName === "") {
            		uni.hideLoading();
            		uni.showModal({
            			content: "用户名不能为空",
            			showCancel: false
            		});
            	} else {
            		if (this.passWord === null || this.passWord === "") {
            			uni.hideLoading();
            			uni.showModal({
            				content: "密码不能为空",
            				showCancel: false
            			});
            		} else {
            			// 调用云函数向云数据库插入数据
            			uniCloud.callFunction({
            				name: "insertUserInfo",
            				data: {
            					userName: this.userName,
            					passWord: this.passWord,
            					deviceId: that.deviceId
            				}
            			}).then((res) => {
            				uni.hideLoading()
            				uni.showModal({
            					content: "注册成功",
            					showCancel: false
            				})
                            // 返回上一级菜单
                            uni.navigateBack({
                            	delta: 1
                            });
            				// console.log(res)
            			}).catch((err) =>{
            				uni.hideLoading()
            				uni.showModal({
            					content: "注册失败",
            					showCancel: false
            				})
            				// console.log(err)
            			});
            		}
            	}
            }
        }
    }
</script>

<style lang="scss">
    .form{
    	padding: 0 100upx;
    	margin-top: 80px;
    }
    
    .inputWrapper{
    	width: auto;
    	height: 50px;
    	background: #C0C0C0;
    	border-radius: 20px;
    	padding: 0 20px;
        margin-top: 100rpx;
        margin-bottom: 50rpx;
    	margin-left: 50rpx;
    	margin-right: 50rpx;
    }
    
    .inputWrapper .input{
    	width: auto;
    	height: 50px;
        margin-top: 100rpx;
        margin-bottom: 50rpx;
        margin-left: 50rpx;
        margin-right: 50rpx;
    	text-align: center;
    	font-size: 15px;
    }
    
    .uni-padding-wrap {
        margin-top: 300rpx;
        margin-bottom: 50rpx;
    	margin-left: 50rpx;
    	margin-right: 50rpx;
    }
</style>