"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      src: "",
      scanShow: true,
      piliang: false,
      imgSrc: "../../static/index/piliang1.png",
      photoArr: [],
      qianhou: "back",
      re_type: "GeneralText",
      resultArr: [],
      islongPress: false
    };
  },
  onLoad(option) {
    this.re_type = option.sort;
    console.log(this.re_type);
    common_vendor.index.setNavigationBarTitle({
      title: "\u56FE\u50CF\u8BC6\u522B"
    });
  },
  onUnload(e) {
    console.log(e, "\u9875\u9762\u5378\u8F7D");
    this.photoArr = [];
    this.resultArr = [];
    this.piliang = true;
    this.imgSrc = "../../static/index/piliang1.png";
  },
  methods: {
    PhotoVoice() {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659092709353.mp3";
      innerAudioContext.onPlay(() => {
      });
    },
    piliangshibie() {
      this.islongPress = true;
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312921036.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u6279\u91CF\u8BC6\u522B\u4E2D");
      });
      for (var i = 0; i < JSON.parse(JSON.stringify(this.photoArr)).length; i++) {
        utils_request.uploadFile({
          url: "/pictureDetection/" + this.re_type,
          src: JSON.parse(JSON.stringify(this.photoArr[i]))
        }).then((res) => {
          console.log(JSON.parse(res.data));
          if (JSON.parse(res.data).message == "\u5931\u8D25") {
            const innerAudioContext2 = common_vendor.index.createInnerAudioContext();
            innerAudioContext2.autoplay = true;
            innerAudioContext2.src = JSON.parse(res.data).data.voiceUrl;
            innerAudioContext2.onPlay(() => {
              console.log("\u5931\u8D25\u63D0\u793A\u58F0");
            });
          } else if (JSON.parse(res.data).message == "\u6210\u529F") {
            this.resultArr.push(JSON.parse(res.data).data.body[0]);
            if (this.resultArr.length == JSON.parse(JSON.stringify(this.photoArr)).length) {
              innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312958435.wav";
              innerAudioContext.onPlay(() => {
                console.log("\u6279\u91CF\u8BC6\u522B\u6210\u529F");
              });
              common_vendor.index.navigateTo({
                url: `../photoDetails/photoDetails?content=${encodeURIComponent(JSON.stringify(this.resultArr))}&type=${encodeURIComponent(JSON.stringify(this.re_type))}`
              });
            }
          } else
            ;
        });
      }
    },
    touchend() {
      setTimeout(() => {
        this.islongPress = false;
      }, 200);
    },
    takePhoto() {
      if (this.islongPress == false) {
        const ctx = common_vendor.index.createCameraContext();
        this.PhotoVoice();
        ctx.takePhoto({
          quality: "high",
          success: (res) => {
            this.src = res.tempImagePath;
            if (this.piliang == true) {
              this.photoArr.push(this.src);
              console.log(JSON.parse(JSON.stringify(this.photoArr)));
            } else {
              utils_request.uploadFile({
                url: "/pictureDetection/" + this.re_type,
                src: this.src
              }).then((res2) => {
                console.log(JSON.parse(res2.data));
                if (JSON.parse(res2.data).message == "\u5931\u8D25") {
                  const innerAudioContext = common_vendor.index.createInnerAudioContext();
                  innerAudioContext.autoplay = true;
                  innerAudioContext.src = JSON.parse(res2.data).data.voiceUrl;
                  innerAudioContext.onPlay(() => {
                    console.log("\u5931\u8D25\u63D0\u793A\u58F0");
                  });
                } else if (JSON.parse(res2.data).message == "\u6210\u529F") {
                  const innerAudioContext = common_vendor.index.createInnerAudioContext();
                  innerAudioContext.autoplay = true;
                  innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660271089599.wav";
                  innerAudioContext.onPlay(() => {
                    console.log("\u8BC6\u522B\u6210\u529F");
                  });
                  console.log(JSON.parse(res2.data).data.body[0]);
                  if (this.re_type == "Translate") {
                    common_vendor.index.navigateTo({
                      url: "../SinglePhoto/SinglePhoto?content=" + JSON.stringify(JSON.parse(res2.data).data.body[0])
                    });
                  } else {
                    common_vendor.index.navigateTo({
                      url: "../SinglePhoto/SinglePhoto?content=" + JSON.stringify(JSON.parse(res2.data).data.body)
                    });
                  }
                }
              });
            }
            let pages = getCurrentPages();
            let currPage = pages[pages.length - 1];
            if (typeof currPage.data.image != void 0 && currPage.data.image != null) {
              console.log("\u83B7\u53D6\u56FE\u7247\uFF1A", currPage.data.image);
            }
          }
        });
      } else if (this.islongPress == true) {
        console.log("\u957F\u6309\u4E8B\u4EF6");
      }
    },
    error(e) {
      console.log(e.detail);
    },
    changepiliang() {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      this.piliang = !this.piliang;
      if (this.piliang == true) {
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312759433.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u6279\u91CF\u5F00\u542F\u63D0\u793A\u58F0");
        });
        this.imgSrc = "../../static/index/piliang2.png";
      } else {
        innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1659312846754.wav";
        innerAudioContext.onPlay(() => {
          console.log("\u6279\u91CF\u5173\u95ED\u63D0\u793A\u58F0");
        });
        this.imgSrc = "../../static/index/piliang1.png";
      }
    },
    chooseImg() {
      common_vendor.index.chooseImage({
        count: 6,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    },
    changeqianhou() {
      this.qianhou = this.qianhou === "back" ? "front" : "back";
      console.log(this.qianhou);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.scanShow
  }, $data.scanShow ? {} : {}, {
    b: $data.qianhou,
    c: common_vendor.o((...args) => $options.error && $options.error(...args)),
    d: this.imgSrc,
    e: common_vendor.n($data.piliang == true ? "piliang" : "Nopiliang"),
    f: common_vendor.o((...args) => $options.changepiliang && $options.changepiliang(...args)),
    g: $data.piliang == true
  }, $data.piliang == true ? {
    h: common_vendor.t($data.photoArr.length)
  } : {}, {
    i: common_vendor.o((...args) => $options.chooseImg && $options.chooseImg(...args)),
    j: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args)),
    k: common_vendor.o((...args) => $options.piliangshibie && $options.piliangshibie(...args)),
    l: common_vendor.o((...args) => $options.touchend && $options.touchend(...args)),
    m: common_vendor.o((...args) => $options.changeqianhou && $options.changeqianhou(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30071914"], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/pages/recognition/recognition.vue"]]);
wx.createPage(MiniProgramPage);
