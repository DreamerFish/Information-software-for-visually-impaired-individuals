"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_zebraUniappSwiperMaster_libs_utils_utils = require("../../libs/utils/utils.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_getParams = require("../../libs/vue2/get-params.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_initSwiper = require("../../libs/vue2/init-swiper.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_utils = require("../../libs/vue2/utils.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_loop = require("../../libs/vue2/loop.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_getChangedParams = require("../../libs/vue2/get-changed-params.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_updateSwiper = require("../../libs/vue2/update-swiper.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_virtual = require("../../libs/vue2/virtual.js");
var uni_modules_zebraUniappSwiperMaster_libs_mixins_relation = require("../../libs/mixins/relation.js");
var zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang = require("../../../../z-swiper-wxs.wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.js");
require("../../index.js");
require("../../libs/core.js");
require("../../shared/utils.js");
require("../../shared/get-support.js");
require("../../shared/get-device.js");
require("../../shared/get-browser.js");
require("../../libs/moduleExtendParams.js");
require("../../libs/events-emitter.js");
require("../../libs/update/index.js");
require("../../libs/update/updateSize.js");
require("../../libs/update/updateSlides.js");
require("../../libs/update/updateAutoHeight.js");
require("../../libs/update/updateSlidesOffset.js");
require("../../libs/update/updateSlidesProgress.js");
require("../../libs/update/updateProgress.js");
require("../../libs/update/updateSlidesClasses.js");
require("../../libs/update/updateActiveIndex.js");
require("../../libs/update/updateClickedSlide.js");
require("../../libs/translate/index.js");
require("../../libs/translate/getTranslate.js");
require("../../libs/translate/setTranslate.js");
require("../../libs/translate/minTranslate.js");
require("../../libs/translate/maxTranslate.js");
require("../../libs/translate/translateTo.js");
require("../../libs/transition/index.js");
require("../../libs/transition/setTransition.js");
require("../../libs/transition/transitionStart.js");
require("../../libs/transition/transitionEmit.js");
require("../../libs/transition/transitionEnd.js");
require("../../libs/defaults.js");
require("../../libs/classes/index.js");
require("../../libs/classes/addClasses.js");
require("../../libs/classes/removeClasses.js");
require("../../libs/check-overflow/index.js");
require("../../libs/slide/index.js");
require("../../libs/slide/slideTo.js");
require("../../libs/slide/slideToLoop.js");
require("../../libs/slide/slideNext.js");
require("../../libs/slide/slidePrev.js");
require("../../libs/slide/slideReset.js");
require("../../libs/slide/slideToClosest.js");
require("../../libs/slide/slideToClickedSlide.js");
require("../../libs/loop/index.js");
require("../../libs/loop/loopCreate.js");
require("../../libs/loop/loopFix.js");
require("../../libs/loop/loopDestroy.js");
require("../../libs/grab-cursor/index.js");
require("../../libs/grab-cursor/setGrabCursor.js");
require("../../libs/grab-cursor/unsetGrabCursor.js");
require("../../libs/events/index.js");
require("../../libs/events/onTouchStart.js");
require("../../libs/events/onTouchMove.js");
require("../../libs/events/onTouchEnd.js");
require("../../libs/events/onClick.js");
require("../../libs/events/onScroll.js");
require("../../modules/autoplay/autoplay.js");
require("../../modules/free-mode/free-mode.js");
require("../../modules/effect-fade/effect-fade.js");
require("../../shared/effect-init.js");
require("../../shared/effect-target.js");
require("../../shared/effect-virtual-transition-end.js");
require("../../modules/effect-cube/effect-cube.js");
require("../../modules/effect-coverflow/effect-coverflow.js");
require("../../modules/effect-flip/effect-flip.js");
require("../../modules/effect-cards/effect-cards.js");
require("../../modules/effect-creative/effect-creative.js");
require("../../modules/effect-panorama/effect-panorama.js");
require("../../modules/effect-carousel/effect-carousel.js");
require("../../modules/navigation/navigation.js");
require("../../modules/pagination/pagination.js");
require("../../shared/classes-to-selector.js");
require("../../modules/thumbs/thumbs.js");
require("../../modules/scrollbar/scrollbar.js");
require("../../modules/virtual/virtual.js");
require("../../modules/will-change/will-change.js");
require("../../libs/vue2/params-list.js");
const _sfc_main = {
  name: "z-swipe",
  mixins: [
    uni_modules_zebraUniappSwiperMaster_libs_mixins_relation.ParentMixin("zSwipe")
  ],
  emits: [
    "update:modelValue",
    "touch-start",
    "touch-move",
    "touch-end",
    "transitionend",
    "slideClick",
    "_beforeBreakpoint",
    "_containerClasses",
    "_slideClass",
    "_slideClasses",
    "_swiper",
    "activeIndexChange",
    "afterInit",
    "autoplay",
    "autoplayStart",
    "autoplayStop",
    "autoplayPause",
    "autoplayResume",
    "beforeDestroy",
    "beforeInit",
    "beforeLoopFix",
    "beforeResize",
    "beforeSlideChangeStart",
    "beforeTransitionStart",
    "breakpoint",
    "changeDirection",
    "click",
    "disable",
    "doubleTap",
    "doubleClick",
    "destroy",
    "enable",
    "fromEdge",
    "hashChange",
    "hashSet",
    "imagesReady",
    "init",
    "keyPress",
    "lazyImageLoad",
    "lazyImageReady",
    "lock",
    "loopFix",
    "momentumBounce",
    "navigationHide",
    "navigationShow",
    "observerUpdate",
    "orientationchange",
    "paginationHide",
    "paginationRender",
    "paginationShow",
    "paginationUpdate",
    "progress",
    "reachBeginning",
    "reachEnd",
    "realIndexChange",
    "resize",
    "scroll",
    "scrollbarDragEnd",
    "scrollbarDragMove",
    "scrollbarDragStart",
    "setTransition",
    "setTranslate",
    "slideChange",
    "slideChangeTransitionEnd",
    "slideChangeTransitionStart",
    "slideNextTransitionEnd",
    "slideNextTransitionStart",
    "slidePrevTransitionEnd",
    "slidePrevTransitionStart",
    "slideResetTransitionStart",
    "slideResetTransitionEnd",
    "sliderMove",
    "sliderFirstMove",
    "slidesLengthChange",
    "slidesGridLengthChange",
    "snapGridLengthChange",
    "snapIndexChange",
    "swiper",
    "tap",
    "toEdge",
    "touchEnd",
    "touchMove",
    "touchMoveOpposite",
    "touchStart",
    "transitionEnd",
    "transitionStart",
    "unlock",
    "update",
    "zoomChange"
  ],
  props: {
    customStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      wxsTransform: "",
      wrapperStyle: {},
      contentClass: "",
      nextElClass: [],
      prevElClass: [],
      paginationElClass: [],
      paginationItemElClass: [],
      loopBlankShow: false,
      loopBlankNumber: 0,
      cubeShadowShowWrapper: false,
      cubeShadowShowRoot: false,
      cubeShadowStyle: {},
      eventsListeners: {},
      showPrevButton: false,
      showPrevButtonSlot: false,
      showNextButton: false,
      showNextButtonSlot: false,
      showIndicators: false,
      paginationContent: [],
      paginationType: "",
      paginationStyle: {},
      scrollbarElClass: [],
      scrollbarStyle: {},
      scrollbarItemStyle: {},
      rectInfo: null,
      containerClasses: "swiper",
      virtualData: null,
      firstLoad: true,
      originalDataList: [],
      loopUpdateData: false
    };
  },
  computed: {
    value() {
      return this.modelValue;
    },
    _uid() {
      return this._.uid;
    },
    nextClass() {
      return this.nextElClass.join(" ");
    },
    prevClass() {
      return this.prevElClass.join(" ");
    },
    paginationClass() {
      return this.paginationElClass.join(" ");
    },
    paginationItemClass() {
      return this.paginationItemElClass.join(" ");
    },
    scrollbarClass() {
      return this.scrollbarElClass.join(" ");
    },
    scrollbarShow() {
      return uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.needsScrollbar(this.options);
    }
  },
  created() {
    const {
      params: swiperParams,
      passedParams
    } = uni_modules_zebraUniappSwiperMaster_libs_vue2_getParams.getParams(this.options);
    this.swiperElRef = "swiper";
    this.swiperParams = swiperParams;
    this.oldPassedParamsRef = passedParams;
    this.slidesRef;
    swiperParams.onAny = (event, ...args) => {
      this.$emit(event, {}, ...args.filter((item, index) => {
        return index > 0;
      }));
    };
    Object.assign(swiperParams.on, {
      _containerClasses(swiper, classes) {
        this.containerClasses = classes;
      }
    });
    this.$watch(() => {
      return {
        value: this.value,
        options: this.options
      };
    }, (val) => {
      if (this.swiperParams && this.swiperParams.virtual) {
        if (!this.virtualData && val.options.virtual.slides.length) {
          this.swiperParams.virtual.slides = val.options.virtual.slides;
          const extendWith = {
            cache: false,
            slides: val.options.virtual.slides,
            renderExternal: (data) => {
              this.virtualData = data;
              this.$emit("input", data.slides);
            },
            renderExternalUpdate: false
          };
          uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.extend(this.swiperParams.virtual, extendWith);
          this.loadSwiper();
        }
      }
      if (this.swiperParams && this.swiperParams.loop) {
        if (this.originalDataList.length && this.originalDataList.toString() == val.value.toString()) {
          this.loopUpdateData = true;
        } else {
          this.loopUpdateData = false;
          let slides = uni_modules_zebraUniappSwiperMaster_libs_vue2_loop.renderLoop(this, this.swiperParams, this.value);
          if (this.swiperParams.loop && !this.loopUpdateData && slides.data.toString() != val.value.toString()) {
            this.loopUpdateData = true;
            this.$emit("update:modelValue", slides.data);
            return;
          }
        }
      }
      if (this.swiper && !this.firstLoad) {
        if (this.virtualData) {
          const style = this.swiper.isHorizontal() ? {
            [this.swiper.rtlTranslate ? "right" : "left"]: `${this.virtualData.offset}px`
          } : {
            top: `${this.virtualData.offset}px`
          };
          this.children.map((slide) => {
            slide.css(style);
          });
        }
        this.updateSwiper(val.value, val.options, this.children);
      }
    }, {
      deep: true,
      immediate: true
    });
    this.$watch(() => {
      return this.$data;
    }, (val) => {
      if (this.swiper && this.swiper.native) {
        Object.assign(this.swiper.native, {
          val
        });
      }
    }, {
      deep: true
    });
    this.$watch(() => {
      return this.virtualData;
    }, (val) => {
      if (this.swiper && this.virtualData) {
        uni_modules_zebraUniappSwiperMaster_libs_vue2_virtual.updateOnVirtualData(this.swiper);
      }
    }, {
      deep: true
    });
    common_vendor.index.$on("childrenReady" + this._uid, async (children) => {
      children.dataSwiperSlideIndex = children.index;
      if (this.children.length == this.value.length) {
        Promise.all(this.children.map((item) => {
          return item.getSize();
        })).then((res) => {
          if (this.swiperParams && this.swiperParams.loop) {
            if (this.originalDataList.length && this.originalDataList.toString() == this.value.toString()) {
              if (this.firstLoad) {
                this.loadSwiper();
              }
            } else {
              return;
            }
          } else {
            if (this.firstLoad) {
              this.loadSwiper();
            }
          }
          this.updateSwiper(this.value, this.options, this.children);
        });
      }
    });
  },
  beforeUnmount() {
    if (this.swiper && !this.swiper.destroyed) {
      this.swiper.destroy(true, false);
    }
  },
  methods: {
    loadSwiper() {
      let swiperParams = this.swiperParams;
      this.slidesRef = this.children;
      this.oldSlidesRef = this.slidesRef;
      let swiperRef = uni_modules_zebraUniappSwiperMaster_libs_vue2_initSwiper.initSwiper(swiperParams, __spreadProps(__spreadValues(__spreadValues({}, this.$data), this.$props), {
        swiperElId: "swiper" + this._uid,
        emit: this.emit.bind(this),
        updateData: this.updateData.bind(this),
        getRect: this.getRect.bind(this),
        getRectScrollbar: this.getRectScrollbar.bind(this),
        willChange: this.willChange.bind(this),
        transform: this.transform.bind(this),
        transition: this.transition.bind(this),
        scrollbarTransform: this.scrollbarTransform.bind(this),
        scrollbarTransition: this.scrollbarTransition.bind(this),
        scrollbarItemTransform: this.scrollbarItemTransform.bind(this),
        scrollbarItemTransition: this.scrollbarItemTransition.bind(this),
        addClass: this.addClass.bind(this),
        removeClass: this.removeClass.bind(this),
        addPaginationClass: this.addPaginationClass.bind(this),
        removePaginationClass: this.removePaginationClass.bind(this),
        addScrollbarClass: this.addScrollbarClass.bind(this),
        removeScrollbarClass: this.removeScrollbarClass.bind(this),
        setCss: this.setCss.bind(this),
        css: this.setCss.bind(this),
        paginationCss: this.setPaginationCss.bind(this),
        scrollbarCss: this.scrollbarCss.bind(this),
        scrollbarItemCss: this.scrollbarItemCss.bind(this),
        addNextElClass: this.addNextElClass.bind(this),
        addPrevElClass: this.addPrevElClass.bind(this),
        removeNextElClass: this.removeNextElClass.bind(this),
        removePrevElClass: this.removePrevElClass.bind(this),
        cubeShadowCss: this.cubeShadowCss.bind(this),
        cubeShadowTransform: this.cubeShadowTransform.bind(this),
        cubeShadowTransition: this.cubeShadowTransition.bind(this)
      }));
      this.swiper = swiperRef;
      swiperRef.loopCreate = () => {
      };
      swiperRef.loopDestroy = () => {
      };
      if (swiperParams.loop) {
        swiperRef.loopedSlides = uni_modules_zebraUniappSwiperMaster_libs_vue2_loop.calcLoopedSlides(this.slidesRef, swiperParams);
      }
      if (!this.swiper)
        return;
      uni_modules_zebraUniappSwiperMaster_libs_vue2_initSwiper.mountSwiper({
        el: this.swiperElRef,
        nextEl: this.nextElRef,
        prevEl: this.prevElRef,
        paginationEl: this.paginationElRef,
        scrollbarEl: this.scrollbarElRef,
        swiper: this.swiper
      }, this.swiperParams);
      this.$emit("swiper");
      this.firstLoad = false;
    },
    updateSwiper(value, options, children) {
      this.swiper.slides = children;
      this.slidesRef = children;
      let initializedRef = this.initializedRef;
      let swiperRef = this.swiper;
      let slidesRef = this.slidesRef;
      let oldPassedParamsRef = this.oldPassedParamsRef;
      let oldSlidesRef = this.oldSlidesRef;
      let breakpointChanged = this.breakpointChanged;
      let nextElRef = this.nextElRef;
      let prevElRef = this.prevElRef;
      let paginationElRef = this.paginationElRef;
      let scrollbarElRef = this.scrollbarElRef;
      if (!initializedRef && swiperRef) {
        swiperRef.emitSlidesClasses();
        initializedRef = true;
      }
      const {
        passedParams: newPassedParams
      } = uni_modules_zebraUniappSwiperMaster_libs_vue2_getParams.getParams(options);
      const changedParams = uni_modules_zebraUniappSwiperMaster_libs_vue2_getChangedParams.getChangedParams(newPassedParams, oldPassedParamsRef, slidesRef, oldSlidesRef);
      this.oldPassedParamsRef = newPassedParams;
      this.oldSlidesRef = slidesRef;
      if ((changedParams.length || breakpointChanged) && swiperRef && !swiperRef.destroyed) {
        uni_modules_zebraUniappSwiperMaster_libs_vue2_updateSwiper.updateSwiper({
          swiper: swiperRef,
          slides: slidesRef,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef,
          prevEl: prevElRef,
          scrollbarEl: scrollbarElRef,
          paginationEl: paginationElRef
        });
      }
      breakpointChanged = false;
    },
    emit(event, data) {
      this.$emit(event, ...data);
    },
    async getRect() {
      let rectInfo = await uni_modules_zebraUniappSwiperMaster_libs_utils_utils.getRect(this, ".swiper");
      this.rectInfo = rectInfo;
      return rectInfo;
    },
    async getRectScrollbar() {
      let rectInfo = await uni_modules_zebraUniappSwiperMaster_libs_utils_utils.getRect(this, ".swiper-scrollbar");
      return rectInfo;
    },
    updateData(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this, item, value[item]);
      });
    },
    willChange(value) {
      this.$set(this.wrapperStyle, "will-change", value);
    },
    transform(value) {
      this.wxsTransform = value;
    },
    transition(value) {
      this.$set(this.wrapperStyle, "transition-duration", `${value}ms`);
    },
    setCss(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.wrapperStyle, item, value[item]);
      });
    },
    scrollbarTransform(value) {
      this.$set(this.scrollbarStyle, "transform", value);
    },
    scrollbarTransition(value) {
      this.$set(this.scrollbarStyle, "transitionDuration", `${value}ms`);
    },
    scrollbarItemTransform(value) {
      this.$set(this.scrollbarItemStyle, "transform", value);
    },
    scrollbarItemTransition(value) {
      this.$set(this.scrollbarItemStyle, "transitionDuration", `${value}ms`);
    },
    addClass(value) {
      this.contentClass = Array.from(/* @__PURE__ */ new Set([...this.contentClass, ...value.split(" ")]));
    },
    removeClass(value) {
      this.contentClass = this.contentClass.filter((item) => !value.split(" ").includes(item));
    },
    addPaginationClass(value) {
      this.paginationElClass = Array.from(/* @__PURE__ */ new Set([...this.paginationElClass, ...value.split(" ")]));
    },
    removePaginationClass(value) {
      this.paginationElClass = this.paginationElClass.filter((item) => !value.split(" ").includes(item));
    },
    addScrollbarClass(value) {
      this.scrollbarElClass = Array.from(/* @__PURE__ */ new Set([...this.scrollbarElClass, ...value.split(" ")]));
    },
    removeScrollbarClass(value) {
      this.scrollbarElClass = this.scrollbarElClass.filter((item) => !value.split(" ").includes(item));
    },
    setPaginationCss(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.paginationStyle, item, value[item]);
      });
    },
    scrollbarCss(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.scrollbarStyle, item, value[item]);
      });
    },
    scrollbarItemCss(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.scrollbarItemStyle, item, value[item]);
      });
    },
    addNextElClass(value) {
      this.nextElClass = Array.from(/* @__PURE__ */ new Set([...this.nextElClass, ...value.split(" ")]));
    },
    addPrevElClass(value) {
      this.prevElClass = Array.from(/* @__PURE__ */ new Set([...this.prevElClass, ...value.split(" ")]));
    },
    removeNextElClass(value) {
      this.nextElClass = this.nextElClass.filter((item) => !value.split(" ").includes(item));
    },
    removePrevElClass(value) {
      this.prevElClass = this.prevElClass.filter((item) => !value.split(" ").includes(item));
    },
    setSwiperOn(event, callback) {
      if (!this.eventsListeners[event])
        this.eventsListeners[event] = {};
      this.eventsListeners[event] = callback;
    },
    paginationItemClick(index) {
      this.swiper.emit("paginationItemClick", index);
    },
    prevClick() {
      this.swiper.emit("prevClick");
    },
    nextClick() {
      this.swiper.emit("nextClick");
    },
    onTouchStart(event) {
      this.swiper.onTouchStart(event);
    },
    onTouchStartSwiperWxs(event) {
      this.swiper.onTouchStart(event);
    },
    onTouchMove(event) {
      this.swiper.onTouchMove(event);
    },
    onTouchMoveSwiperWxs(event) {
      this.swiper.onTouchMove(event);
    },
    onTouchEnd(event) {
      this.swiper.onTouchEnd(event);
    },
    onTouchEndSwiperWxs(event) {
      this.swiper.onTouchEnd(event);
    },
    onClickWrapper(event) {
      this.$emit("click", event);
    },
    onClickScrollbar(event) {
      this.$emit("scrollbarClick", event);
    },
    onTouchStartScrollbar(event) {
      this.swiper.emit("touchStartScrollbar", event);
    },
    onTouchMoveScrollbar(event) {
      this.swiper.emit("touchMoveScrollbar", event);
    },
    onTouchEndScrollbar(event) {
      this.swiper.emit("touchEndScrollbar", event);
    },
    cubeShadowCss(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.cubeShadowStyle, item, value[item]);
      });
    },
    cubeShadowTransform(value) {
      this.$set(this.cubeShadowStyle, "transform", value);
    },
    cubeShadowTransition(value) {
      this.$set(this.cubeShadowStyle, "transitionDuration", `${value}ms`);
    }
  }
};
if (!Array) {
  const _easycom_z_swiper_item2 = common_vendor.resolveComponent("z-swiper-item");
  _easycom_z_swiper_item2();
}
const _easycom_z_swiper_item = () => "../z-swiper-item/z-swiper-item.js";
if (!Math) {
  _easycom_z_swiper_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loopBlankShow
  }, $data.loopBlankShow ? {
    b: common_vendor.f($data.loopBlankNumber, (item, index, i0) => {
      return {
        a: index,
        b: "21a177ae-0-" + i0
      };
    })
  } : {}, {
    c: $data.cubeShadowShowWrapper
  }, $data.cubeShadowShowWrapper ? {
    d: common_vendor.s($data.cubeShadowStyle)
  } : {}, {
    e: common_vendor.s($data.wrapperStyle),
    f: common_vendor.o((...args) => $options.onClickWrapper && $options.onClickWrapper(...args)),
    g: $data.wxsTransform,
    h: $data.cubeShadowShowRoot
  }, $data.cubeShadowShowRoot ? {
    i: common_vendor.s($data.cubeShadowStyle)
  } : {}, {
    j: $data.showIndicators
  }, $data.showIndicators ? common_vendor.e({
    k: $data.paginationType == "bullets"
  }, $data.paginationType == "bullets" ? {
    l: common_vendor.f($data.paginationContent, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(item.classContent.join(" ")),
        c: common_vendor.s(item.styleContent),
        d: common_vendor.o(($event) => $options.paginationItemClick(index), index)
      };
    })
  } : {}, {
    m: $data.paginationType == "fraction"
  }, $data.paginationType == "fraction" ? {
    n: common_vendor.t($data.paginationContent.text),
    o: common_vendor.n($data.paginationContent.currentClass),
    p: common_vendor.t($data.paginationContent.total),
    q: common_vendor.n($data.paginationContent.totalClass)
  } : {}, {
    r: $data.paginationType == "progressbar"
  }, $data.paginationType == "progressbar" ? {
    s: common_vendor.n($data.paginationContent.progressbarFillClass),
    t: common_vendor.s($data.paginationContent.styleContent)
  } : {}, {
    v: common_vendor.n($options.paginationClass),
    w: common_vendor.s($data.paginationStyle)
  }) : {}, {
    x: $data.showPrevButton || $data.showPrevButtonSlot
  }, $data.showPrevButton || $data.showPrevButtonSlot ? common_vendor.e({
    y: !$data.showPrevButtonSlot
  }, !$data.showPrevButtonSlot ? {} : {}, {
    z: common_vendor.n($options.prevClass),
    A: common_vendor.o((...args) => $options.prevClick && $options.prevClick(...args))
  }) : {}, {
    B: $data.showNextButton || $data.showNextButtonSlot
  }, $data.showNextButton || $data.showNextButtonSlot ? common_vendor.e({
    C: !$data.showNextButtonSlot
  }, !$data.showNextButtonSlot ? {} : {}, {
    D: common_vendor.n($options.nextClass),
    E: common_vendor.o((...args) => $options.nextClick && $options.nextClick(...args))
  }) : {}, {
    F: $options.scrollbarShow
  }, $options.scrollbarShow ? {
    G: common_vendor.s($data.scrollbarItemStyle),
    H: common_vendor.n($options.scrollbarClass),
    I: common_vendor.s($data.scrollbarStyle),
    J: common_vendor.o((...args) => $options.onClickScrollbar && $options.onClickScrollbar(...args)),
    K: common_vendor.o((...args) => $options.onTouchStartScrollbar && $options.onTouchStartScrollbar(...args)),
    L: common_vendor.o((...args) => $options.onTouchMoveScrollbar && $options.onTouchMoveScrollbar(...args)),
    M: common_vendor.o((...args) => $options.onTouchEndScrollbar && $options.onTouchEndScrollbar(...args))
  } : {}, {
    N: "swiper" + $options._uid,
    O: common_vendor.n($data.contentClass),
    P: common_vendor.n($data.containerClasses),
    Q: common_vendor.n($props.options.direction === "vertical" ? "swiper-vertical" : ""),
    R: common_vendor.s($props.customStyle)
  });
}
if (typeof zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.block0 === "function")
  zSwiperWxs_wxs_vue_type_wxs_index_0_src_name_zSwiperWxs_lang.block0(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-21a177ae"], ["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/uni_modules/zebra-uniapp-swiper-master/components/z-swiper/z-swiper.vue"]]);
wx.createComponent(Component);
