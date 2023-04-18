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
    console.log(options.sort);
    this.title = options.sort;
    common_vendor.index.setNavigationBarTitle({
      title: "\u641C\u7D22\u7ED3\u679C"
    });
    this.news(this.title);
    common_vendor.index.onSocketMessage((res) => {
      console.log("\u6536\u5230\u670D\u52A1\u5668\u5185\u5BB9\uFF1A", JSON.parse(res.data).Bytext);
      if (JSON.parse(res.data).Bytext != void 0) {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660275238565.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u641C\u7D22\u6210\u529F\u63D0\u793A\u58F0");
        });
      }
      this.list = JSON.parse(res.data).Bytext;
    });
  },
  methods: {
    news(e) {
      utils_request.get({
        url: "/news/sendTypeToDeepin",
        data: {
          typeName: e
        }
      }).then((res) => {
        console.log(res);
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/searchResult/searchResult.vue"]]);
wx.createPage(MiniProgramPage);
