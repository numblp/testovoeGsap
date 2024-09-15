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
    .to('.mainBG', {scale: 1.1,  duration: 1}, "<")
    .from('.button', {opacity: 0, duration: 1},)
    .from('.slider', {opacity: 0, duration: 1}, '<+0.5')
    .to('.seeSite', {color: 'black', duration: 1}, '<')
    // .to('.button', {
    //   scale: 1.1,
    //   duration: 1.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: "power1.inOut",
    //   delay: 1,
    // })
    // .to('.button', {
    //   scale: 1.1,
    //   duration: 0.3,
    //   paused: true,
    //   onStart: () => {
    //     // Остановка пульсации при наведении
    //     gsap.killTweensOf('.button');
    //   },
    //   onEnter: () => {
    //     // Увеличение при наведении
    //     gsap.to('.button', { scale: 1.1, duration: 0.3 });
    //   },
    //   onLeave: () => {
    //     // Возвращение к исходному масштабу при уходе мыши
    //     gsap.to('.button', { scale: 1, duration: 0.3 });
    //   }
    // })
    
    const pulsing = gsap.timeline().to(".pulse", {scale: 0.8, duration: 1.5, yoyo: true, repeat: -1});
    
    document.querySelector('.pulse').addEventListener("mouseenter", () => {
      pulsing.pause();
      gsap.to(".button", {scale: 1.1,})
     })
    document.querySelector('.pulse').addEventListener("mouseleave", () => {gsap.to(".button", {scale: 1})})


const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const counter = document.querySelector('.counter');
const galleryImages = document.querySelectorAll('.image-gallery img');
const gallery = document.querySelector('.image-gallery');
let currentIndex = 0;
let galleryShown = false; // Флаг, показывающий, показана ли галерея
let autoSlideInterval;

// Обновление счетчика и синхронизация активного изображения галереи
function updateCounterAndGallery() {
  counter.textContent = `${currentIndex + 1}/${slides.length}`;
  galleryImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });
}

// Показ нужного слайда
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    gsap.fromTo('.active', { x: 20, duration: 0.5}, {x: 0, duration: 0.5});
  });
  updateCounterAndGallery();
}

// Показ галереи с анимацией
function showGallery() {
  if (!galleryShown) {
    gsap.to(gallery, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.8,
      ease: "power2.inOut"
    });
    galleryShown = true;
  }
}

// Автоматическое переключение слайдов через каждые 5 секунд
function startAutoSlide() {
  stopAutoSlide(); // Останавливаем любой предыдущий интервал
  // clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    showGallery(); // Показываем галерею при автоматическом переключении
  }, 5000);
}

function startAutoSlideWithDelay(delay) {
  setTimeout(() => {
    startAutoSlide();
  }, delay); // Задержка перед запуском автослайда
}
startAutoSlideWithDelay(5000);

// Останавливаем автоматическую смену
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Управление кнопками "Next" и "Prev"

function animateButton(button) {
  gsap.fromTo(button, 
    { scale: 1 }, // Исходный размер
    { 
      scale: 0.6, // Уменьшение до 80%
      duration: 0.3, // Длительность уменьшения
      ease: "power2.out",
      onComplete: () => {
        gsap.to(button, { 
          scale: 1, // Возврат к исходному размеру
          duration: 0.3, 
          ease: "power2.out"
        });
      }
    }
  );
}

function addListeners() {
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    showGallery(); // Показываем галерею при первом клике
    startAutoSlide(); // Перезапускаем автоматическую смену
    animateButton(nextButton);
  });
  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    showGallery(); // Показываем галерею при первом клике
    startAutoSlide(); // Перезапускаем автоматическую смену
    animateButton(prevButton);
  });
  
  // Остановка автопереключения при наведении на стрелки
  nextButton.addEventListener('mouseenter', stopAutoSlide);
  prevButton.addEventListener('mouseenter', stopAutoSlide);
  
  // Возобновление автопереключения при уходе мыши со стрелок
  nextButton.addEventListener('mouseleave', startAutoSlide);
  prevButton.addEventListener('mouseleave', startAutoSlide);
  
  // Обновление слайдов при изменении размера окна
  window.addEventListener('resize', () => {
    showSlide(currentIndex);
  });
}

/////////// main ///////////////////////////////
addListeners();
// Запуск автоматической смены слайдов при загрузке страницы
startAutoSlide();
////////////////////////////////////////////////

// let btnAnimation = document.querySelector(".button");
// let pulseAnimation = gsap.to(".button", {
//   scale: 1.1,
//   duration: 1.5,
//   yoyo: true, // Для возврата к исходному состоянию
//   repeat: -1, // Бесконечная анимация
//   ease: "power1.inOut",
//   delay: 7
// });

// // Остановка пульсации после ховера
// btnAnimation.addEventListener("mouseenter", () => {
//   pulseAnimation.kill(); // Останавливаем пульсацию
//   gsap.to(".button", { scale: 1.1, duration: 0.3 }); // Увеличение при ховере до 1.1
// });

// btnAnimation.addEventListener("mouseleave", () => {
//   gsap.to(".button", { scale: 1, duration: 0.3 }); // Возвращение к нормальному размеру при уходе мыши
// });

// let animation = gsap.to(".button", {
//   paused: true,
//   scale: 1.1
// });



// Функция для настройки анимации при наведении
// function setupHoverAnimation() {
//   let animation = gsap.to(".button", {
//     paused: true,
//     scale: 1.1, // Увеличение до 110% при ховере
//     duration: 0.3,
//     ease: "power2.inOut"
//   });

//   // Добавляем события на наведение и уход мыши
//   test.addEventListener("mouseenter", () => animation.play());
//   test.addEventListener("mouseleave", () => animation.reverse());
// }


// const test = document.querySelector(".button");
// test.addEventListener("click", e => { 
//   gsap.fromTo(".button", {scale: 1}, {scale: 1.1, duration: 0.25, yoyo: true, repeat: 1, overwrite: true});
// })


// let tween = gsap.to("test", {
//   scale: 1.1,
//   ease: 'none',
//   paused: true,
// });

// test.addEventListener("mouseenter", () => {
//   gsap.to(tween, {duration: 1.3, time: tween.duration(), ease: "elastic.out(0.8, 0.3)"});
// });
// test.addEventListener("mouseleave", () => {
//   gsap.to(tween, {duration: 0.1, time: 0, ease: 'none', overwrite: true});
// });

// add string from psd write to Olia

// const sliderItems = [
// {src:'text1.png'},
// {},
// {}
// ];


