"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scrollTop: 0,
      old: { scrollTop: 0 },
      money: "",
      income: "",
      expenditure: "",
      incomeList: [],
      expenditureList: [],
      loading: false
    };
  },
  onShow() {
    this.getMoneyData();
    this.getPhoneInfo();
  },
  methods: {
    scroll: function(e) {
      this.old.scrollTop = e.detail.scrollTop;
    },
    getMoneyData() {
      const that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          that.deviceId = res.deviceId;
        },
        fail: function(err) {
          console.log(err);
        }
      });
      common_vendor.Ds.callFunction({
        name: "readUserInfo",
        data: {
          deviceId: this.deviceId
        }
      }).then((res) => {
        const data = res.result.data;
        this.userName = data[0].userName;
        this.loading = true;
        common_vendor.Ds.callFunction({
          name: "readUserMoney",
          data: {
            userName: this.userName
          }
        }).then((res2) => {
          this.moneyData = res2.result.data;
          const jsonData = JSON.parse(JSON.stringify(this.moneyData));
          let incomeTotal = 0;
          let expenditureTotal = 0;
          let incomeData = [];
          let expenditureData = [];
          jsonData.forEach((obj) => {
            if (obj.type === "income") {
              incomeTotal += parseFloat(obj.amount);
            }
            if (obj.type === "expenditure") {
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
      const that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          that.deviceId = res.deviceId;
        },
        fail: function(err) {
          console.log(err);
        }
      });
      common_vendor.Ds.callFunction({
        name: "readUserInfo",
        data: {
          deviceId: this.deviceId
        }
      }).then((res) => {
        const data = res.result.data;
        data[0].deviceId;
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: "请先注册",
          showCancel: false
        });
        common_vendor.index.switchTab({
          url: "../setting/setting",
          success: function(res) {
          },
          fail: function(err2) {
            console.log("回调失败", err2);
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.money),
    b: common_vendor.t($data.income),
    c: common_vendor.t($data.expenditure),
    d: common_vendor.f($data.incomeList, (item, index, i0) => {
      return {
        a: common_vendor.t($data.incomeList[index]),
        b: index,
        c: "3065fc7c-0-" + i0
      };
    }),
    e: common_vendor.p({
      ["is-shadow"]: false
    }),
    f: common_vendor.f($data.expenditureList, (item, index, i0) => {
      return {
        a: common_vendor.t($data.expenditureList[index]),
        b: index,
        c: "3065fc7c-1-" + i0
      };
    }),
    g: common_vendor.p({
      ["is-shadow"]: false
    }),
    h: $data.scrollTop,
    i: common_vendor.o((...args) => $options.scroll && $options.scroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Coding/Bill/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
