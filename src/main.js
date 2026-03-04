import './style.css'

// Sticky Navigation Scroll Behavior
let lastScrollTop = 0;
const stickyNav = document.getElementById('sticky-nav');
const heroSection = document.querySelector('.h-screen');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroHeight = heroSection ? heroSection.offsetHeight : 0;
  
  // Only show sticky nav when scrolled past hero section
  if (scrollTop > heroHeight) {
    // Scrolling up - show nav
    if (scrollTop < lastScrollTop) {
      stickyNav.classList.remove('-translate-y-full');
      stickyNav.classList.add('translate-y-0');
    } 
    // Scrolling down - hide nav
    else {
      stickyNav.classList.remove('translate-y-0');
      stickyNav.classList.add('-translate-y-full');
    }
  } else {
    // Hide nav when in hero section
    stickyNav.classList.add('-translate-y-full');
    stickyNav.classList.remove('translate-y-0');
  }
  
  lastScrollTop = scrollTop;
});

// Carousel functionality with infinite loop
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-arrow');
  const nextBtn = document.getElementById('next-arrow');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const totalSlides = 6;
  const slideWidth = 252; // 252px per image
  const gap = 64; // 64px gap between images
  const slideStep = slideWidth + gap; // Total distance to move per slide
  let autoPlayInterval;
  let isTransitioning = false;

  // Function to move to a specific slide
  function goToSlide(index, smooth = true) {
    if (smooth) {
      track.style.transition = 'transform 500ms ease-in-out';
    } else {
      track.style.transition = 'none';
    }
    
    currentIndex = index;
    const offset = -(currentIndex * slideStep);
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots (only for original 6 slides)
    const dotIndex = currentIndex % totalSlides;
    dots.forEach((dot, i) => {
      if (i === dotIndex) {
        dot.classList.add('bg-white');
        dot.classList.remove('bg-white/50');
      } else {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/50');
      }
    });
  }

  // Next slide with infinite loop
  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex++;
    goToSlide(currentIndex, true);
    
    // Reset to first slide when reaching the duplicate
    if (currentIndex === totalSlides) {
      setTimeout(() => {
        goToSlide(0, false);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  // Previous slide with infinite loop
  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    if (currentIndex === 0) {
      // Jump to duplicate set without animation
      goToSlide(totalSlides, false);
      setTimeout(() => {
        currentIndex = totalSlides - 1;
        goToSlide(currentIndex, true);
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }, 20);
    } else {
      currentIndex--;
      goToSlide(currentIndex, true);
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners for buttons
  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(index);
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
      startAutoPlay();
    });
  });

  // Start auto-play on page load
  startAutoPlay();

  // Pause auto-play on hover
  track.parentElement.addEventListener('mouseenter', stopAutoPlay);
  track.parentElement.addEventListener('mouseleave', startAutoPlay);
});

// Events & Shows carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const eventsPrevBtn = document.getElementById('events-prev-arrow');
  const eventsNextBtn = document.getElementById('events-next-arrow');
  const eventsTrack = document.getElementById('events-track');
  const eventsImages = eventsTrack ? eventsTrack.querySelectorAll('img') : [];
  const eventsDotsContainer = eventsTrack ? eventsTrack.parentElement.nextElementSibling : null;
  const eventsDots = eventsDotsContainer ? eventsDotsContainer.querySelectorAll('.dot') : [];
  
  let currentEventSlide = 0;
  const totalEventSlides = 3;
  let eventAutoPlayInterval;

  function showEventSlide(index) {
    currentEventSlide = index % totalEventSlides;
    
    // Update image opacity
    eventsImages.forEach((img, i) => {
      if (i === currentEventSlide) {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
      } else {
        img.classList.remove('opacity-100');
        img.classList.add('opacity-0');
      }
    });
    
    // Update dots
    eventsDots.forEach((dot, i) => {
      if (i === currentEventSlide) {
        dot.classList.add('bg-white');
        dot.classList.remove('bg-white/50');
      } else {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/50');
      }
    });
  }

  function nextEventSlide() {
    showEventSlide(currentEventSlide + 1);
  }

  function prevEventSlide() {
    showEventSlide(currentEventSlide - 1 < 0 ? totalEventSlides - 1 : currentEventSlide - 1);
  }

  function startEventAutoPlay() {
    eventAutoPlayInterval = setInterval(nextEventSlide, 4000);
  }

  function stopEventAutoPlay() {
    clearInterval(eventAutoPlayInterval);
  }

  // Event listeners for Events & Shows buttons
  if (eventsNextBtn) {
    eventsNextBtn.addEventListener('click', () => {
      stopEventAutoPlay();
      nextEventSlide();
      startEventAutoPlay();
    });
  }

  if (eventsPrevBtn) {
    eventsPrevBtn.addEventListener('click', () => {
      stopEventAutoPlay();
      prevEventSlide();
      startEventAutoPlay();
    });
  }

  // Event listeners for Events & Shows dots
  eventsDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopEventAutoPlay();
      showEventSlide(index);
      startEventAutoPlay();
    });
  });

  // Start auto-play
  startEventAutoPlay();

  // Pause on hover
  if (eventsTrack) {
    eventsTrack.addEventListener('mouseenter', stopEventAutoPlay);
    eventsTrack.addEventListener('mouseleave', startEventAutoPlay);
  }
});