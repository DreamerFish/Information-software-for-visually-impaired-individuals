"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_zebraUniappSwiperMaster_libs_mixins_relation = require("../../libs/mixins/relation.js");
var zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang = require("../../../../z-swiper-wxs.wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.js");
const _sfc_main = {
  name: "z-swipe-item",
  mixins: [uni_modules_zebraUniappSwiperMaster_libs_mixins_relation.ChildrenMixin("zSwipe")],
  props: {
    customStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    swiperItemWidth: {
      type: [String, Number],
      default: 0
    },
    swiperItemHeight: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      wxsItemTransform: "",
      itemStyle: {},
      offsetLeft: 0,
      offsetTop: 0,
      itemClass: [],
      width: 0,
      height: 0
    };
  },
  mounted() {
    this.getSize();
  },
  computed: {
    slideClass() {
      return this.itemClass.join(" ");
    }
  },
  watch: {
    swiperItemWidth: {
      handler(val) {
        if (val) {
          this.$set(this.itemStyle, "width", this.unitFormat(val, "rpx"));
        }
      },
      immediate: true
    },
    swiperItemHeight: {
      handler(val) {
        if (val) {
          this.$set(this.itemStyle, "height", this.unitFormat(val, "rpx"));
        }
      },
      immediate: true
    }
  },
  methods: {
    unitFormat(val, type) {
      if (type == "rpx") {
        if (val.includes("rpx") || val.includes("px")) {
          return val;
        } else {
          return val + "px";
        }
      }
      if (type == "number") {
        if (val.includes("rpx")) {
          return common_vendor.index.upx2px(parseInt(val.replace("rpx", "")));
        } else if (!val.includes("rpx") && val.includes("px")) {
          return parseInt(val.replace("px", ""));
        } else {
          return val;
        }
      }
    },
    onClickSlide(event) {
      this.$emit("click", {
        event,
        index: this.index
      });
      this.parent.swiper.updateClickedSlide(this.index);
      this.parent.swiper.emit("slideClick", this.index);
    },
    transform(value) {
      this.wxsItemTransform = value;
    },
    transition(value) {
      this.$set(this.itemStyle, "transition-duration", `${value}ms`);
    },
    willChange(value) {
      this.$set(this.itemStyle, "will-change", value);
    },
    css(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.itemStyle, item, value[item]);
      });
    },
    transitionEnd(callback, duration) {
      setTimeout(callback, duration);
    },
    getSize() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      return new Promise((resolve, reject) => {
        query.select(".swiper-slide").boundingClientRect((data) => {
          if (this.swiperItemWidth) {
            this.width = this.unitFormat(this.swiperItemWidth, "number");
            this.height = data.height;
          }
          if (this.swiperItemHeight) {
            this.width = data.width;
            this.height = this.unitFormat(this.swiperItemHeight, "number");
          }
          if (!this.swiperItemWidth && !this.swiperItemHeight) {
            this.width = data.width;
            this.height = data.height;
          }
          resolve({
            width: this.width,
            height: this.height
          });
        }).exec();
      });
    },
    addClass(value) {
      this.itemClass = Array.from(/* @__PURE__ */ new Set([...this.itemClass, ...value.split(" ")]));
    },
    removeClass(value) {
      this.itemClass = this.itemClass.filter((item) => !value.split(" ").includes(item));
    },
    hasClass(value) {
      return this.itemClass.includes(value);
    },
    nextAll() {
      return this.parent.children.filter((item) => {
        return item.index > this.index;
      });
    },
    prevAll() {
      return this.parent.children.filter((item) => {
        return item.index < this.index;
      }).reverse();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($options.slideClass),
    b: common_vendor.s($data.itemStyle),
    c: common_vendor.s($props.customStyle),
    d: common_vendor.o((...args) => $options.onClickSlide && $options.onClickSlide(...args)),
    e: $data.wxsItemTransform
  };
}
if (typeof zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.block0 === "function")
  zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.block0(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0bdc888c"], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news\u2014\u20148.12/uni_modules/zebra-uniapp-swiper-master/components/z-swiper-item/z-swiper-item.vue"]]);
wx.createComponent(Component);
