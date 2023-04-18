"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_utils = require("../../shared/utils.js");
function onTouchStart(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  data.isTouchEvent = e.type === "touchstart" || e.type === "touchStart";
  if (!data.isTouchEvent && "which" in e && e.which === 3)
    return;
  if (!data.isTouchEvent && "button" in e && e.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  !!params.noSwipingClass && params.noSwipingClass !== "";
  params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  !!(e.target && e.target.shadowRoot);
  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0])
      return;
  }
  touches.currentX = e.type === "touchstart" || e.type === "touchStart" ? e.touches[0].pageX : e.pageX;
  touches.currentY = e.type === "touchstart" || e.type === "touchStart" ? e.touches[0].pageY : e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = uni_modules_zebraUniappSwiperMaster_shared_utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  swiper.emit("touch-start", e);
}
exports.onTouchStart = onTouchStart;
