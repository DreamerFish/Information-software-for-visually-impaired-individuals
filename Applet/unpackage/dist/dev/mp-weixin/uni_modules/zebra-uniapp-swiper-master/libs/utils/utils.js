"use strict";
var common_vendor = require("../../../../common/vendor.js");
function getRect(context, selector) {
  return new Promise((resolve) => {
    common_vendor.index.createSelectorQuery().in(context).select(selector).boundingClientRect().exec((rect = []) => resolve(rect[0]));
  });
}
exports.getRect = getRect;
