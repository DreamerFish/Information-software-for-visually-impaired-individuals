"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectTarget = require("../../shared/effect-target.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd = require("../../shared/effect-virtual-transition-end.js");
function EffectFlip({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null
    }
  });
  const setTranslate = () => {
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.flipEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides[i];
      let progress = $slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl.progress, 1), -1);
      }
      const offset = $slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      $slideEl.css({
        zIndex: -Math.abs(Math.round(progress)) + slides.length
      });
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const $targetEl = uni_modules_zebraUniappSwiperMaster_shared_effectTarget.effectTarget(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass("swiper-slide-flip");
    }
  };
  const setTransition = (duration) => {
    const {
      transformEl
    } = swiper.params.flipEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (let i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd.effectVirtualTransitionEnd({
      swiper,
      duration,
      transformEl
    });
  };
  uni_modules_zebraUniappSwiperMaster_shared_effectInit.effectInit({
    effect: "flip",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
exports.EffectFlip = EffectFlip;
