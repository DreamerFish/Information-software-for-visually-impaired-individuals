"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      type: "default",
      tagid: 0,
      info: ["\u529F\u80FD\u5F02\u5E38", "\u4EA7\u54C1\u5EFA\u8BAE", "\u5185\u5BB9\u5EFA\u8BAE", "\u5176\u5B83\u95EE\u9898"],
      content: ""
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "\u53CD\u9988"
    });
  },
  methods: {
    setType() {
      let types = ["default", "primary", "success", "warning", "error"];
      let index = types.indexOf(this.type);
      types.splice(index, 1);
      let randomIndex = Math.floor(Math.random() * 4);
      this.type = types[randomIndex];
    },
    setInverted(index) {
      this.tagid = index;
    },
    submit() {
      console.log(this.content);
      utils_request.post({
        url: "/opinion/add",
        data: {
          opinion: this.content,
          type: this.info[this.tagid]
        }
      }).then((res) => {
        console.log(res.data);
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224772068.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u63D0\u4EA4\u6210\u529F\u63D0\u793A\u58F0");
        });
        common_vendor.index.navigateBack();
        common_vendor.index.showToast({
          title: "\u63D0\u4EA4\u6210\u529F",
          duration: 2e3
        });
      });
    },
    setcontent(content) {
      console.log(content);
      if (content.includes("\u529F\u80FD\u5F02\u5E38")) {
        this.setInverted(0);
      } else if (content.includes("\u4EA7\u54C1\u5EFA\u8BAE")) {
        this.setInverted(1);
      } else if (content.includes("\u5185\u5BB9\u5EFA\u8BAE")) {
        this.setInverted(2);
      } else if (content.includes("\u5176\u5B83\u95EE\u9898")) {
        this.setInverted(3);
      } else {
        this.content = content;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_voice2 = common_vendor.resolveComponent("voice");
  (_easycom_uni_tag2 + _easycom_voice2)();
}
const _easycom_uni_tag = () => "../../components/uni-tag/uni-tag.js";
const _easycom_voice = () => "../../components/voice/voice.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_voice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.info, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.setInverted(index)),
        b: "91bba7b4-0-" + i0,
        c: common_vendor.p({
          text: item,
          inverted: index == $data.tagid ? false : true,
          type: "primary",
          size: "100"
        })
      };
    }),
    b: $data.content,
    c: common_vendor.o(($event) => $data.content = $event.detail.value),
    d: common_vendor.o(($event) => $options.submit()),
    e: common_vendor.o($options.setcontent),
    f: common_vendor.p({
      type: "feedback"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-91bba7b4"], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
