"use strict";
var block0 = (Component) => {
  if (!Component.wxsCallMethods) {
    Component.wxsCallMethods = [];
  }
  Component.wxsCallMethods.push("onTouchStartSwiperWxs", "onTouchMoveSwiperWxs", "onTouchEndSwiperWxs");
};
exports.block0 = block0;
