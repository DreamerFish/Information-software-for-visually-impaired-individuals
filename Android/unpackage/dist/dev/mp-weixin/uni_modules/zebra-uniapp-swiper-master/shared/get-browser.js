"use strict";
var common_vendor = require("../../../common/vendor.js");
let browser;
function calcBrowser() {
  function isSafari() {
    const res = common_vendor.index.getSystemInfoSync();
    return res.model;
  }
  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(isSafari())
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
exports.getBrowser = getBrowser;
