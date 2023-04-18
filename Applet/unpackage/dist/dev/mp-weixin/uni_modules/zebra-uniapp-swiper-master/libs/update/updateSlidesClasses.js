"use strict";
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    $wrapperEl,
    activeIndex,
    realIndex
  } = swiper;
  if (!slides.length || !$wrapperEl)
    return;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  for (var i = 0; i < slides.length; i++) {
    slides[i].removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
  }
  let activeSlide;
  if (isVirtual) {
    activeSlide = slides[slides.findIndex((item) => {
      return item.dataSwiperSlideIndex == activeIndex;
    })];
  } else {
    activeSlide = slides[activeIndex];
  }
  if (!activeSlide)
    return;
  activeSlide.addClass(params.slideActiveClass);
  if (params.loop) {
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      let index = slides.findIndex((item) => {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateActiveClass);
    } else {
      let index = slides.findIndex((item) => {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateActiveClass);
    }
  }
  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`)[0];
  if (nextSlide) {
    nextSlide.addClass(params.slideNextClass);
  } else {
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
      nextSlide.addClass(params.slideNextClass);
    }
  }
  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`)[0];
  if (prevSlide) {
    prevSlide.addClass(params.slidePrevClass);
  } else {
    if (params.loop && !prevSlide) {
      prevSlide = slides[slides.length - 1];
      prevSlide.addClass(params.slidePrevClass);
    }
  }
  if (params.loop) {
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      let index = slides.findIndex((item) => {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateNextClass);
    } else {
      let index = slides.findIndex((item) => {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      let index = slides.findIndex((item) => {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicatePrevClass);
    } else {
      let index = slides.findIndex((item) => {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
exports.updateSlidesClasses = updateSlidesClasses;
