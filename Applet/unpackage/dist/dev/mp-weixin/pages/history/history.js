"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      list: []
    };
  },
  onLoad(options) {
    this.title = options.sort;
    common_vendor.index.setNavigationBarTitle({
      title: options.sort
    });
    this.gethistoryByuserId();
  },
  methods: {
    gethistoryByuserId() {
      this.user = common_vendor.index.getStorageSync("user");
      utils_request.get({
        url: "/news/gethistoryByuserId",
        data: { userId: this.user.userId }
      }).then((res) => {
        this.list = res.data.data.newsHistories;
      });
    },
    toDetail(e) {
      var data = JSON.stringify(this.list[e]);
      common_vendor.index.navigateTo({
        url: "../listDetail/listDetail?content=" + data
      });
    }
  }
};
if (!Array) {
  const _easycom_voice2 = common_vendor.resolveComponent("voice");
  _easycom_voice2();
}
const _easycom_voice = () => "../../components/voice/voice.js";
if (!Math) {
  _easycom_voice();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.newsTitle),
        b: common_vendor.t(item.newsContent),
        c: common_vendor.o(($event) => $options.toDetail(index)),
        d: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/pages/history/history.vue"]]);
wx.createPage(MiniProgramPage);
