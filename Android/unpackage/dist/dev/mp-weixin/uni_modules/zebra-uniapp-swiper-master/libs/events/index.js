"use strict";
var uni_modules_zebraUniappSwiperMaster_libs_events_onTouchStart = require("./onTouchStart.js");
var uni_modules_zebraUniappSwiperMaster_libs_events_onTouchMove = require("./onTouchMove.js");
var uni_modules_zebraUniappSwiperMaster_libs_events_onTouchEnd = require("./onTouchEnd.js");
var uni_modules_zebraUniappSwiperMaster_libs_events_onClick = require("./onClick.js");
var uni_modules_zebraUniappSwiperMaster_libs_events_onScroll = require("./onScroll.js");
const events = (swiper, method) => {
  const {
    params,
    touchEvents,
    wrapperEl,
    device,
    support
  } = swiper;
  swiper.native;
  const capture = !!params.nested;
  if (!support.touch) {
    let desktopMethod = method === "on" ? "addEventListener" : "removeEventListener";
    if (document.querySelector(`#${swiper.$el.swiperElId}`)) {
      document.querySelector(`#${swiper.$el.swiperElId}`)[desktopMethod](touchEvents.start, swiper.onTouchStart, false);
    }
    document[desktopMethod](touchEvents.move, swiper.onTouchMove, capture);
    document[desktopMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    touchEvents.start === "touchstart" && support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (touchEvents.cancel)
      ;
  }
  if (params.preventClicks || params.preventClicksPropagation)
    ;
  if (params.cssMode)
    ;
  if (params.updateOnWindowResize)
    ;
};
function attachEvents() {
  const swiper = this;
  const {
    params,
    support
  } = swiper;
  swiper.onTouchStart = uni_modules_zebraUniappSwiperMaster_libs_events_onTouchStart.onTouchStart.bind(swiper);
  swiper.onTouchMove = uni_modules_zebraUniappSwiperMaster_libs_events_onTouchMove.onTouchMove.bind(swiper);
  swiper.onTouchEnd = uni_modules_zebraUniappSwiperMaster_libs_events_onTouchEnd.onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = uni_modules_zebraUniappSwiperMaster_libs_events_onScroll.onScroll.bind(swiper);
  }
  swiper.onClick = uni_modules_zebraUniappSwiperMaster_libs_events_onClick.onClick.bind(swiper);
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
exports.events = events$1;
