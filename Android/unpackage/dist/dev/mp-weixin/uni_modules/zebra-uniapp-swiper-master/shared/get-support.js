"use strict";
let support;
function calcSupport() {
  return {
    smoothScroll: true,
    touch: true,
    passiveListener: function checkPassiveListener() {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, "passive", {
          get() {
            supportsPassive = true;
          }
        });
      } catch (e) {
      }
      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return false;
    }()
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
exports.getSupport = getSupport;
