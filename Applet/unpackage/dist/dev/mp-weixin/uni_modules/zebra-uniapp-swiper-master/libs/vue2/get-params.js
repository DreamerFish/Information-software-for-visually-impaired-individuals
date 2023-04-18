"use strict";
require("../../index.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_utils = require("./utils.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_paramsList = require("./params-list.js");
var uni_modules_zebraUniappSwiperMaster_libs_core = require("../core.js");
function getParams(obj = {}) {
  const params = {
    on: {}
  };
  const passedParams = {};
  uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.extend(params, uni_modules_zebraUniappSwiperMaster_libs_core.Swiper.defaults);
  uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.extend(params, uni_modules_zebraUniappSwiperMaster_libs_core.Swiper.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = uni_modules_zebraUniappSwiperMaster_libs_vue2_paramsList.paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined")
      return;
    if (allowedParams.indexOf(key) >= 0) {
      if (uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.extend(params[key], obj[key]);
        uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest
  };
}
exports.getParams = getParams;
