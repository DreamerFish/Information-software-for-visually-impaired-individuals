"use strict";
require("../../index.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_utils = require("./utils.js");
var uni_modules_zebraUniappSwiperMaster_libs_core = require("../core.js");
function initSwiper(swiperParams, native) {
  return new uni_modules_zebraUniappSwiperMaster_libs_core.Swiper(swiperParams, native);
}
function mountSwiper({
  el,
  nextEl,
  prevEl,
  paginationEl,
  scrollbarEl,
  swiper
}, swiperParams) {
  if (uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}
exports.initSwiper = initSwiper;
exports.mountSwiper = mountSwiper;
