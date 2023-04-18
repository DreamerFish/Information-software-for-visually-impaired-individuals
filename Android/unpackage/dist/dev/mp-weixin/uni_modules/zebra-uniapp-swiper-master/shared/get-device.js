"use strict";
var common_vendor = require("../../../common/vendor.js");
var uni_modules_zebraUniappSwiperMaster_shared_getSupport = require("./get-support.js");
let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  uni_modules_zebraUniappSwiperMaster_shared_getSupport.getSupport();
  const device = {
    ios: false,
    android: false
  };
  const res = common_vendor.index.getSystemInfoSync();
  if (res.platform == "android") {
    device.os = "android";
    device.android = true;
  }
  if (res.platform == "ios") {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
exports.getDevice = getDevice;
