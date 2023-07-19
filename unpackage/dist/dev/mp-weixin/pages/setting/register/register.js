"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    inputUserName: function(e) {
      this.userName = e.detail.value;
    },
    inputPassWord: function(e) {
      this.passWord = e.detail.value;
    },
    getUserInfo() {
      const that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          that.deviceId = res.deviceId;
        },
        fail: function(err) {
          console.log(err);
        }
      });
      console.log("用户昵称：" + this.userName);
      console.log("手机号：" + this.passWord);
      console.log("设备ID：" + that.deviceId);
      if (this.userName === null || this.userName === "") {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: "用户名不能为空",
          showCancel: false
        });
      } else {
        if (this.passWord === null || this.passWord === "") {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "密码不能为空",
            showCancel: false
          });
        } else {
          common_vendor.Ds.callFunction({
            name: "insertUserInfo",
            data: {
              userName: this.userName,
              passWord: this.passWord,
              deviceId: that.deviceId
            }
          }).then((res) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showModal({
              content: "注册成功",
              showCancel: false
            });
            common_vendor.index.navigateBack({
              delta: 1
            });
          }).catch((err) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showModal({
              content: "注册失败",
              showCancel: false
            });
          });
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.inputUserName && $options.inputUserName(...args)),
    b: common_vendor.o((...args) => $options.inputPassWord && $options.inputPassWord(...args)),
    c: common_vendor.o(($event) => $options.getUserInfo())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Coding/Bill/pages/setting/register/register.vue"]]);
wx.createPage(MiniProgramPage);
