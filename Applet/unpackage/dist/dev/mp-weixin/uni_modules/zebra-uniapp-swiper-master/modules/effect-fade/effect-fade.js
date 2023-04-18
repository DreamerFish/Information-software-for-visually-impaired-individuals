"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectTarget = require("../../shared/effect-target.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd = require("../../shared/effect-virtual-transition-end.js");
function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null
    }
  });
  const setTranslate = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = swiper.slides[i];
      const offset = $slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate)
        tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl.progress), 0) : 1 + Math.min(Math.max($slideEl.progress, -1), 0);
      const $targetEl = uni_modules_zebraUniappSwiperMaster_shared_effectTarget.effectTarget(params, $slideEl);
      $targetEl.css({
        opacity: slideOpacity
      });
      $targetEl.transform(`translate3d(${tx}px, ${ty}px, 0px)`);
      if (swiper.params.willChange) {
        $targetEl.willChange("opacity");
      }
      slides[i].addClass("swiper-slide-fade");
    }
  };
  const setTransition = (duration) => {
    const {
      transformEl
    } = swiper.params.fadeEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (let i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd.effectVirtualTransitionEnd({
      swiper,
      duration,
      transformEl,
      allSlides: true
    });
  };
  uni_modules_zebraUniappSwiperMaster_shared_effectInit.effectInit({
    effect: "fade",
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
exports.EffectFade = EffectFade;
