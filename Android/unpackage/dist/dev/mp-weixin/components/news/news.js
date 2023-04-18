"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    news: {
      type: Number,
      default: 0,
      required: Object,
      validator: function(value) {
        return value >= 0;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    openNewPage(e) {
      common_vendor.index.navigateTo({
        url: `../../${e.currentTarget.dataset.url}`
      });
    }
  },
  created() {
    console.log("\u7EC4\u4EF6\u521B\u5EFA");
  },
  beforeMount() {
    console.log("111");
  },
  mounted() {
    console.log(222);
  },
  updated() {
    console.log(333);
  },
  destroyed() {
    console.log("\u7EC4\u4EF6\u9500\u6BC1");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.openNewPage && $options.openNewPage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/components/news/news.vue"]]);
wx.createPage(MiniProgramPage);
