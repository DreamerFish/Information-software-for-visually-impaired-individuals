"use strict";
var uni_modules_zebraUniappSwiperMaster_libs_core = require("./libs/core.js");
var uni_modules_zebraUniappSwiperMaster_modules_autoplay_autoplay = require("./modules/autoplay/autoplay.js");
var uni_modules_zebraUniappSwiperMaster_modules_freeMode_freeMode = require("./modules/free-mode/free-mode.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectFade_effectFade = require("./modules/effect-fade/effect-fade.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectCube_effectCube = require("./modules/effect-cube/effect-cube.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectCoverflow_effectCoverflow = require("./modules/effect-coverflow/effect-coverflow.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectFlip_effectFlip = require("./modules/effect-flip/effect-flip.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectCards_effectCards = require("./modules/effect-cards/effect-cards.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectCreative_effectCreative = require("./modules/effect-creative/effect-creative.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectPanorama_effectPanorama = require("./modules/effect-panorama/effect-panorama.js");
var uni_modules_zebraUniappSwiperMaster_modules_effectCarousel_effectCarousel = require("./modules/effect-carousel/effect-carousel.js");
var uni_modules_zebraUniappSwiperMaster_modules_navigation_navigation = require("./modules/navigation/navigation.js");
var uni_modules_zebraUniappSwiperMaster_modules_pagination_pagination = require("./modules/pagination/pagination.js");
var uni_modules_zebraUniappSwiperMaster_modules_thumbs_thumbs = require("./modules/thumbs/thumbs.js");
var uni_modules_zebraUniappSwiperMaster_modules_scrollbar_scrollbar = require("./modules/scrollbar/scrollbar.js");
var uni_modules_zebraUniappSwiperMaster_modules_virtual_virtual = require("./modules/virtual/virtual.js");
var uni_modules_zebraUniappSwiperMaster_modules_willChange_willChange = require("./modules/will-change/will-change.js");
const modules = [
  uni_modules_zebraUniappSwiperMaster_modules_autoplay_autoplay.Autoplay,
  uni_modules_zebraUniappSwiperMaster_modules_freeMode_freeMode.freeMode,
  uni_modules_zebraUniappSwiperMaster_modules_effectFade_effectFade.EffectFade,
  uni_modules_zebraUniappSwiperMaster_modules_effectCube_effectCube.EffectCube,
  uni_modules_zebraUniappSwiperMaster_modules_effectCoverflow_effectCoverflow.EffectCoverflow,
  uni_modules_zebraUniappSwiperMaster_modules_effectFlip_effectFlip.EffectFlip,
  uni_modules_zebraUniappSwiperMaster_modules_effectCards_effectCards.EffectCards,
  uni_modules_zebraUniappSwiperMaster_modules_effectCreative_effectCreative.EffectCreative,
  uni_modules_zebraUniappSwiperMaster_modules_effectPanorama_effectPanorama.Panorama,
  uni_modules_zebraUniappSwiperMaster_modules_effectCarousel_effectCarousel.EffectCarousel,
  uni_modules_zebraUniappSwiperMaster_modules_navigation_navigation.Navigation,
  uni_modules_zebraUniappSwiperMaster_modules_pagination_pagination.Pagination,
  uni_modules_zebraUniappSwiperMaster_modules_thumbs_thumbs.Thumb,
  uni_modules_zebraUniappSwiperMaster_modules_scrollbar_scrollbar.Scrollbar,
  uni_modules_zebraUniappSwiperMaster_modules_willChange_willChange.WillChange,
  uni_modules_zebraUniappSwiperMaster_modules_virtual_virtual.Virtual
];
uni_modules_zebraUniappSwiperMaster_libs_core.Swiper.use(modules);
