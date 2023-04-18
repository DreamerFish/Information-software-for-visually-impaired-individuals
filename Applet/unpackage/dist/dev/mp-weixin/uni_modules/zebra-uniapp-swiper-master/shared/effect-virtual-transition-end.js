"use strict";
function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformEl,
  allSlides
}) {
  const {
    slides,
    activeIndex,
    $wrapperEl
  } = swiper;
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let $transitionEndTarget;
    if (allSlides) {
      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
    } else {
      $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides[activeIndex];
    }
    for (let i = 0; i < $transitionEndTarget.length; i += 1) {
      $transitionEndTarget[i].transitionEnd(() => {
        if (eventTriggered)
          return;
        if (!swiper || swiper.destroyed)
          return;
        eventTriggered = true;
        swiper.animating = false;
        swiper.emit("transitionEnd");
      }, duration);
    }
  }
}
exports.effectVirtualTransitionEnd = effectVirtualTransitionEnd;
