"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      login: false,
      sort: true,
      src: ""
    };
  },
  onLoad(options) {
    common_vendor.index.createInnerAudioContext();
  },
  methods: {
    logins(e) {
      this.login = true;
      this.sort = e;
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309754973.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u767B\u5F55\u63D0\u793A\u58F0");
      });
    },
    takePhoto() {
      const camera = common_vendor.index.createCameraContext();
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659092709353.mp3";
      innerAudioContext.onPlay(() => {
      });
      camera.takePhoto({
        quality: "high"
      }).then((res) => {
        this.src = res.tempImagePath;
        console.log("\u62CD\u7167", res.tempImagePath);
        utils_request.uploadFile({
          url: "/face/registerAndLogin",
          src: res.tempImagePath
        }).then((res2) => {
          console.log(JSON.parse(res2.data));
          switch (JSON.parse(res2.data).data.msg) {
            case "\u7528\u6237\u5DF2\u5B58\u5728":
              this.logIn(this.src);
              break;
            case "\u767B\u5F55\u6210\u529F":
              innerAudioContext.autoplay = true;
              innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309862226.wav";
              innerAudioContext.onPlay(() => {
              });
              console.log(res2.header);
              common_vendor.index.setStorageSync("Authorization", res2.header.Authorization);
              common_vendor.index.setStorageSync("user", JSON.parse(res2.data).data.user);
              common_vendor.index.reLaunch({
                url: "../index/index?login=true&tab_id=" + 2
              });
              common_vendor.index.showToast({
                title: "\u767B\u5F55\u6210\u529F",
                duration: 2e3
              });
              break;
            case "\u6CE8\u518C\u6210\u529F":
              innerAudioContext.autoplay = true;
              innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309862226.wav";
              innerAudioContext.onPlay(() => {
              });
              common_vendor.index.setStorageSync("Authorization", res2.header.Authorization);
              common_vendor.index.setStorageSync("user", JSON.parse(res2.data).data.user);
              common_vendor.index.reLaunch({
                url: "../index/index?login=true&tab_id=" + 2
              });
              common_vendor.index.showToast({
                title: "\u767B\u5F55\u6210\u529F",
                duration: 2e3
              });
              break;
            default:
              common_vendor.index.showToast({
                title: "\u767B\u5F55\u5931\u8D25",
                duration: 2e3
              });
              break;
          }
          common_vendor.index.setStorageSync("Authorization", res2.header.Authorization);
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.login
  }, !$data.login ? {
    b: common_vendor.o(($event) => $options.logins(true))
  } : {}, {
    c: $data.login
  }, $data.login ? {
    d: this.qianhou,
    e: common_vendor.o((...args) => _ctx.error && _ctx.error(...args)),
    f: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args)),
    g: common_vendor.o((...args) => _ctx.changeqianhou && _ctx.changeqianhou(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
