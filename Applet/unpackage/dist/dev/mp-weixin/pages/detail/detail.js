"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      info: [],
      historyNews: [],
      shouchang: false,
      audioNesw: "",
      state: false,
      newTime: 0,
      newsInfo: "",
      newsNow: {},
      allowmusic: false,
      color: ["#F53F3F", "#F77234", "#FF7D00", "#F7BA1E", "#FADC19", "#9FDB1D", "#00B42A", "#3491FA", "#165DFF", "#722ED1"],
      slideCustomStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "36rpx"
      },
      options: {
        effect: "cards",
        direction: "vertical",
        loop: true
      },
      list: [],
      News_index: 0
    };
  },
  onLoad(options) {
    if (this.bgAudioManager != null) {
      this.bgAudioManager.stop();
    }
    this.title = options.sort;
    common_vendor.index.setNavigationBarTitle({
      title: options.sort
    });
    this.news(options.sort);
    common_vendor.index.onSocketMessage((res) => {
      console.log("\u6536\u5230\u670D\u52A1\u5668\u5185\u5BB9\uFF1A", JSON.parse(res.data));
      if (this.historyNews.length >= 10) {
        console.log("\u52A0\u4E00\u8F6E");
        this.historyNews = this.historyNews.concat(JSON.parse(res.data).Bytext);
        console.log(this.info);
        console.log(this.historyNews);
      } else {
        console.log("\u7B2C\u4E00\u8F6E");
        this.news(options.sort);
        this.historyNews = this.historyNews.concat(JSON.parse(res.data).Bytext);
        for (var i = 0; i < this.historyNews.length; i++) {
          this.historyNews[i].star = false;
        }
        this.info = this.historyNews;
        console.log(this.info);
      }
      this.audio();
    });
  },
  onPullDownRefresh() {
  },
  onReachBottom() {
  },
  onUnload(e) {
    console.log(e, "\u9875\u9762\u5378\u8F7D");
    if (this.bgAudioManager != null) {
      this.bgAudioManager.stop();
    }
    this.bgAudioManager = null;
    this.audioNesw = "";
    this.state = false;
    this.newTime = 0;
    common_vendor.index.$emit("news", {
      newsNow: { newsNow: this.newsNow, audioNesw: this.audioNesw, newTime: this.newTime }
    });
  },
  methods: {
    shoucang(index) {
      this.info[index].star = !this.info[index].star;
      console.log("\u5F53\u524D\u65B0\u95FB", this.newsNow);
      if (this.info[index].star == true) {
        utils_request.post({
          url: "/newsCollect/addnews",
          data: {
            newsId: this.newsNow.newsId,
            newsTitle: this.newsNow.newsTitle,
            newsContent: this.newsNow.newsContent,
            newstype: this.newsNow.newstype
          }
        }).then((res) => {
          console.log(res);
        });
      } else {
        utils_request.post({
          url: "/newsCollect/delnews",
          data: {
            id: this.newsNow.newsId
          }
        }).then((res) => {
          console.log(res);
        });
      }
    },
    news(e) {
      console.log("\u83B7\u53D6\u4E00\u6B21");
      utils_request.get({
        url: "/news/sendTypeToDeepin",
        data: {
          typeName: e
        }
      }).then((res) => {
        console.log(res);
      });
    },
    audio(e) {
      this.allowmusic = false;
      const { newsId, newsTitle, newsContent } = this.info[e || 0];
      this.newsNow = this.info[e || 0];
      console.log("\u97F3\u9891\u83B7\u53D6", this.newsNow);
      utils_request.post({
        url: "/news/createToVoice",
        data: {
          native_voice_name: "xiaoyan",
          newsId,
          newsContent,
          newsTitle,
          speed: 100,
          volume: 0,
          newsType: this.title
        }
      }).then((res) => {
        console.log(res.data);
        this.allowmusic = true;
        this.audioNesw = res.data.data.data;
      });
    },
    swiper() {
      this.$refs.zSwiper.swiper.on("slideChange", (swiper) => {
        if (this.bgAudioManager != null) {
          this.bgAudioManager.stop();
        }
        this.bgAudioManager = null;
        this.audioNesw = "";
        this.state = false;
        console.log(this.newTime, this.audioNesw, this.state);
        this.audio(swiper.activeIndex);
        this.newTime = 0;
      });
      this.$refs.zSwiper.swiper.on("fromEdge", async (swiper) => {
        if (swiper.activeIndex == 11) {
          this.News_index += 1;
          console.log(this.News_index);
          console.log(this.historyNews.slice(this.News_index * 10, this.News_index * 10 + 11));
          this.info = this.historyNews.slice(this.News_index * 10, this.News_index * 10 + 10);
          this.news(this.title);
        } else if (swiper.activeIndex == 0) {
          if (this.News_index > 0) {
            this.info = this.historyNews.slice((this.News_index - 1) * 10, (this.News_index - 1) * 10 + 10);
          }
          this.News_index -= 1;
          if (this.News_index == -1) {
            this.News_index += 1;
          }
          console.log(this.News_index);
        }
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
          } else {
            this.backgroundAudio();
            this.bgAudioManager.src = this.audioNesw;
            this.bgAudioManager.title = this.newsNow.newsTitle;
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
      }
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
    },
    sliderChange(e) {
      console.log(e.detail.value);
      if (this.audioNesw != "") {
        let allduration = this.bgAudioManager.duration;
        this.newTime = e.detail.value;
        this.bgAudioManager.seek(parseInt(parseInt(allduration) * parseInt(e.detail.value) / 100));
      }
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
        a: common_vendor.t(item.newsId),
        b: common_vendor.t(item.newsTitle),
        c: common_vendor.t(item.newsSummary.substring(1, item.newsSummary.length - 1))
      }, $data.state ? {
        d: common_vendor.o(($event) => $options.bindstate(false))
      } : {}, !$data.state ? {
        e: common_vendor.o(($event) => $options.bindstate(true))
      } : {}, {
        f: common_vendor.o(($event) => $options.shoucang(index)),
        g: common_vendor.n(item.star == true ? "fill" : ""),
        h: $data.color[index % 10],
        i: index,
        j: "6a51cff5-1-" + i0 + ",6a51cff5-0"
      });
    }),
    b: $data.newTime,
    c: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    d: $data.state,
    e: !$data.state,
    f: common_vendor.p({
      ["custom-style"]: $data.slideCustomStyle
    }),
    g: common_vendor.sr("zSwiper", "6a51cff5-0"),
    h: common_vendor.o($options.swiper),
    i: common_vendor.o(($event) => $data.info = $event),
    j: common_vendor.p({
      ["custom-style"]: {
        height: 90 + "vh"
      },
      options: $data.options,
      modelValue: $data.info
    }),
    k: common_vendor.o(($event) => $options.shoucang(this.newsIndex)),
    l: common_vendor.o(($event) => $options.bindstate(true)),
    m: common_vendor.o(($event) => $options.bindstate(false))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
