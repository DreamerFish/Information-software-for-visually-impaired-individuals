"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const recorderManager = common_vendor.index.getRecorderManager();
const _sfc_main = {
  data() {
    return {
      longPress: "1",
      delShow: false,
      time: 0,
      duration: 6e4,
      tempFilePath: "",
      startPoint: {},
      sendLock: true,
      VoiceTitle: "\u677E\u624B\u7ED3\u675F\u5F55\u97F3",
      recorderManager: common_vendor.index.getRecorderManager(),
      VoiceText: "\u6309\u4F4F \u8BF4\u8BDD",
      types: ""
    };
  },
  props: ["type"],
  created: function() {
    this.types = this.type;
    console.log(this.type);
  },
  methods: {
    longpressBtn(e) {
      this.startPoint = e.touches[0];
      this.longPress = "2";
      this.VoiceText = "\u8BF4\u8BDD\u4E2D...";
      recorderManager.onStop((res) => {
        this.tempFilePath = res.tempFilePath;
      });
      const options = {
        duration: this.duration,
        sampleRate: 16e3,
        numberOfChannels: 1,
        encodeBitRate: 96e3,
        format: "mp3",
        frameSize: 10
      };
      this.recorderManager.start(options);
      this.sendLock = false;
      recorderManager.onStart((res) => {
      });
    },
    touchendBtn() {
      this.longPress = "1";
      this.VoiceText = "\u6309\u4F4F \u8BF4\u8BDD";
      this.VoiceTitle = "\u677E\u624B\u7ED3\u675F\u5F55\u97F3";
      recorderManager.onStop((res) => {
        console.log(this.sendLock);
        if (this.sendLock)
          ;
        else {
          if (res.duration < 1e3)
            wx.showToast({
              title: "\u5F55\u97F3\u65F6\u95F4\u592A\u77ED",
              icon: "none",
              duration: 1e3
            });
          else {
            this.tempFilePath = res.tempFilePath;
            utils_request.uploadFile({
              url: "/voice/VoiceControl",
              src: res.tempFilePath
            }).then((res2) => {
              console.log(JSON.parse(res2.data));
              const innerAudioContext = common_vendor.index.createInnerAudioContext();
              innerAudioContext.autoplay = true;
              innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660225073079.wav";
              innerAudioContext.onPlay(() => {
                console.log("\u8BED\u97F3\u64CD\u4F5C\u6210\u529F\u63D0\u793A\u58F0");
              });
              if (JSON.parse(res2.data).data.service.includes("\u65B0\u95FB") && JSON.parse(res2.data).data.service.length > 2) {
                const service = JSON.parse(res2.data).data.service;
                common_vendor.index.navigateTo({
                  url: "../searchResult/searchResult?sort=" + service
                });
              } else if (JSON.parse(res2.data).message == "\u5931\u8D25" && this.types == "feedback") {
                this.$emit("Voice_content", JSON.parse(res2.data).data.result);
              }
              switch (JSON.parse(res2.data).data.service) {
                case "\u8D44\u8BAF":
                  common_vendor.index.navigateTo({
                    url: "../index/index?content=" + 0
                  });
                  break;
                case "\u8BC6\u522B":
                  common_vendor.index.navigateTo({
                    url: "../index/index?content=" + 1
                  });
                  break;
                case "\u6536\u85CF":
                  common_vendor.index.navigateTo({
                    url: "../list/list?sort=\u6211\u7684\u6536\u85CF"
                  });
                  break;
                case "\u5386\u53F2\u8BB0\u5F55":
                  common_vendor.index.navigateTo({
                    url: "../history/history?sort=\u5386\u53F2\u8BB0\u5F55"
                  });
                  break;
                case "\u504F\u597D":
                  common_vendor.index.navigateTo({
                    url: "../preference/preference"
                  });
                  break;
                case "\u53CD\u9988":
                  common_vendor.index.navigateTo({
                    url: "../feedback/feedback"
                  });
                  break;
                case "\u731C\u4F60\u559C\u6B22":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u731C\u4F60\u559C\u6B22"
                  });
                  break;
                case "\u65F6\u653F":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u65F6\u653F"
                  });
                  break;
                case "\u8D22\u7ECF":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u8D22\u7ECF"
                  });
                  break;
                case "\u79D1\u6280":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u79D1\u6280"
                  });
                  break;
                case "\u4F53\u80B2":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u4F53\u80B2"
                  });
                  break;
                case "\u6559\u80B2":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u6559\u80B2"
                  });
                  break;
                case "\u5BB6\u5177":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u5BB6\u5177"
                  });
                  break;
                case "\u6E38\u620F":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u6E38\u620F"
                  });
                  break;
                case "\u793E\u4F1A":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u793E\u4F1A"
                  });
                  break;
                case "\u5A31\u4E50":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u5A31\u4E50"
                  });
                  break;
                case "\u80A1\u7968":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u80A1\u7968"
                  });
                  break;
                case "\u5F69\u7968":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u5F69\u7968"
                  });
                  break;
                case "\u65F6\u5C1A":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u65F6\u5C1A"
                  });
                  break;
                case "\u661F\u5EA7":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u661F\u5EA7"
                  });
                  break;
                case "\u623F\u4EA7":
                  common_vendor.index.navigateTo({
                    url: "../detail/detail?sort=\u623F\u4EA7"
                  });
                  break;
                case "\u5370\u5237\u4F53":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"GeneralText"}`
                  });
                  break;
                case "\u624B\u5199\u4F53":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"HandWriting"}`
                  });
                  break;
                case "\u6587\u6863":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"Word"}`
                  });
                  break;
                case "\u7F51\u7EDC\u56FE\u7247":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"WebImage"}`
                  });
                  break;
                case "\u7269\u54C1":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"EngineImage"}`
                  });
                  break;
                case "\u8868\u683C":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"Form"}`
                  });
                  break;
                case "\u7FFB\u8BD1":
                  common_vendor.index.navigateTo({
                    url: `../recognition/recognition?sort=${"Translate"}`
                  });
                  break;
                case "\u64AD\u653E":
                  this.$emit("Voice_play");
                  break;
                case "\u6682\u505C":
                  this.$emit("Voice_zanting");
                  break;
                case "\u641C\u7D22":
                  const innerAudioContext2 = common_vendor.index.createInnerAudioContext();
                  innerAudioContext2.autoplay = true;
                  innerAudioContext2.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659311025475.wav";
                  innerAudioContext2.onPlay(() => {
                    console.log("\u641C\u7D22\u63D0\u793A\u58F0");
                  });
                  common_vendor.index.navigateTo({
                    url: "../search/search"
                  });
                  break;
                case "\u589E\u52A0\u79D1\u6280":
                  this.$emit("Voice_addReferrals", "", 0);
                  break;
                case "\u589E\u52A0\u623F\u4EA7":
                  this.$emit("Voice_addReferrals", "", 1);
                  break;
                case "\u589E\u52A0\u661F\u5EA7":
                  this.$emit("Voice_addReferrals", "", 2);
                  break;
                case "\u589E\u52A0\u65F6\u653F":
                  this.$emit("Voice_addReferrals", "", 3);
                  break;
                case "\u589E\u52A0\u65F6\u5C1A":
                  this.$emit("Voice_addReferrals", "", 4);
                  break;
                case "\u589E\u52A0\u5BB6\u5177":
                  this.$emit("Voice_addReferrals", "", 5);
                  break;
                case "\u589E\u52A0\u793E\u4F1A":
                  this.$emit("Voice_addReferrals", "", 6);
                  break;
                case "\u589E\u52A0\u5F69\u7968":
                  this.$emit("Voice_addReferrals", "", 7);
                  break;
                case "\u589E\u52A0\u5A31\u4E50":
                  this.$emit("Voice_addReferrals", "", 8);
                  break;
                case "\u589E\u52A0\u4F53\u80B2":
                  this.$emit("Voice_addReferrals", "", 9);
                  break;
                case "\u589E\u52A0\u6559\u80B2":
                  this.$emit("Voice_addReferrals", "", 10);
                  break;
                case "\u589E\u52A0\u80A1\u7968":
                  this.$emit("Voice_addReferrals", "", 11);
                  break;
                case "\u589E\u52A0\u6E38\u620F":
                  this.$emit("Voice_addReferrals", "", 12);
                  break;
                case "\u589E\u52A0\u8D22\u7ECF":
                  this.$emit("Voice_addReferrals", "", 13);
                  break;
                case "\u51CF\u5C11\u79D1\u6280":
                  this.$emit("Voice_reduceReferrals", "", 0);
                  break;
                case "\u51CF\u5C11\u623F\u4EA7":
                  this.$emit("Voice_reduceReferrals", "", 1);
                  break;
                case "\u51CF\u5C11\u661F\u5EA7":
                  this.$emit("Voice_reduceReferrals", "", 2);
                  break;
                case "\u51CF\u5C11\u65F6\u653F":
                  this.$emit("Voice_reduceReferrals", "", 3);
                  break;
                case "\u51CF\u5C11\u65F6\u5C1A":
                  this.$emit("Voice_reduceReferrals", "", 4);
                  break;
                case "\u51CF\u5C11\u5BB6\u5177":
                  this.$emit("Voice_reduceReferrals", "", 5);
                  break;
                case "\u51CF\u5C11\u793E\u4F1A":
                  this.$emit("Voice_reduceReferrals", "", 6);
                  break;
                case "\u51CF\u5C11\u5F69\u7968":
                  this.$emit("Voice_reduceReferrals", "", 7);
                  break;
                case "\u51CF\u5C11\u5A31\u4E50":
                  this.$emit("Voice_reduceReferrals", "", 8);
                  break;
                case "\u51CF\u5C11\u4F53\u80B2":
                  this.$emit("Voice_reduceReferrals", "", 9);
                  break;
                case "\u51CF\u5C11\u6559\u80B2":
                  this.$emit("Voice_reduceReferrals", "", 10);
                  break;
                case "\u51CF\u5C11\u80A1\u7968":
                  this.$emit("Voice_reduceReferrals", "", 11);
                  break;
                case "\u51CF\u5C11\u6E38\u620F":
                  this.$emit("Voice_reduceReferrals", "", 12);
                  break;
                case "\u51CF\u5C11\u8D22\u7ECF":
                  this.$emit("Voice_reduceReferrals", "", 13);
                  break;
              }
            });
          }
        }
      });
      this.recorderManager.stop();
    },
    handleTouchMove(e) {
      var moveLenght = e.touches[e.touches.length - 1].clientY - this.startPoint.clientY;
      if (Math.abs(moveLenght) > 70) {
        this.VoiceTitle = "\u677E\u5F00\u624B\u6307,\u53D6\u6D88\u53D1\u9001";
        this.VoiceText = "\u677E\u5F00\u624B\u6307,\u53D6\u6D88\u53D1\u9001";
        this.delBtn();
        this.sendLock = true;
      } else {
        this.VoiceTitle = "\u677E\u624B\u7ED3\u675F\u5F55\u97F3";
        this.VoiceText = "\u677E\u624B\u7ED3\u675F\u5F55\u97F3";
        this.sendLock = false;
      }
    },
    delBtn() {
      this.delShow = false;
      this.time = 0;
      this.tempFilePath = "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.VoiceText),
    b: common_vendor.n($data.longPress == "1" ? "record-btn-1" : "record-btn-2"),
    c: common_vendor.s($data.VoiceTitle != "\u677E\u5F00\u624B\u6307,\u53D6\u6D88\u53D1\u9001" && $data.longPress != "1" ? "background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);" : "background-color: rgba(0, 0, 0, .5);color:white"),
    d: common_vendor.o((...args) => $options.longpressBtn && $options.longpressBtn(...args)),
    e: common_vendor.o(($event) => $options.touchendBtn()),
    f: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    g: common_vendor.o((...args) => $options.longpressBtn && $options.longpressBtn(...args)),
    h: $data.longPress == "2"
  }, $data.longPress == "2" ? {
    i: common_vendor.f(15, (item, index, i0) => {
      return {
        a: index
      };
    }),
    j: common_vendor.t($data.VoiceTitle),
    k: common_vendor.n($data.VoiceTitle != "\u677E\u5F00\u624B\u6307,\u53D6\u6D88\u53D1\u9001" ? "prompt-layer prompt-layer-1" : "prompt-layer1 prompt-layer-1")
  } : {}, {
    l: common_vendor.n($data.longPress == "1" ? "record-box" : "record-box1"),
    m: common_vendor.n($data.longPress == "1" ? "record-layer" : "record-layer1")
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/components/voice/voice.vue"]]);
wx.createComponent(Component);
