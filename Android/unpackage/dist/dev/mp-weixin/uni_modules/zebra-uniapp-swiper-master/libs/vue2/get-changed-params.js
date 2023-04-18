"use strict";
var uni_modules_zebraUniappSwiperMaster_libs_vue2_paramsList = require("./params-list.js");
var uni_modules_zebraUniappSwiperMaster_libs_vue2_utils = require("./utils.js");
function getChangedParams(swiperParams, oldParams, children, oldChildren) {
  const keys = [];
  if (!oldParams)
    return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0)
      keys.push(key);
  };
  const oldChildrenKeys = oldChildren.map((child) => child.props && child.props.key);
  const childrenKeys = children.map((child) => child.props && child.props.key);
  if (oldChildrenKeys.join("") !== childrenKeys.join(""))
    keys.push("children");
  if (oldChildren.length !== children.length)
    keys.push("children");
  const watchParams = uni_modules_zebraUniappSwiperMaster_libs_vue2_paramsList.paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, ""));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      if (uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.isObject(swiperParams[key]) && uni_modules_zebraUniappSwiperMaster_libs_vue2_utils.isObject(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey])
              addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    } else if (key in swiperParams && !(key in oldParams)) {
      addKey(key);
    } else if (!(key in swiperParams) && key in oldParams) {
      addKey(key);
    }
  });
  return keys;
}
exports.getChangedParams = getChangedParams;
