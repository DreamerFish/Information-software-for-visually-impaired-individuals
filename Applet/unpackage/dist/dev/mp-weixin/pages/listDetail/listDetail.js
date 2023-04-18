"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      info: [],
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
  onLoad(options) {
    console.log(this.bgAudioManager);
    if (this.bgAudioManager != null) {
      this.bgAudioManager.stop();
    }
    this.content = JSON.parse(options.content);
    console.log(this.content);
    utils_request.post({
      url: "/nlp/summary",
      data: {
        count: 3,
        text: this.content.newsContent
      }
    }).then((res) => {
      this.content.summary = res.data.substring(1, res.data.length - 1);
      console.log(this.content.summary);
    });
    if (options.type == "star") {
      this.content.star = true;
    }
    this.audio();
    this.info.push(this.content);
  },
  onReady() {
    if (this.bgAudioManager != null) {
      this.bgAudioManager.stop();
    }
    this.bgAudioManager = null;
    this.audioNesw = "";
    this.state = false;
    this.newTime = 0;
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
    shoucang(index) {
      this.info[index].star = !this.info[index].star;
      console.log("\u5F53\u524D\u65B0\u95FB", this.info[index]);
      if (this.info[index].star == true) {
        utils_request.post({
          url: "/newsCollect/addnews",
          data: {
            newsId: this.info[index].newsId,
            newsTitle: this.info[index].newsTitle,
            newsContent: this.info[index].newsContent,
            newstype: this.info[index].newstype
          }
        }).then((res) => {
          console.log(res);
        });
      } else {
        utils_request.post({
          url: "/newsCollect/delnews",
          data: {
            id: this.info[index].newsId
          }
        }).then((res) => {
          console.log("\u5220\u9664\u6536\u85CF", res);
        });
      }
    },
    audio(e) {
      this.allowmusic = false;
      console.log("\u97F3\u9891\u83B7\u53D6");
      utils_request.post({
        url: "/voice/OcrToVoice",
        data: {
          native_voice_name: "xiaoyan",
          ocrText: this.content.newsContent,
          speed: 100,
          volume: 0
        }
      }).then((res) => {
        console.log(res.data.data.data);
        this.allowmusic = true;
        this.audioNesw = res.data.data.data;
      });
    },
    backgroundAudio() {
      this.bgAudioManager = common_vendor.index.getBackgroundAudioManager();
      this.bgAudioManager.startTime = 0;
    },
    bindstate(e) {
      if (this.allowmusic == false) {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659182473850.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u6CA1\u8BC6\u522B\u5B8C\u97F3\u9891\u7684\u63D0\u793A\u58F0\u97F3");
        });
      } else {
        this.state = e;
        if (e) {
          if (isNaN(this.newTime)) {
            this.newTime = 0;
          }
          console.log("\u64AD\u653E", this.newTime, this.audioNesw);
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
      }
      const that = this;
      this.bgAudioManager.onTimeUpdate((res) => {
        that.outTimes();
      });
    },
    outTimes() {
      if (this.bgAudioManager != null) {
        let allduration = this.bgAudioManager.duration;
        let currentTime = this.bgAudioManager.currentTime;
        this.newTime = parseInt(parseInt(currentTime) / parseInt(allduration) * 100);
        if (this.newTime >= 100) {
          this.bgAudioManager.startTime = 0;
          if (this.bgAudioManager != null) {
            this.bgAudioManager.stop();
          }
          this.bgAudioManager = null;
          this.state = false;
          this.newTime = 0;
        }
      }
    }
  },
  sliderChange(e) {
    console.log(e.detail.value);
    let allduration = this.bgAudioManager.duration;
    this.newTime = e.detail.value;
    this.bgAudioManager.seek(parseInt(parseInt(allduration) * parseInt(e.detail.value) / 100));
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
        a: common_vendor.t(item.newsId),
        b: common_vendor.t(item.newsTitle),
        c: common_vendor.t(item.summary)
      }, $data.state ? {
        d: common_vendor.o(($event) => $options.bindstate(false))
      } : {}, !$data.state ? {
        e: common_vendor.o(($event) => $options.bindstate(true))
      } : {}, {
        f: common_vendor.o(($event) => $options.shoucang(index)),
        g: common_vendor.n(item.star == true ? "fill" : ""),
        h: index,
        i: "02552035-1-" + i0 + ",02552035-0"
      });
    }),
    b: $data.newTime,
    c: common_vendor.o((...args) => _ctx.sliderChange && _ctx.sliderChange(...args)),
    d: $data.state,
    e: !$data.state,
    f: common_vendor.p({
      ["custom-style"]: $data.slideCustomStyle
    }),
    g: common_vendor.o(($event) => $data.info = $event),
    h: common_vendor.p({
      ["custom-style"]: {
        height: 90 + "vh"
      },
      options: $data.options,
      modelValue: $data.info
    }),
    i: common_vendor.o(($event) => $options.bindstate(true)),
    j: common_vendor.o(($event) => $options.bindstate(false))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/pages/listDetail/listDetail.vue"]]);
wx.createPage(MiniProgramPage);
