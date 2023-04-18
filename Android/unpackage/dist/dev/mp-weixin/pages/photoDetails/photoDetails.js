"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      info: [],
      translate: [],
      recognition_type: "",
      color: ["#F53F3F", "#F77234", "#FF7D00", "#F7BA1E", "#FADC19", "#9FDB1D", "#00B42A", "#3491FA", "#165DFF", "#722ED1"],
      newTime: 0,
      slideCustomStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "36rpx"
      },
      options: {
        effect: "cards",
        direction: "vertical"
      },
      state: false,
      audioNesw: "",
      content: ""
    };
  },
  onLoad(option) {
    const type = JSON.parse(decodeURIComponent(option.type));
    if (type == "Translate") {
      console.log(type);
      const item = JSON.parse(decodeURIComponent(option.content));
      console.log("\u4E0A\u4E00\u4E2A\u9875\u9762\u4F20\u9012\u8FC7\u6765\u7684\u53C2\u6570\u5BF9\u8C61", item);
      for (var i = 0; i < item.length; i++) {
        this.info.push(item[i][0]);
        this.translate.push(item[i][1]);
      }
      this.backgroundAudio();
      this.audio(0);
    } else {
      const item = JSON.parse(decodeURIComponent(option.content));
      console.log("\u4E0A\u4E00\u4E2A\u9875\u9762\u4F20\u9012\u8FC7\u6765\u7684\u53C2\u6570\u5BF9\u8C61", item);
      this.info = item;
      this.backgroundAudio();
      this.audio(0);
      console.log("\u8981\u7684\u5C31\u662F\u4F60", this.info[0]);
    }
  },
  onUnload(e) {
    console.log(e, "\u9875\u9762\u5378\u8F7D");
    this.info = [];
    if (this.bgAudioManager != null) {
      this.bgAudioManager.stop();
    }
    this.bgAudioManager = null;
    this.audioNesw = "";
    this.state = false;
    this.newTime = 0;
  },
  methods: {
    audio(e) {
      if (this.translate.length != 0) {
        utils_request.post({
          url: "/voice/OcrToVoice",
          data: {
            native_voice_name: "xiaoyan",
            ocrText: this.translate[e],
            speed: 100,
            volume: 0
          }
        }).then((res) => {
          console.log(res.data.data.data);
          this.audioNesw = res.data.data.data;
        });
      } else {
        utils_request.post({
          url: "/voice/OcrToVoice",
          data: {
            native_voice_name: "xiaoyan",
            ocrText: this.info[e],
            speed: 100,
            volume: 0
          }
        }).then((res) => {
          console.log("\u8981\u7684\u5C31\u662F\u4F60", res.data.data.data);
          this.audioNesw = res.data.data.data;
        });
      }
    },
    swiper() {
      this.$refs.zSwiper.swiper.on("slideChange", (swiper) => {
        console.log("\u5728\u5F53\u524DSlide\u5207\u6362\u5230\u53E6\u4E00\u4E2ASlide\u65F6\u6267\u884C", swiper);
        this.bgAudioManager.stop();
        this.bgAudioManager = null;
        this.backgroundAudio();
        this.audioNesw = "";
        this.state = false;
        this.bgAudioManager.pause();
        this.audio(swiper.activeIndex);
        this.newTime = 0;
        if (swiper.activeIndex == this.info.length - 2) {
          console.log("\u83B7\u53D6\u65B0\u6570\u636E");
        }
      });
    },
    backgroundAudio() {
      this.bgAudioManager = common_vendor.index.getBackgroundAudioManager();
      this.bgAudioManager.startTime = 0;
    },
    bindstate(e) {
      this.state = e;
      if (e) {
        if (isNaN(this.newTime)) {
          this.newTime = 0;
        }
        if (this.newTime != 0) {
          this.bgAudioManager.play();
          this.newTime = 0;
        } else {
          this.backgroundAudio();
          this.bgAudioManager.src = this.audioNesw;
          this.bgAudioManager.title = "\u8BFB\u53D6\u5185\u5BB9";
          this.bgAudioManager.singer = "\u6682\u65E0";
          this.bgAudioManager.coverImgUrl = "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png";
          this.newTime = 0;
          this.bgAudioManager.play();
        }
      } else {
        this.bgAudioManager.pause();
      }
      const that = this;
      this.bgAudioManager.onTimeUpdate((res) => {
        that.outTimes();
      });
    },
    outTimes() {
      let allduration = this.bgAudioManager.duration;
      let currentTime = this.bgAudioManager.currentTime;
      this.newTime = parseInt(parseInt(currentTime) / parseInt(allduration) * 100);
      if (this.newTime >= 100) {
        this.bgAudioManager.startTime = 0;
      }
    },
    sliderChange(e) {
      console.log(e.detail.value);
      let allduration = this.bgAudioManager.duration;
      this.newTime = e.detail.value;
      this.bgAudioManager.seek(parseInt(parseInt(allduration) * parseInt(e.detail.value) / 100));
    }
  }
};
if (!Array) {
  const _easycom_z_swiper_item2 = common_vendor.resolveComponent("z-swiper-item");
  const _easycom_z_swiper2 = common_vendor.resolveComponent("z-swiper");
  const _easycom_voice2 = common_vendor.resolveComponent("voice");
  (_easycom_z_swiper_item2 + _easycom_z_swiper2 + _easycom_voice2)();
}
const _easycom_z_swiper_item = () => "../../uni_modules/zebra-uniapp-swiper-master/components/z-swiper-item/z-swiper-item.js";
const _easycom_z_swiper = () => "../../uni_modules/zebra-uniapp-swiper-master/components/z-swiper/z-swiper.js";
const _easycom_voice = () => "../../components/voice/voice.js";
if (!Math) {
  (_easycom_z_swiper_item + _easycom_z_swiper + _easycom_voice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.info, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item)
      }, $data.translate.length != 0 ? {
        b: common_vendor.t($data.translate[index])
      } : {}, $data.state ? {
        c: common_vendor.o(($event) => $options.bindstate(false))
      } : {}, !$data.state ? {
        d: common_vendor.o(($event) => $options.bindstate(true))
      } : {}, {
        e: $data.color[index],
        f: index,
        g: "1f793928-1-" + i0 + ",1f793928-0"
      });
    }),
    b: $data.translate.length != 0,
    c: $data.newTime,
    d: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    e: $data.state,
    f: !$data.state,
    g: common_vendor.p({
      ["custom-style"]: $data.slideCustomStyle
    }),
    h: common_vendor.sr("zSwiper", "1f793928-0"),
    i: common_vendor.o($options.swiper),
    j: common_vendor.o(($event) => $data.info = $event),
    k: common_vendor.p({
      ["custom-style"]: {
        height: 90 + "vh"
      },
      options: $data.options,
      modelValue: $data.info
    }),
    l: common_vendor.o(($event) => $options.bindstate(true)),
    m: common_vendor.o(($event) => $options.bindstate(false))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/photoDetails/photoDetails.vue"]]);
wx.createPage(MiniProgramPage);
