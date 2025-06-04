function scrollCarousel(carouselId, direction) {
  const scroller = document.getElementById(`carouselScroller-${carouselId}`);

  if (!scroller) return;

  const scrollAmount = scroller.clientWidth * 0.9;
  scroller.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  });
}
