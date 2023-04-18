"use strict";
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.$wrapperEl)
    return;
  if (!swiper.params.cssMode) {
    swiper.$wrapperEl.transition(duration);
  }
  swiper.emit("setTransition", duration, byController);
}
exports.setTransition = setTransition;
