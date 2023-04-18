"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_effectInit = require("../../shared/effect-init.js");
function EffectCube({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  const setTranslate = () => {
    const {
      $el,
      $wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
      browser
    } = swiper;
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    if (params.shadow) {
      if (isHorizontal) {
        if (!swiper.native.cubeShadowShowWrapper) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowWrapper: true
          });
        }
        swiper.$wrapperEl.cubeShadowCss({
          height: `${swiperWidth}px`
        });
      } else {
        if (!swiper.native.cubeShadowShowRoot) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowRoot: true
          });
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides[i];
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(swiper.activeIndex, 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min($slideEl.progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl)
          wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      $slideEl.transform(transform);
      $slideEl.addClass("swiper-slide-cube");
    }
    $wrapperEl.css({
      "-webkit-transform-origin": `50% 50% -${swiperSize / 2}px`,
      "transform-origin": `50% 50% -${swiperSize / 2}px`
    });
    if (params.shadow) {
      if (isHorizontal) {
        swiper.$wrapperEl.cubeShadowTransform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        swiper.$wrapperEl.cubeShadowTransform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
      }
    }
    const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
    $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
  };
  const setTransition = (duration) => {
    const {
      $el,
      slides
    } = swiper;
    for (var i = 0; i < slides.length; i++) {
      slides[i].transition(duration);
    }
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      swiper.$wrapperEl.cubeShadowTransition(duration);
    }
  };
  uni_modules_zebraUniappSwiperMaster_shared_effectInit.effectInit({
    effect: "cube",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}
exports.EffectCube = EffectCube;
