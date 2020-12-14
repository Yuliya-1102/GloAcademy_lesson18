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
});

