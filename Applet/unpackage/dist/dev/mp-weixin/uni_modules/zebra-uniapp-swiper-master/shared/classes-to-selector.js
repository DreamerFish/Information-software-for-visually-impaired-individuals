"use strict";
function classesToSelector(classes = "") {
  return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
}
exports.classesToSelector = classesToSelector;
