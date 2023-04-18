"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectTarget = require("../../shared/effect-target.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectVirtualTransitionEnd = require("../../shared/effect-virtual-transition-end.js");
function EffectCards({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cardsEffect: {
      slideShadows: true,
      transformEl: null,
      rotate: true
    }
  });
  const setTranslate = () => {
    const {
      slides,
      activeIndex
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides[i];
      const slideProgress = $slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = $slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides.swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -2 * progress;
      let tXAdd = 8 - Math.abs(progress) * 0.75;
      const isSwipeToNext = (i === activeIndex || i === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (i === activeIndex || i === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }
      if (progress < 0) {
        tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }
      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
      const transform = `translate3d(${tX}, ${tY}, ${tZ}px) rotateZ(${params.rotate ? rotate : 0}deg) scale(${scaleString})`;
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      const $targetEl = uni_modules_zebraUniappSwiperMaster_shared_effectTarget.effectTarget(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass("swiper-slide-cards");
    }
  };
  const setTransition = (duration) => {
    const {
      transformEl
    } = swiper.params.cardsEffect;
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
    effect: "cards",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
exports.EffectCards = EffectCards;
