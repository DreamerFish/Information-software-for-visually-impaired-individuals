"use strict";
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock"
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };
  function toggleEl($el, disabled) {
    if (!swiper.$wrapperEl)
      return;
    const params = swiper.params.navigation;
    if ($el) {
      swiper.$wrapperEl[disabled ? `add${$el}` : `remove${$el}`](params.disabledClass);
      if (swiper.params.watchOverflow && swiper.enabled) {
        swiper.$wrapperEl[swiper.isLocked ? `add${$el}` : `remove${$el}`](params.lockClass);
      }
    }
  }
  function update() {
    if (swiper.params.loop)
      return;
    swiper.navigation;
    toggleEl("PrevElClass", swiper.isBeginning && !swiper.params.rewind);
    toggleEl("NextElClass", swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
  }
  function onNextClick() {
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slideNext();
  }
  function init() {
    const params = swiper.params.navigation;
    if (params.slot || params.custom) {
      params.nextEl = true;
      params.prevEl = true;
    }
    if (!(params.nextEl || params.prevEl) && !params.slot && !params.custom)
      return;
    if (params.slot) {
      swiper.native.updateData({
        showPrevButtonSlot: true,
        showNextButtonSlot: true
      });
    } else if (params.custom)
      ;
    else {
      swiper.native.updateData({
        showPrevButton: true,
        showNextButton: true
      });
    }
    const $nextEl = params.nextEl;
    const $prevEl = params.prevEl;
    if ($nextEl) {
      swiper.on("nextClick", onNextClick);
    }
    if ($prevEl) {
      swiper.on("prevClick", onPrevClick);
    }
    Object.assign(swiper.navigation, {
      $nextEl,
      nextEl: $nextEl,
      $prevEl,
      prevEl: $prevEl
    });
    if (!swiper.enabled) {
      if ($nextEl)
        swiper.$wrapperEl.addNextElClass(params.lockClass);
      if ($prevEl)
        swiper.$wrapperEl.addPrevElClass(params.lockClass);
    }
  }
  function destroy() {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    if ($nextEl) {
      swiper.off("nextClick", onNextClick);
      swiper.$wrapperEl.removeNextElClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl) {
      swiper.off("prevClick", onPrevClick);
      swiper.$wrapperEl.removePrevElClass(swiper.params.navigation.disabledClass);
    }
  }
  on("init", () => {
    init();
    update();
  });
  on("toEdge fromEdge lock unlock", () => {
    update();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    if ($nextEl) {
      swiper.$wrapperEl[swiper.enabled ? "removeNextElClass" : "addNextElClass"](swiper.params.navigation.lockClass);
    }
    if ($prevEl) {
      swiper.$wrapperEl[swiper.enabled ? "removePrevElClass" : "addPrevElClass"](swiper.params.navigation.lockClass);
    }
  });
  Object.assign(swiper.navigation, {
    update,
    init,
    destroy
  });
}
exports.Navigation = Navigation;
