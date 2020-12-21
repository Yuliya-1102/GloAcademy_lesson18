window.addEventListener('DOMContentLoaded', function(){ //ждем загрузки контента, не картинок
    'use strict';

    //timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        const addZero = n => n < 10 ? '0' + n : n;

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(); //дата дедлайна в милисекундах
            let dateNow = new Date().getTime(); //дата сейчас в милисекундах
            let timeRemaining = (dateStop - dateNow) / 1000; //время, осталось до дедлайна в сек (1000)
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }
    
        function updateClock(){
            let timer = getTimeRemaining();

            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if(timer.timeRemaining < 0){
                clearInterval(idInterval); //по id останавливаем таймер, при выпоненных йсловиях

                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        let idInterval = setInterval(updateClock, 1000);
    }
    countTimer('15 december 2020');

    //меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        const body = document.querySelector('body');

        const handlerMenu = () => {
           menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {
            let target = event.target;
                if(target.closest('.menu')){
                    handlerMenu();
                } else if(target.classList.contains('close-btn')){
                    handlerMenu();
                } else if(target.closest('menu') && !target.classList.contains('active-menu')){
                    handlerMenu();
                } else if(target.classList.contains('active-menu')){
                    menu.classList.add('active-menu');
                } else{
                    menu.classList.remove('active-menu');
                }
        });
    };    
    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupContent = document.querySelector('.popup-content');
        
        //анимация
        function animate({duration, draw, timing}) {
            let start = performance.now();
            requestAnimationFrame(function animate(time) {
              let timeFraction = (time - start) / duration;
              if (timeFraction > 1) {
                  timeFraction = 1;
                }
              let progress = timing(timeFraction);
              draw(progress);
              if (timeFraction < 1) {
                requestAnimationFrame(animate);
              }
            });
          }
        // использование анимации
        popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    let clientWidth = document.documentElement.clientWidth;
                    if(clientWidth > 768){
                        popup.style.display = 'block';
                        animate({
                            duration: 1000,
                            timing: function(timeFraction) {
                            return timeFraction;
                            },
                            draw: function(progress) {
                                popupContent.style.left = (progress * 50) + '%';
                                popupContent.style.transform = 'translateX(-50%)';
                            }
                        });                        
                    } else{
                        popup.style.display = 'block';
                    }
                });
         });
        
         // закрытие окна
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else{
                target = target.closest('.popup-content');

                if(!target){
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

    // плавный скролл
    const addScroll = () => {
        const menu = document.querySelector('menu');
        const menuList = menu.querySelectorAll('ul>li>a');
        const container = document.querySelectorAll('.container');
        const serviceBlockBtn = document.querySelector('a[href*="#service-block"]');
        const service = document.querySelector('.service');

        menuList.forEach((elem) => {
            let linkHref = elem.hash.slice(1);
            elem.addEventListener('click', () => {
                container.forEach((item) => {
                    if(linkHref === item.parentElement.className){
                        item.scrollIntoView({block: "start", behavior: "smooth"});
                    }
                });
            });
        });

        serviceBlockBtn.addEventListener('click', () => {
            service.scrollIntoView({block: "start", behavior: "smooth"});
        });
    };
    addScroll();

    //табы, делегирование
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(i === index){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');
                if(target){
                    tab.forEach((item, i) => {
                        if(target === item){
                            toggleTabContent(i);
                        }
                    });
                }
        });
    };
    tabs();

    // слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content');
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0; //номер слайда, нулевой
        let interval; // служит как id для отключения setIntervala
        let dot; //document.querySelectorAll('.dot') внутри функции

        //создание dots в количестве слайдов
        const addDots = () => {
            slide.forEach((item, index) => {
                let li = document.createElement('li');
                li.classList.add('dot');
                if(index === 0){
                    li.classList.add('dot-active');
                }
                portfolioDots.append(li);
            });
            dot = document.querySelectorAll('.dot');
        };
        addDots();

        const prevSlide = (elem, index, strClass) => { // удаляет класс active
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => { // добавляет класс active
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active'); // перелистываем слайд, удаляя и добавляя класс с opasity;
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active'); // перелистываем слайд, удаляя и добавляя класс с opasity;
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        // останавливать автоматическое переключение при наведении
        const stopSlide = () => {
            clearInterval(interval);
        };

        // переключени слайдера по стрелкам
        slider.addEventListener('click', (event) => { 
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active'); //удаляем активные классы
            prevSlide(dot, currentSlide, 'dot-active'); //удаляем активные классы
            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length -1; //длинна массива на 1ед больше, чем интдекс массива
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active'); //добавляе активные классы, currentSlide, кот выше просчитали
            nextSlide(dot, currentSlide, 'dot-active');//добавляе активные классы, currentSlide, кот выше просчитали
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide(1500);
            }
        });

        startSlide(1500);

    };
    slider();

    //менять фото на наведению
    const changePhotoCommand = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
         
            commandPhoto.forEach((elem) => {
                let targetSrc;
                let targetDataset;
                elem.addEventListener('mouseenter', (event) => {
                    let target = event.target;
                    targetSrc = target.src;
                    targetDataset = target.dataset.img;

                    target.src = targetDataset;
                    target.dataset.img = targetSrc;
                });
                elem.addEventListener('mouseleave', (event) => {
                    let target = event.target;

                    target.src = targetSrc;
                    target.dataset.img = targetDataset;
                });
            });
     };
    changePhotoCommand();

    //ввод только цифр в калькулятор

    const inputNumbers = () => {
        const calcBlock = document.querySelector('.calc-block');

        const validInputNumber = (event) => {
            let target = event.target;
            if(target.classList.contains('calc-item')){
                target.value = target.value.replace (/\D/g, '');
            }
        };

        calcBlock.addEventListener('input', validInputNumber);
    };
    inputNumbers();
});

