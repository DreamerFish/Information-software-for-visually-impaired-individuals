"use strict";
var uni_modules_zebraUniappSwiperMaster_shared_utils = require("../../shared/utils.js");
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    $wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  let currentTranslate = uni_modules_zebraUniappSwiperMaster_shared_utils.getTranslate(swiper, axis);
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
exports.getSwiperTranslate = getSwiperTranslate;
