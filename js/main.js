
window.addEventListener('DOMContentLoaded', () => {//загрузка только DOM, без картинок
  'use strict';
  //Timer
  const countTimer = (deadline) => {
    const timerDays = document.querySelector('#timer-days'),
      timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      const addZero = (num) => {//добавляем нули
        let str = num.toString();
        return str.length == 1 ? "0" + str : str;
      };

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
    };

    const updateClock = () => {
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
        //clearInterval(idInterval);
      }
    };
    updateClock();

  };

  countTimer('1 january 2020');
  //let idInterval = setInterval(countTimer, 1000, '1 january 2020');//обновление через 1000мс

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');//с помощью css
      //альтернативный код
      /*  if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {//если transform есть, оно превр. в false и отработ. else
         menu.style.transform = `translate(0)`;
       } else {
         menu.style.transform = `translate(-100%)`;
       } */
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));//сворачивание меню
  };

  toggleMenu();

  //Popup

  const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');
    let count = 0;//счётчик


    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popUp.style.display = 'block';//вызываем модальное окно
        let popupInterval;
        const popupDown = function () {
          popupInterval = requestAnimationFrame(popupDown);//записываем идентификатор
          count++;
          if (count < 100) {
            popupContent.style.top = count + 'px';//двигаем
          } else {
            cancelAnimationFrame(popupInterval);//конец работы счётчика
          }
        };
        const width = document.documentElement.clientWidth;

        if (width >= 768) {//если ширина экрана >= 768px
          popupInterval = requestAnimationFrame(popupDown);//запуск при клике на кнопку
        }
      });
    });

    popUp.addEventListener('click', (event) => {
      const countPopUpNone = () => {
        popUp.style.display = 'none';//убираем м. окно
        count = 0;//обнуляем счётчик
      };

      let target = event.target;

      if (target.classList.contains('popup-close')) {//при клике на крестик м. окно исчезает
        countPopUpNone();

      } else {
        target = target.closest('.popup-content');

        if (!target) {//если не получили popup-content, т.е. получили null при клике за пределами окна
          countPopUpNone();

        }
      }


    });

  };
  togglePopUp();

  //Tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {//если индексы совпадают, контент появляется
          tab[i].classList.add('active');//добавл. активный класс
          tabContent[i].classList.remove('d-none');
        } else {//исчезает
          tab[i].classList.remove('active');//убираем активный класс
          tabContent[i].classList.add('d-none');

        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;//элем. на котором произошло событие
      target = target.closest('.service-header-tab');//проверка наличия селектора, его привязка

      if (target) {//есть ли у таргета что-то
        tab.forEach((item, i) => {//перебор
          if (item === target) {//если совп. с service-header-tab перед. индекс элемента в F.
            toggleTabContent(i);
          }
        });
      }
    });


  };
  tabs();


});

