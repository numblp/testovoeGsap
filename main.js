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


// const slides = document.querySelectorAll('.slide');
// const nextButton = document.querySelector('.next');
// const prevButton = document.querySelector('.prev');
// const counter = document.querySelector('.counter');
// const galleryImages = document.querySelectorAll('.image-gallery img');
// const gallery = document.querySelector('.image-gallery');
// let currentIndex = 0;
// let galleryShown = false;
// let autoSlideInterval;

// // Обновление счетчика и синхронизация активного изображения галереи
// function updateCounterAndGallery() {
//   counter.textContent = `${currentIndex + 1}/${slides.length}`;
//   galleryImages.forEach((img, index) => {
//     img.classList.toggle('active', index === currentIndex);
//   });
// }

// // Показ нужного слайда
// function showSlide(index) {
//   slides.forEach((slide, i) => {
//     slide.classList.toggle('active', i === index);
//     gsap.fromTo('.active', { x: 20, duration: 0.5}, {x: 0, duration: 0.5});
//   });
//   updateCounterAndGallery();
// }

// // Показ галереи с анимацией
// function showGallery() {
//   if (!galleryShown) {
//     gsap.to(gallery, {
//       opacity: 1,
//       visibility: 'visible',
//       duration: 0.8,
//       ease: "power2.inOut"
//     });
//     galleryShown = true;
//   }
// }

// // Автоматическое переключение слайдов через каждые 5 секунд
// function startAutoSlide() {
//   stopAutoSlide(); // Останавливаем любой предыдущий интервал
//   // clearInterval(autoSlideInterval);
//   autoSlideInterval = setInterval(() => {
//     currentIndex = (currentIndex + 1) % slides.length;
//     showSlide(currentIndex);
//     showGallery(); // Показываем галерею при автоматическом переключении
//   }, 5000);
// }

// function startAutoSlideWithDelay(delay) {
//   setTimeout(() => {
//     startAutoSlide();
//   }, delay); // Задержка перед запуском автослайда
// }
// startAutoSlideWithDelay(5000);

// // Останавливаем автоматическую смену
// function stopAutoSlide() {
//   clearInterval(autoSlideInterval);
// }

// // Control buttons "Next" и "Prev"

// function animateButton(button) {
//   gsap.fromTo(button, 
//     { scale: 1 },
//     { 
//       scale: 0.6,
//       duration: 0.3,
//       ease: "power2.out",
//       onComplete: () => {
//         gsap.to(button, { 
//           scale: 1,
//           duration: 0.3, 
//           ease: "power2.out"
//         });
//       }
//     }
//   );
// }

// function addListeners() {
//   nextButton.addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % slides.length;
//     showSlide(currentIndex);
//     showGallery();
//     startAutoSlide();
//     animateButton(nextButton);
//   });
  
//   prevButton.addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     showSlide(currentIndex);
//     showGallery();
//     startAutoSlide();
//     animateButton(prevButton);
//   });
  
//   // Остановка автопереключения при наведении на стрелки
//   nextButton.addEventListener('mouseenter', stopAutoSlide);
//   prevButton.addEventListener('mouseenter', stopAutoSlide);
  
//   // Возобновление автопереключения при уходе мыши со стрелок
//   nextButton.addEventListener('mouseleave', startAutoSlide);
//   prevButton.addEventListener('mouseleave', startAutoSlide);
  
//   // Обновление слайдов при изменении размера окна
//   window.addEventListener('resize', () => {
//     showSlide(currentIndex);
//   });
// }

// /////////// main ///////////////////////////////
// addListeners();
// // Start Auto Slide
// startAutoSlide();
// ////////////////////////////////////////////////




const container = document.querySelector('.container');
const tabletContainer = document.querySelector('.tabletcontainer');

// Выбор слайдов для каждого контейнера
const slides = container.querySelectorAll('.slide'); // Для контейнера .container
const tabletSlides = tabletContainer.querySelectorAll('.slide'); // Для контейнера .tabletcontainer

// Кнопки управления для каждого контейнера
const nextButton = container.querySelector('.next');
const prevButton = container.querySelector('.prev');
const tabletNextButton = tabletContainer.querySelector('.next');
const tabletPrevButton = tabletContainer.querySelector('.prev');

// Элементы галереи и другие
const counter = document.querySelectorAll('.counter');
// const countertablet = document.querySelector('.countertablet');
const galleryImages = document.querySelectorAll('.image-gallery img');
const galleryImagesTablet = document.querySelectorAll('.image-galleryTablet img');

const gallery = document.querySelector('.image-gallery');
const galleryTablet = document.querySelector('.image-galleryTablet');
let currentIndex = 0;
let galleryShown = false;
let autoSlideInterval;

// Обновление счетчика и синхронизация активного изображения галереи
function updateCounterAndGallery(slidesArray) {
  // counter.textContent = `${currentIndex + 1}/${slidesArray.length}`;
  counter.forEach(counter => {counter.textContent = `${currentIndex + 1}/${slidesArray.length}`})
  galleryImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });

  galleryImagesTablet.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });
}

// Показ нужного слайда
function showSlide(slidesArray, index) {
  slidesArray.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    gsap.fromTo('.active', { x: 20, duration: 0.5}, {x: 0, duration: 0.5});
  });
  updateCounterAndGallery(slidesArray);
}

// Показ галереи с анимацией
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



// Автоматическое переключение слайдов через каждые 5 секунд
function startAutoSlide(slidesArray) {
  stopAutoSlide(); // Останавливаем любой предыдущий интервал
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slidesArray.length;
    showSlide(slidesArray, currentIndex);
    showGallery(); // Показываем галерею при автоматическом переключении
  }, 7000);
}

// С задержкой перед запуском автослайда
function startAutoSlideWithDelay(slidesArray, delay) {
  setTimeout(() => {
    startAutoSlide(slidesArray);
  }, delay); // Задержка перед запуском автослайда
}

// Останавливаем автоматическую смену
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Анимация кнопок
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

// Добавление слушателей для управления слайдерами в каждом контейнере
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

  // Остановка автопереключения при наведении на стрелки
  nextButton.addEventListener('mouseenter', stopAutoSlide);
  prevButton.addEventListener('mouseenter', stopAutoSlide);

  // Возобновление автопереключения при уходе мыши со стрелок
  nextButton.addEventListener('mouseleave', () => startAutoSlide(slidesArray));
  prevButton.addEventListener('mouseleave', () => startAutoSlide(slidesArray));

  // Обновление слайдов при изменении размера окна
  window.addEventListener('resize', () => {
    showSlide(slidesArray, currentIndex);
  });
}

// Инициализация слайдеров для каждого контейнера
addListeners(slides, nextButton, prevButton); // Для основного контейнера
addListeners(tabletSlides, tabletNextButton, tabletPrevButton); // Для tablet контейнера

// Запуск автослайда с задержкой
startAutoSlideWithDelay(slides, 7000); // Для основного контейнера
startAutoSlideWithDelay(tabletSlides, 7000); // Для tablet контейнера

// add string from psd write to Olia