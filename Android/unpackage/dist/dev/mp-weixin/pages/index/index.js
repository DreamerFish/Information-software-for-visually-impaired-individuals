"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: "",
      tab_id: 0,
      left: 124,
      tabs: ["\u8D44\u8BAF", "\u8BC6\u522B", "\u6211\u7684"],
      title: [{
        name: "\u8D44\u8BAF",
        label: "\u8D44\u8BAF\u9605\u8BFB"
      }, {
        name: "\u8BC6\u522B",
        label: "\u56FE\u6587\u8BC6\u522B"
      }, {
        name: "\u6211\u7684",
        label: "\u6211\u7684\u4FE1\u606F"
      }],
      list: [
        {
          name: "\u731C\u4F60\u559C\u6B22",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657095707693.png"
        },
        {
          name: "\u65F6\u653F",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657095591428.png"
        },
        {
          name: "\u8D22\u7ECF",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657096919245.png"
        },
        {
          name: "\u79D1\u6280",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659277245913.png"
        },
        {
          name: "\u4F53\u80B2",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657096942991.png"
        },
        {
          name: "\u6559\u80B2",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097069810.png"
        },
        {
          name: "\u5BB6\u5177",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097079483.png"
        },
        {
          name: "\u6E38\u620F",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097093771.png"
        },
        {
          name: "\u793E\u4F1A",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097106396.png"
        },
        {
          name: "\u5A31\u4E50",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097117157.png"
        },
        {
          name: "\u80A1\u7968",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097129625.png"
        },
        {
          name: "\u5F69\u7968",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097146108.png"
        },
        {
          name: "\u65F6\u5C1A",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097151580.png"
        },
        {
          name: "\u661F\u5EA7",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097162495.png"
        },
        {
          name: "\u623F\u4EA7",
          url: "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1657097178609.png"
        }
      ],
      minelist: ["\u6536\u542C\u5386\u53F2", "\u6211\u7684\u8BA2\u9605", "\u6211\u559C\u6B22\u7684", "\u6211\u7684\u4E0B\u8F7D", "\u8BBE\u7F6E", "\u53CD\u9988"],
      user: common_vendor.index.getStorageSync("user"),
      animationData: {}
    };
  },
  onLoad(options) {
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    this.scrollIntoView();
    console.log("\u8981\u7684\u5C31\u662F\u4F60", options);
    this.tab_id = options.tab_id || 0;
    this.user = common_vendor.index.getStorageSync("user");
    common_vendor.index.$on("news", (data) => {
      console.log("\u6807\u9898\uFF1A", data);
    });
  },
  watch: {
    tab_id(newName, oldName) {
      this.scrollIntoView();
    }
  },
  onBackPress: function(e) {
    console.log("\u9875\u9762\u8FD4\u56DE", e);
  },
  methods: {
    detail(e) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      switch (e) {
        case "\u731C\u4F60\u559C\u6B22":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311167112.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u65F6\u653F":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311324923.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u8D22\u7ECF":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311460863.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u79D1\u6280":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311479798.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u4F53\u80B2":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311492004.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u6559\u80B2":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311506148.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u5BB6\u5177":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311526375.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u6E38\u620F":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311536372.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u793E\u4F1A":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311550408.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u5A31\u4E50":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311562643.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u80A1\u7968":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311576242.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u5F69\u7968":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311594740.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u65F6\u5C1A":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311602834.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u661F\u5EA7":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311613259.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
        case "\u623F\u4EA7":
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311629719.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u9000\u51FA\u63D0\u793A\u58F0");
          });
          break;
      }
      common_vendor.index.navigateTo({
        url: "../detail/detail?sort=" + e
      });
    },
    bindtop(e) {
      this.tab_id = e;
    },
    logIn(res) {
      console.log("\u8981\u7684\u5C31\u662F\u4F60");
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659309655303.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u9000\u51FA\u63D0\u793A\u58F0");
      });
      common_vendor.index.redirectTo({
        url: "../login/login"
      });
    },
    toSearch() {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311025475.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u641C\u7D22\u63D0\u793A\u58F0");
      });
      common_vendor.index.navigateTo({
        url: "../search/search"
      });
    },
    openNewPage(e) {
      console.log(e);
      if (e == "GeneralText") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310711072.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      } else if (e == "HandWriting") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310813720.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      } else if (e == "Word") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310906665.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      } else if (e == "WebImage") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310922962.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      } else if (e == "EngineImage") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310952755.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      } else if (e == "Form") {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310964169.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u793A\u58F0");
        });
      }
      common_vendor.index.navigateTo({
        url: `../recognition/recognition?sort=${e}`
      });
    },
    likeList(e) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310451007.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u5386\u53F2\u8BB0\u5F55\u63D0\u793A\u58F0");
      });
      common_vendor.index.navigateTo({
        url: "../list/list?sort=" + e
      });
    },
    toHistory(e) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310158312.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u5386\u53F2\u8BB0\u5F55\u63D0\u793A\u58F0");
      });
      common_vendor.index.navigateTo({
        url: "../history/history?sort=" + e
      });
    },
    feedback(e) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310056253.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u53CD\u9988\u63D0\u793A\u58F0");
      });
      console.log(e);
      common_vendor.index.navigateTo({
        url: "../feedback/feedback"
      });
    },
    preference(e) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310124454.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u6211\u7684\u504F\u597D\u63D0\u793A\u58F0");
      });
      console.log(e);
      common_vendor.index.navigateTo({
        url: "../preference/preference"
      });
    },
    tabChange(e) {
      this.tab_id = e.detail.current;
      console.log(this.tab_id);
    },
    scrollIntoView() {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      if (this.tab_id == 0) {
        this.left = 124;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310264774.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u8D44\u8BAF\u63D0\u793A\u58F0");
        });
      } else if (this.tab_id == 1) {
        this.left = 350;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310282722.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u8BC6\u522B\u63D0\u793A\u58F0");
        });
      } else if (this.tab_id == 2) {
        this.left = 574;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659310296222.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u6211\u7684\u63D0\u793A\u58F0");
        });
      }
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
    a: common_vendor.f($data.title, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.tab_id == index ? "selected" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.bindtop(index), index),
        e: $data.tab_id == index,
        f: item.label,
        g: $data.tab_id == index ? "0" : "-1"
      };
    }),
    b: common_vendor.s("left:" + $data.left + "rpx"),
    c: common_vendor.o((...args) => $options.toSearch && $options.toSearch(...args)),
    d: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.detail(item.name), index),
        d: index
      };
    }),
    e: common_vendor.o((...args) => $options.toSearch && $options.toSearch(...args)),
    f: common_vendor.o(($event) => $options.openNewPage("GeneralText")),
    g: common_vendor.o(($event) => $options.openNewPage("HandWriting")),
    h: common_vendor.o(($event) => $options.openNewPage("Word")),
    i: common_vendor.o(($event) => $options.openNewPage("WebImage")),
    j: common_vendor.o(($event) => $options.openNewPage("EngineImage")),
    k: common_vendor.o(($event) => $options.openNewPage("Form")),
    l: common_vendor.o(($event) => $options.openNewPage("Translate")),
    m: $data.user.pictureUrl,
    n: common_vendor.t($data.user.realName),
    o: common_vendor.o(($event) => $options.likeList("\u6211\u7684\u6536\u85CF")),
    p: common_vendor.o(($event) => $options.toHistory("\u5386\u53F2\u8BB0\u5F55")),
    q: common_vendor.o(($event) => $options.preference("\u504F\u597D")),
    r: common_vendor.o(($event) => $options.feedback("\u53CD\u9988")),
    s: common_vendor.o((...args) => $options.logIn && $options.logIn(...args)),
    t: $data.tab_id == 0 ? 245 + "vh" : 100 + "vh",
    v: common_vendor.o((...args) => $options.tabChange && $options.tabChange(...args)),
    w: $data.tab_id
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
