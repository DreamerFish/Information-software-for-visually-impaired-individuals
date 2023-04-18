"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
var uni_modules_zebraUniappSwiperMaster_shared_effectTarget = require("../../shared/effect-target.js");
function EffectCoverflow({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
      transformEl: null
    }
  });
  const setTranslate = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides[i];
      const slideSize = slidesSizesGrid[i];
      const slideOffset = $slideEl.swiperSlideOffset;
      const offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      let translateZ = -translate * Math.abs(offsetMultiplier);
      let stretch = params.stretch;
      if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
      if (Math.abs(translateX) < 1e-3)
        translateX = 0;
      if (Math.abs(translateY) < 1e-3)
        translateY = 0;
      if (Math.abs(translateZ) < 1e-3)
        translateZ = 0;
      if (Math.abs(rotateY) < 1e-3)
        rotateY = 0;
      if (Math.abs(rotateX) < 1e-3)
        rotateX = 0;
      if (Math.abs(scale) < 1e-3)
        scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      const $targetEl = uni_modules_zebraUniappSwiperMaster_shared_effectTarget.effectTarget(params, $slideEl);
      $targetEl.transform(slideTransform);
      $slideEl.css({
        zIndex: -Math.abs(Math.round(offsetMultiplier)) + 1
      });
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      $slideEl.addClass("swiper-slide-coverflow");
    }
  };
  const setTransition = (duration) => {
    const {
      transformEl
    } = swiper.params.coverflowEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i++) {
      $transitionElements[i].transition(duration);
    }
  };
  uni_modules_zebraUniappSwiperMaster_shared_effectInit.effectInit({
    effect: "coverflow",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}
exports.EffectCoverflow = EffectCoverflow;
