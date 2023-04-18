"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  props: {
    placeholder: {
      type: String,
      default: "\u5A31\u4E50\uFF0C\u597D\u73A9\u7684"
    }
  },
  data() {
    return {
      keyword: "",
      oldKeywordList: [],
      hotKeywordList: [],
      isShowKeywordList: false,
      isDelShow: false,
      forbid: "",
      showsearchbtn: false,
      searchval: "",
      target: 0
    };
  },
  onLoad() {
    this.init();
  },
  methods: {
    init() {
      this.loadOldKeyword();
      this.loadHotKeyword();
    },
    loadOldKeyword() {
      common_vendor.index.getStorage({
        key: "OldKeys",
        success: (res) => {
          var OldKeys = JSON.parse(res.data);
          this.oldKeywordList = OldKeys;
        }
      });
    },
    loadHotKeyword() {
      this.hotKeywordList = ["\u534E\u4E3A\u624B\u673A", "\u82F9\u679C\u7535\u8111", "\u4E2D\u56FD", "\u89C6\u969C\u4EBA\u58EB", "\u4E52\u4E53\u7403", "\u72EC\u884C\u6708\u7403", "\u5E7F\u4E1C\u6D77\u6D0B\u5927\u5B66", "USB", "3.1415926"];
    },
    inputChange: async function(event) {
      if (this.keyword.length > 0) {
        console.log(this.keyword.length);
        this.isDelShow = true;
        console.log("\u5927\u8FC7\u96F6");
      } else {
        this.isDelShow = false;
        console.log("\u4E0D\u5927\u4E8E\u96F6");
      }
      var keyword = event.detail ? event.detail.value : event;
      if (!keyword) {
        this.isShowKeywordList = false;
        return;
      }
      this.isShowKeywordList = true;
    },
    doSearch(keyword) {
      if (keyword == "") {
        if (this.keyword.length == 0) {
          console.log("\u4E0D\u6267\u884C\u641C\u7D22");
          common_vendor.index.showToast({
            title: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
            icon: "none"
          });
        } else if (this.keyword.length >= 1) {
          console.log("\u6267\u884C\u4E86\u641C\u7D22");
          const innerAudioContext = common_vendor.index.createInnerAudioContext();
          innerAudioContext.autoplay = true;
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660275137676.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u641C\u7D22\u4E2D\u63D0\u793A\u58F0");
          });
          keyword = keyword === false ? this.keyword : keyword;
          this.keyword = keyword;
          this.saveKeyword(keyword);
          utils_request.post({
            url: "/news/getNewsBytext",
            data: {
              text: this.keyword
            }
          }).then((res) => {
            const result = res.data.data.result;
            common_vendor.index.navigateTo({
              url: "../searchResult/searchResult?sort=" + result
            });
          });
        }
      } else if (keyword != "") {
        this.keyword = keyword;
        console.log("\u6267\u884C\u4E86\u641C\u7D22");
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660275137676.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u641C\u7D22\u4E2D\u63D0\u793A\u58F0");
        });
        keyword = keyword === false ? this.keyword : keyword;
        this.keyword = keyword;
        this.saveKeyword(keyword);
        common_vendor.index.showToast({
          title: keyword,
          icon: "none",
          duration: 2e3
        });
        utils_request.post({
          url: "/news/getNewsBytext",
          data: {
            text: keyword
          }
        }).then((res) => {
          console.log(res.data.data.result);
          const result = res.data.data.result;
          common_vendor.index.navigateTo({
            url: "../searchResult/searchResult?sort=" + result
          });
        });
      }
    },
    saveKeyword(keyword) {
      common_vendor.index.getStorage({
        key: "OldKeys",
        success: (res) => {
          var OldKeys = JSON.parse(res.data);
          var findIndex = OldKeys.indexOf(keyword);
          if (findIndex == -1) {
            OldKeys.unshift(keyword);
          } else {
            OldKeys.splice(findIndex, 1);
            OldKeys.unshift(keyword);
          }
          OldKeys.length > 10 && OldKeys.pop();
          common_vendor.index.setStorage({
            key: "OldKeys",
            data: JSON.stringify(OldKeys)
          });
          this.oldKeywordList = OldKeys;
        },
        fail: (e) => {
          var OldKeys = [keyword];
          common_vendor.index.setStorage({
            key: "OldKeys",
            data: JSON.stringify(OldKeys)
          });
          this.oldKeywordList = OldKeys;
        }
      });
    },
    clear() {
      console.log(this.keyword);
      common_vendor.index.hideKeyboard();
      this.keyword = "";
      this.inputChange("");
      console.log("\u6CA1\u6709" + this.keyword.length + this.keyword);
    },
    delete_key() {
      common_vendor.index.showModal({
        content: "\u786E\u5B9A\u6E05\u9664\u5386\u53F2\u641C\u7D22\u8BB0\u5F55\uFF1F",
        success: (res) => {
          if (res.confirm) {
            this.oldKeywordList = [];
            common_vendor.index.removeStorage({
              key: "OldKeys"
            });
          } else if (res.cancenl) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    },
    hotToggle() {
      this.forbid = this.forbid ? "" : "1";
      console.log(this.forbid);
    }
  },
  watch: {
    searchval(v) {
      var me = this;
      me.$emit("inputchange", v);
      if (v != "") {
        me.showsearchbtn = true;
      } else {
        me.showsearchbtn = false;
      }
    },
    target(val) {
      this.tap(val);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_voice2 = common_vendor.resolveComponent("voice");
  (_easycom_uni_icons2 + _easycom_voice2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_voice = () => "../../components/voice/voice.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_voice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.placeholder,
    b: common_vendor.o([($event) => $data.keyword = $event.detail.value, (...args) => $options.inputChange && $options.inputChange(...args)]),
    c: common_vendor.o(($event) => $options.doSearch(false)),
    d: common_vendor.o(($event) => $options.doSearch(false)),
    e: $data.keyword,
    f: $data.isDelShow
  }, $data.isDelShow ? {
    g: common_vendor.o($options.clear),
    h: common_vendor.p({
      type: "close",
      size: "20",
      color: "#a7a7a7"
    })
  } : {}, {
    i: common_vendor.o(($event) => $options.doSearch(false)),
    j: common_vendor.o((...args) => $options.delete_key && $options.delete_key(...args)),
    k: $data.oldKeywordList.length > 0
  }, $data.oldKeywordList.length > 0 ? {
    l: common_vendor.f($data.oldKeywordList, (keyword, index, i0) => {
      return {
        a: common_vendor.t(keyword),
        b: common_vendor.o(($event) => $options.doSearch(keyword), index),
        c: index
      };
    })
  } : {}, {
    m: !$data.isShowKeywordList,
    n: this.forbid == "1" ? "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660273361715.png" : "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660273636683.png",
    o: common_vendor.o((...args) => $options.hotToggle && $options.hotToggle(...args)),
    p: $data.forbid == ""
  }, $data.forbid == "" ? {
    q: common_vendor.f($data.hotKeywordList, (keyword, index, i0) => {
      return {
        a: common_vendor.t(keyword),
        b: common_vendor.o(($event) => $options.doSearch(keyword), index),
        c: index
      };
    })
  } : {}, {
    r: !$data.isShowKeywordList,
    s: common_vendor.p({
      type: "search"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
