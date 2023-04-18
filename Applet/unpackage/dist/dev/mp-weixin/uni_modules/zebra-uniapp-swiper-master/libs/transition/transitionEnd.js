"use strict";
var uni_modules_zebraUniappSwiperMaster_libs_transition_transitionEmit = require("./transitionEmit.js");
function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode)
    return;
  swiper.setTransition(0);
  uni_modules_zebraUniappSwiperMaster_libs_transition_transitionEmit.transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
exports.transitionEnd = transitionEnd;
