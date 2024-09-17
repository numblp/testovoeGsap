import './style.css'
import gsap from 'gsap'

const intro = gsap.timeline()
    .from('.samsung', {x: -200, autoAlpha: 0, duration: 1})
    .to ('.samsung', {margin: 0, duration: 1})
    .from('.string1', {x: -600, autoAlpha: 0, duration: 0.7}, '>' )
    .from('.string2', {x: -600, autoAlpha: 0, duration: 0.7}, '-=0.3')
    .from('.string3', {x: -600, autoAlpha: 0, duration: 0.7}, '-=0.3')
    .from('.slidingBG', {x: -1000, autoAlpha: 0, duration: 1})
    .to('.mainString', {marginTop: 120, duration: 1}, '<')
    .to('.mainStringMargin', {marginTop: 60, duration: 1}, '<')
    .to('.mainBG', {scale: 1.1,  duration: 1}, "<")
    .from('.button', {opacity: 0, duration: 1},)
    .from('.slider', {opacity: 0, duration: 1}, '<+0.5')
    .to('.seeSite', {color: '#000', duration: 1}, '<')
    
    const pulsing = gsap.timeline().to(".pulse", {scale: 0.8, duration: 1.5, yoyo: true, repeat: -1});
    document.querySelector('.pulse').addEventListener("mouseenter", () => {
      pulsing.pause();
      gsap.to(".button", {scale: 1.1,})
     });
    document.querySelector('.pulse').addEventListener("mouseleave", () => {gsap.to(".button", {scale: 1})});


const container = document.querySelector('.container');
const tabletContainer = document.querySelector('.tabletcontainer');
const slides = container.querySelectorAll('.slide');
const tabletSlides = tabletContainer.querySelectorAll('.slide');
const nextButton = container.querySelector('.next');
const prevButton = container.querySelector('.prev');
const tabletNextButton = tabletContainer.querySelector('.next');
const tabletPrevButton = tabletContainer.querySelector('.prev');

// Elemets gallary and slider
const counter = document.querySelectorAll('.counter');
const galleryImages = document.querySelectorAll('.image-gallery img');
const galleryImagesTablet = document.querySelectorAll('.image-galleryTablet img');
const gallery = document.querySelector('.image-gallery');
const galleryTablet = document.querySelector('.image-galleryTablet');
let currentIndex = 0;
let galleryShown = false;
let autoSlideInterval;

// Updating the counter and synchronizing the active gallery image
function updateCounterAndGallery(slidesArray) {
  counter.forEach(counter => {counter.textContent = `${currentIndex + 1}/${slidesArray.length}`});

  galleryImages.forEach((img, index) => {
    img.classList.toggle('active-img', index === currentIndex);
  });

  galleryImagesTablet.forEach((img, index) => {
    img.classList.toggle('active-img', index === currentIndex);
  });
}

// Show the desired slide
function showSlide(slidesArray, index) {
  slidesArray.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    gsap.fromTo('.active', { x: 20, duration: 0.5}, {x: 0, duration: 0.5});
  });
  updateCounterAndGallery(slidesArray);
}

// Show gallery with animation
function showGallery() {
  if (!galleryShown) {
    gsap.to(gallery, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.8,
    });

    gsap.to(galleryTablet, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.8,
    });

    galleryShown = true;
  }
}

// Auto switch slides
function startAutoSlide(slidesArray) {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slidesArray.length;
    showSlide(slidesArray, currentIndex);
    showGallery();
  }, 7000);
}

// With a delay before starting the autoslide
function startAutoSlideWithDelay(slidesArray, delay) {
  // setTimeout(() => {
  //   startAutoSlide(slidesArray);
  // }, delay);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function animateButton(button) {
  gsap.fromTo(button, 
    { scale: 1 },
    { 
      scale: 0.6,
      duration: 0.3,
      onComplete: () => {
        gsap.to(button, { 
          scale: 1,
          duration: 0.3, 
        });
      }
    }
  );
}

// Add listebers for control sliders in each contaner
function addListeners(slidesArray, nextButton, prevButton) {
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slidesArray.length;
    showSlide(slidesArray, currentIndex);
    showGallery();
    startAutoSlide(slidesArray);
    animateButton(nextButton);
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slidesArray.length) % slidesArray.length;
    showSlide(slidesArray, currentIndex);
    showGallery();
    startAutoSlide(slidesArray); 
    animateButton(prevButton);
  });

  // Stop auto show when hover arrows
  nextButton.addEventListener('mouseenter', stopAutoSlide);
  prevButton.addEventListener('mouseenter', stopAutoSlide);

  // Resume auto show when mouse leaves arrows keys
  nextButton.addEventListener('mouseleave', () => startAutoSlide(slidesArray));
  prevButton.addEventListener('mouseleave', () => startAutoSlide(slidesArray));
}

// Initializing sliders for each container
addListeners(slides, nextButton, prevButton);
addListeners(tabletSlides, tabletNextButton, tabletPrevButton);

// Start auto show with delay
startAutoSlideWithDelay(slides, 7000);
startAutoSlideWithDelay(tabletSlides, 7000);