
window.addEventListener('DOMContentLoaded', function () {//загрузка только DOM, без картинок
  'use strict';
  //Timer
  function countTimer(deadline) {
    let timerDays = document.querySelector('#timer-days'),
      timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      function addZero(num) {//добавляем нули
        let str = num.toString();
        return str.length == 1 ? "0" + str : str;
      }

      let dateStop = new Date(deadline).getTime(),//дата окончания
        dateNow = new Date().getTime(),//текущая дата, миллисекунды
        timeRemaining = (dateStop - dateNow) / 1000,//количество оставшихся секунд
        seconds = addZero(Math.floor(timeRemaining % 60)),//получаем секунды
        minutes = addZero(Math.floor((timeRemaining / 60) % 60)),//получаем минуты
        hours = addZero(Math.floor(timeRemaining / 60 / 60) % 24),//получаем часы
        days = addZero(Math.floor(timeRemaining / 60 / 60 / 24));//получаем дни
      return {//возвращение в виде объекта
        timeRemaining, days, hours, minutes, seconds
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerDays.textContent = timer.days;
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerDays.textContent = '00';
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(idInterval);
      }
    }
    updateClock();

  }

  //countTimer('17 november 2019 15:32');
  let idInterval = setInterval(countTimer, 1000, '17 november 2019 16:10');//обновление через 1000мс

});
