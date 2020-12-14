'use strict';

const addZero = n => n < 10 ? '0' + n : n;
const weekArr = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
let date = new Date();

function countTimer(deadline){
    date.setDate(date.getDate() -1);
    let dayCurrent = weekArr[date.getDay()];

    let dateStop = new Date(deadline).getTime(); //дата дедлайна в милисекундах
    let dateNow = new Date().getTime(); //дата сейчас в милисекундах
    let timeRemaining = (dateStop - dateNow) / 1000; //время, осталось до дедлайна в сек (1000)
    let day = Math.floor(timeRemaining / 60 / 60 / 24);

    let time = date.toLocaleTimeString('en');

    return {dayCurrent, day, time};
}
let time = countTimer('31 december 2020');

function addgreeting(){
    let hours = date.getHours();

    if(hours > 0 && hours < 6) {
        return 'Доброй ночи';
    } else if(hours > 6 && hours < 12) {
        return 'Доброе утро';
    } else if(hours > 12 && hours < 18) {
        return 'Добрый день';
    } else if(hours > 18 && hours < 24) {
        return 'Добрый вечер';
    }
}

function showTime(){
    document.querySelector('body').innerHTML = `
    ${addgreeting()}<br>
    Сегодня: ${time.dayCurrent}<br>
    Текущее время: ${time.time}<br>
    До нового года осталось ${time.day} дней`;
}
showTime();