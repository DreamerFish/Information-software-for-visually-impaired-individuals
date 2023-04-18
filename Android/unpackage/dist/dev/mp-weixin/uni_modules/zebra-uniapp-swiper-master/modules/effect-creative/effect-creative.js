"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectTarget = require("../../shared/effect-target.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd = require("../../shared/effect-virtual-transition-end.js");
function EffectCreative({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const getTranslateValue = (value) => {
    if (typeof value === "string")
      return value;
    return `${value}px`;
  };
  const setTranslate = () => {
    const {
      slides,
      $wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;
    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides[i];
      const slideProgress = $slideEl.progress;
      const progress = Math.min(Math.max($slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max($slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      const offset = $slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
      } else if (progress > 0) {
        data = params.prev;
      }
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      });
      r.forEach((value, index) => {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      const translateString = t.join(", ");
      const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
      const $targetEl = uni_modules_zebraUniappSwiperMaster_shared_effectTarget.effectTarget(params, $slideEl);
      $targetEl.transform(transform);
      $targetEl.css({
        opacity: opacityString
      });
      if (data.origin) {
        $targetEl.css({
          "transform-origin": data.origin
        });
      }
      if (swiper.params.willChange) {
        slides[i].willChange("transform,opacity");
      }
      slides[i].addClass("swiper-slide-creative");
    }
  };
  const setTransition = (duration) => {
    const {
      transformEl
    } = swiper.params.creativeEffect;
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
    effect: "creative",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
exports.EffectCreative = EffectCreative;
