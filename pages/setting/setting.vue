<template>
    <view>
    	<view class="container">
            <uni-table class="table" ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
            	<uni-tr>
            		<uni-th width="100" align="center">用户名</uni-th>
                    <uni-th width="100" align="center">设备ID</uni-th>
            	</uni-tr>
            	<uni-tr v-for="(item, index) in tableData" :key="index">
            		<uni-td align="center">
            			<view class="userName">{{ item.userName }}</view>
            		</uni-td>
                    <uni-td align="center">
                    	<view class="deviceId">{{ item.deviceId }}</view>
                    </uni-td>
            	</uni-tr>
            </uni-table>
    		<view class="uni-btn-v">
    			<navigator url="/pages/setting/register/register" hover-class="navigator-hover">
    				<button type="primary">注册用户</button>
    			</navigator>
    		</view>
    	</view>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                tableData: [],
                loading: false
            }
    	},
    	onShow() {
            this.getUserList()
        },
    	methods: {
            getUserList() {
            	this.loading = true;
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
            		this.tableData = res.result.data;
            		this.loading = false;
            	}).catch((err) => {
            		console.log(err);
            	});
            }
        }
    }
</script>

<style lang="scss">
    .container {
        .table {
            margin-top: 50rpx;
            height: 900rpx;
        }
    }
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