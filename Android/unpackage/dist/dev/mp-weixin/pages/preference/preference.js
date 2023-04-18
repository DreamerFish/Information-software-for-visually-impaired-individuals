"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      Newslike: [],
      touchNum: 0,
      isactive: -1,
      backcolor: [],
      long: []
    };
  },
  onLoad() {
    this.GetNewsType();
  },
  methods: {
    GetNewsType() {
      utils_request.get({
        url: "/newsType/userGetAllNewsType"
      }).then((res) => {
        this.Newslike = res.data.data.userNewsTypes;
        for (var i = 0; i < this.Newslike.length; i++) {
          switch (this.Newslike[i].value) {
            case 10:
              this.backcolor.push("linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)");
              this.long.push("100%");
              break;
            case 8:
              this.backcolor.push("linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)");
              this.long.push("70%");
              break;
            case 5:
              this.backcolor.push("linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)");
              this.long.push("50%");
              break;
            case 3:
              this.backcolor.push("linear-gradient(to right,#9ADAFD 0%,#D8C4FF 100%)");
              this.long.push("30%");
              break;
            case 0:
              this.backcolor.push("linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)");
              this.long.push("15%");
              break;
          }
        }
      });
    },
    Referrals(type, houduanflag, likeNewsTypeId, newsType, value) {
      console.log(type, houduanflag, likeNewsTypeId, newsType, value);
      utils_request.post({
        url: "/newsType/update",
        data: {
          houduanflag,
          likeNewsTypeId,
          newsType,
          value
        }
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.GetNewsType();
          common_vendor.index.showToast({
            title: type ? "\u589E\u52A0\u63A8\u8350\u6210\u529F" : "\u51CF\u5C11\u63A8\u8350\u6210\u529F",
            duration: 2e3
          });
        }
      });
    },
    reduceReferrals(e, index) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224944611.wav";
      innerAudioContext.onPlay(() => {
        console.log("\u51CF\u5C11\u63A8\u8350\u6210\u529F\u63D0\u793A\u58F0");
      });
      this.isactive = index;
      let {
        houduanflag,
        likeNewsTypeId,
        newsType,
        value
      } = this.Newslike[index];
      switch (value) {
        case 10:
          value = 8;
          this.long[this.isactive] = "70%";
          this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)";
          break;
        case 8:
          value = 5;
          this.long[this.isactive] = "50%";
          this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)";
          break;
        case 5:
          value = 3;
          this.long[this.isactive] = "30%";
          this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 100%)";
          break;
        case 3:
          value = 0;
          this.long[this.isactive] = "15%";
          this.backcolor[this.isactive] = "linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)";
          break;
        default:
          value = 0;
          this.long[this.isactive] = "15%";
          this.backcolor[this.isactive] = "linear-gradient(to right,#97d7f9 0%,#9ADAFD 100%)";
          break;
      }
      this.Referrals(false, houduanflag, likeNewsTypeId, newsType, value);
    },
    addReferrals(e, index) {
      console.log("\u8981\u7684\u5C31\u662F\u4F60", index);
      console.log(this.Newslike[index]);
      this.isactive = index;
      this.touchNum++;
      if (e == "") {
        this.touchNum++;
      }
      let {
        houduanflag,
        likeNewsTypeId,
        newsType,
        value
      } = this.Newslike[index];
      setTimeout(() => {
        if (this.touchNum == 1)
          ;
        if (this.touchNum >= 2) {
          const innerAudioContext = common_vendor.index.createInnerAudioContext();
          innerAudioContext.autoplay = true;
          innerAudioContext.src = "https://penghuahai.obs.cn-south-1.myhuaweicloud.com:443/penghuahai%2Fblind%2F1660224995782.wav";
          innerAudioContext.onPlay(() => {
            console.log("\u589E\u52A0\u63A8\u8350\u6210\u529F\u63D0\u793A\u58F0");
          });
          switch (value) {
            case 0:
              value = 3;
              this.long[this.isactive] = "30%";
              this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)";
              break;
            case 3:
              value = 5;
              this.long[this.isactive] = "50%";
              this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 70%,#EBC5F8 100%)";
              break;
            case 5:
              value = 8;
              this.long[this.isactive] = "70%";
              this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 100%)";
              break;
            case 8:
              value = 10;
              this.long[this.isactive] = "100%";
              this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)";
              break;
            default:
              value = 10;
              this.long[this.isactive] = "100%";
              this.backcolor[this.isactive] = "linear-gradient(to right,#9ADAFD 0%,#D8C4FF 50%,#EBC5F8 60%,#ffe6f1 100%)";
              break;
          }
          this.Referrals(true, houduanflag, likeNewsTypeId, newsType, value);
        }
        this.touchNum = 0;
      }, 300);
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
    a: common_vendor.f($data.Newslike, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.newsType),
        b: item.value === 10
      }, item.value === 10 ? {} : {}, {
        c: item.value === 8
      }, item.value === 8 ? {} : {}, {
        d: item.value === 5
      }, item.value === 5 ? {} : {}, {
        e: item.value === 3
      }, item.value === 3 ? {} : {}, {
        f: item.value === 0
      }, item.value === 0 ? {} : {}, {
        g: $data.long[index],
        h: $data.backcolor[index],
        i: common_vendor.o(($event) => $options.addReferrals(item, index)),
        j: common_vendor.o(($event) => $options.reduceReferrals(item, index))
      });
    }),
    b: common_vendor.o($options.addReferrals),
    c: common_vendor.o($options.reduceReferrals)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/pages/preference/preference.vue"]]);
wx.createPage(MiniProgramPage);
