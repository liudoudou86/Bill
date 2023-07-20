<template>
	<view>
        <view class="container">
        	<h3>【账户余额】: {{ money }}</h3> <br>
            <h4>【收入合计】: {{ income }} 【支出合计】: {{ expenditure }}</h4>
        </view>
        <view>
            <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
                <uni-card :is-shadow="false" v-for="(item, index) in incomeList" :key="index">
                    <text space="emsp">收入: +</text>
                    <text space="emsp">{{ incomeList[index] }}</text>
                </uni-card>
                <uni-card :is-shadow="false" v-for="(item, index) in expenditureList" :key="index">
                    <text space="emsp">支出: -</text>
                    <text space="emsp">{{ expenditureList[index] }}</text>
                </uni-card>
            </scroll-view>                 
        </view>
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
			return {
                scrollTop: 0,
                old: { scrollTop: 0 },
                money : '',
                income: '',
                expenditure: '',
                incomeList: [],
                expenditureList: [],
                loading: false
            }
		},
		onShow() {
            this.getMoneyData();
            this.getPhoneInfo();
		},
		methods: {
            scroll: function(e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            getMoneyData() {
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
                // console.log("本机设备ID：" + this.deviceId);
                // 调用云函数查询设备ID
                uniCloud.callFunction({
                	name: "readUserInfo",
                	data: {
                		deviceId: this.deviceId,
                	}
                }).then((res) => {
                	// console.log(res);
                    const data = res.result.data;
                    this.userName = data[0].userName;
                    this.loading = true;
                    // 调用云函数查询
                    uniCloud.callFunction({
                    	name: "readUserMoney",
                        data: {
                            userName: this.userName,
                        }
                    }).then((res) => {
                    	this.moneyData = res.result.data;
                        // 将字符串解析为JSON对象
                        const jsonData = JSON.parse(JSON.stringify(this.moneyData));
                        // 计算key为income的amount总和
                        let incomeTotal = 0;
                        let expenditureTotal = 0;
                        let incomeData = [];
                        let expenditureData = [];
                        jsonData.forEach(obj => {
                          if (obj.type === 'income') {
                            incomeTotal += parseFloat(obj.amount);
                          }
                          if (obj.type === 'expenditure') {
                            expenditureTotal += parseFloat(obj.amount);
                          }
                        });
                        for (let i = 0; i < jsonData.length; i++) {
                            if (jsonData[i].type === "income") {
                                incomeData.push(jsonData[i].amount);
                            }
                            if (jsonData[i].type === "expenditure") {
                                expenditureData.push(jsonData[i].amount);
                            }
                        }
                        this.incomeList = incomeData;
                        this.expenditureList = expenditureData;
                        // console.log('incomne总和：' +  incomeTotal.toFixed(2));
                        // console.log('expenditure总和：' + expenditureTotal.toFixed(2));
                        // console.log('incomeList：' + this.incomeList);
                        // console.log('expenditureList：' + this.expenditureList);
                        this.income = incomeTotal.toFixed(2);
                        this.expenditure = expenditureTotal.toFixed(2);
                        this.money = (this.income - this.expenditure).toFixed(2);
                    	this.loading = false;
                    }).catch((err) => {
                    	console.log(err);
                    });
                }).catch((err) => {
                	console.log(err);
                });
            },
            getPhoneInfo() {
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
                // console.log("本机设备ID：" + this.deviceId);
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
                    // 跳转至指定页面
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

<style lang="scss">
    .container {
    	margin-top: 50rpx;
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
    .scroll-Y {
    		height: 700rpx;
    	}
    	.scroll-view_H {
    		white-space: nowrap;
    		width: 100%;
    	}
    	.scroll-view-item {
    		height: 700rpx;
    		line-height: 700rpx;
    		text-align: center;
    		font-size: 36rpx;
    	}
    	.scroll-view-item_H {
    		display: inline-block;
    		width: 100%;
    		height: 700rpx;
    		line-height: 700rpx;
    		text-align: center;
    		font-size: 36rpx;
    	}
</style>
