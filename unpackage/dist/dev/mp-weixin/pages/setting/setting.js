"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  onShow() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.loading = true;
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
        console.log(res);
        this.tableData = res.result.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      width: "100",
      align: "center"
    }),
    b: common_vendor.p({
      width: "100",
      align: "center"
    }),
    c: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.userName),
        b: "61feb738-5-" + i0 + "," + ("61feb738-4-" + i0),
        c: common_vendor.t(item.deviceId),
        d: "61feb738-6-" + i0 + "," + ("61feb738-4-" + i0),
        e: index,
        f: "61feb738-4-" + i0 + ",61feb738-0"
      };
    }),
    d: common_vendor.p({
      align: "center"
    }),
    e: common_vendor.p({
      align: "center"
    }),
    f: common_vendor.sr("table", "61feb738-0"),
    g: common_vendor.p({
      loading: $data.loading,
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Coding/Bill/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
