"use strict";
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "$el" : "$wrapperEl"].setCss({
    cursor: ""
  });
}
exports.unsetGrabCursor = unsetGrabCursor;
