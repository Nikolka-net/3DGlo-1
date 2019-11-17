window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function countNewYear(newyear) {

    let elemDiv = document.querySelectorAll('.message'),
      morning = document.createElement('p'),
      afternoon = document.createElement('p'),
      evening = document.createElement('p'),
      night = document.createElement('p'),
      today = document.createElement('p'),
      currentTime = document.createElement('p'),
      toNewYear = document.createElement('p');

    elemDiv[0].insertBefore(morning, null);
    elemDiv[0].insertBefore(afternoon, null);
    elemDiv[0].insertBefore(evening, null);
    elemDiv[0].insertBefore(night, null);
    elemDiv[0].insertBefore(today, null);
    elemDiv[0].insertBefore(currentTime, null);
    elemDiv[0].insertBefore(toNewYear, null);


    let date = new Date();

    let timeRu = date.toLocaleTimeString('ru').substr(0, 2);
    if (timeRu >= 6 && timeRu < 12) {
      morning.textContent = 'Доброе утро';
    } else if (timeRu >= 12 && timeRu < 18) {
      afternoon.textContent = 'Добрый день';
    } else if (timeRu >= 18 && timeRu < 24) {
      evening.textContent = 'Добрый вечер';
    } else if (timeRu >= 24 && timeRu < 6) {
      night.textContent = 'Доброй ночи';
    }

    let weekday = date.toLocaleString('ru', { weekday: 'long' });
    today.textContent = 'Сегодня: ' + weekday;

    let timePmEn = date.toLocaleTimeString('en');
    currentTime.textContent = 'Текущее время: ' + timePmEn;

    function getTimeRemaining() {
      let dateStop = new Date(newyear).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        days = Math.floor(timeRemaining / 60 / 60 / 24);
      return {
        days
      };
    }
    let timeRem = getTimeRemaining();
    toNewYear.textContent = 'До нового года осталось ' + timeRem.days + ' дня(ей)!';

  }

  countNewYear('01 january 2020');

});

// console.log(date.toTimeString());//время
// console.log(date.toDateString().substr(0, 3));//дата

// console.log(date.toLocaleDateString('ru'));//дата

// console.log(date.toISOString().substr(0, 10));

// console.log(Date.now());//миллисекунды с 1970 года
// console.log(Date.parse('31 march 1984'));//в миллисекундах

// console.log(date);
// console.log('год ' + date.getFullYear());
// console.log('месяц ' + (date.getMonth() + 1));
// console.log('день месяца ' + date.getDate());
// console.log('день недели ' + date.getDay());
// console.log('час ' + date.getHours());
// console.log('минуты ' + date.getMinutes());
// console.log('секунды ' + date.getSeconds());
