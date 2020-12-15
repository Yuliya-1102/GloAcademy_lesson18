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
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');  
        const menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
           menu.classList.toggle('active-menu');
        };
    
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
   
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };    
    toggleMenu();

    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup-content');
        let clientWidth = document.documentElement.clientWidth;
     
        
        //агимация
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
            if(clientWidth > 768) {
                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    let popupContentWidth = popupContent.offsetWidth;
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
                });
            } else{
                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                });
            }
           
        });
    
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();

    // плавный скролл
    const addScroll = () => {
        const menu = document.querySelector('menu');
        const menuList = menu.querySelectorAll('ul>li>a');
        const container = document.querySelectorAll('.container');
        console.log('container: ', container.parentElement);

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
    };
    addScroll();
});

