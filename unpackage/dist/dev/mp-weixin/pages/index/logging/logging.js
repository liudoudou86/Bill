"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    formSubmit: function(e) {
      const that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          that.deviceId = res.deviceId;
        },
        fail: function(err) {
          console.log(err);
        }
      });
      console.log("本机设备ID：" + this.deviceId);
      common_vendor.Ds.callFunction({
        name: "readUserInfo",
        data: {
          deviceId: this.deviceId
        }
      }).then((res) => {
        const data = res.result.data;
        const readUserName = data[0].userName;
        const formData = e.detail.value;
        console.log("提交表单数据：" + JSON.stringify(e.detail.value));
        common_vendor.Ds.callFunction({
          name: "insertUserMoney",
          data: {
            userName: readUserName,
            type: formData.type,
            amount: Number(formData.inputMoney).toFixed(2)
          }
        }).then((res2) => {
          console.log(res2);
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "保存成功",
            showCancel: false
          });
          common_vendor.index.navigateBack({
            delta: 1
          });
        }).catch((err) => {
          console.log(err);
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "保存失败",
            showCancel: false
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    formReset: function(e) {
      console.log("清空数据");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.inputMoney && _ctx.inputMoney(...args)),
    b: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    c: common_vendor.o((...args) => $options.formReset && $options.formReset(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Coding/Bill/pages/index/logging/logging.vue"]]);
wx.createPage(MiniProgramPage);
