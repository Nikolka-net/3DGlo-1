
window.addEventListener('DOMContentLoaded', () => {//загрузка только DOM, без картинок
  'use strict';
  //Timer
  const countTimer = (deadline) => {
    const timerDays = document.querySelector('#timer-days'),
      timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {

      //альтернативная addZero
      /*   const addZero = (num) => {//добавляем нули
          let str = num.toString();
          return str.length == 1 ? "0" + str : str;
        }; */
      const addZero = (num) => {
        if (num < 10) {
          num = `0${num}`;
        }
        return num;
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
      menu = document.querySelector('menu');

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
    menu.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('close-btn') || target.closest('ul > li')) {//при клике на крестик или пункт меню м. окно исчезает
        handlerMenu();
      }
      return;
    });
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

  //Slider

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      // dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content'),
      dots = document.querySelectorAll('.portfolio-dots');

    let dot;
    let currentSlide = 0;//индекс текущего слайда
    let interval;//для идентификатора setInterval

    dot = document.createElement('li');
    dot.classList.add('dot', 'dot-active');
    dots[0].appendChild(dot);


    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);//удаляем active
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const cloneDot = () => {
      dot = dot.cloneNode();
      dots[0].appendChild(dot);
    };

    const autoPlaySlide = () => {//автоматическое перелистывание

      cloneDot();
      let newDot = document.querySelectorAll('.dot');//коллекция "точек"
      let dotLength = newDot.length;//длина псевдомассива

      prevSlide(slide, currentSlide, 'portfolio-item-active');//передаём значение и класс
      prevSlide(newDot, currentSlide, 'dot-active');//передаём значение и класс, чтобы менялись точки, удал. класс
      currentSlide++;

      if (currentSlide >= slide.length) {//начин. с начала
        if (dotLength > currentSlide) {//если длина псевдомассива >
          for (let i = 0; i < currentSlide; i++) {
            newDot[i].parentNode.removeChild(newDot[i]);//удал. элемент из коллекции
          }
        }
        currentSlide = 0;//обнуляем
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');//добавляем класс
      nextSlide(newDot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2000) => {//запуск слайда, по умолч. 2с
      interval = setInterval(autoPlaySlide, time);//запуск слайда через каждые 2с
    };

    const stopSlide = () => {//остановка слайда
      clearInterval(interval);//остановка интервала через идентификатор

    };

    slider.addEventListener('click', (event) => {

      const deletDots = () => {
        let dotLength = newDot.length - 1;//длина псевдомассива 
        for (let i = 0; dotLength > currentSlide; i++) {
          newDot[i].parentNode.removeChild(newDot[i]);//удал. элемент из коллекции
          dotLength--;
        }
      };

      const deletDots2 = () => {
        let dotLength = newDot.length;//длина псевдомассива  
        for (let i = 0; dotLength > currentSlide; i++) {
          newDot[i].parentNode.removeChild(newDot[i]);//удал. элемент из коллекции
          dotLength--;
        }
      };

      event.preventDefault();//сбрасываем знач. по умолч, заглушки #

      let target = event.target;//цель события, на что нажимаем ~

      if (!target.matches('.portfolio-btn, .dot')) {//если кликаем не на эти элем. ничего не происходит
        return;
      }
      let newDot = document.querySelectorAll('.dot');
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(newDot, currentSlide, 'dot-active');


      if (target.matches('#arrow-right')) {//при нажатии на правую кнопку > slide
        currentSlide++;
        cloneDot();

        newDot = document.querySelectorAll('.dot');//коллекция "точек"
        let dotLength = newDot.length;//длина псевдомассива  

        if (currentSlide >= slide.length) {//начин. с начала
          if (dotLength > currentSlide) {//если длина псевдомассива >
            for (let i = 0; i < currentSlide; i++) {
              newDot[i].parentNode.removeChild(newDot[i]);//удал. элемент из коллекции
            }
          }
          currentSlide = 0;//обнуляем
        }


      } else if (target.matches('#arrow-left')) {

        newDot = document.querySelectorAll('.dot');//коллекция "точек"
        let dotLength = newDot.length;//длина псевдомассива 
        if (dotLength > currentSlide) {//если длина псевдомассива >
          deletDots2();
          currentSlide--;
        }

      } else if (target.matches('.dot')) {
        newDot.forEach((elem, index) => {//для сравнения точки и нажатого таргета
          if (elem === target) {
            currentSlide = index;//присваиваем акт. индекс слайду
            if (currentSlide > 0) {
              newDot = document.querySelectorAll('.dot');//коллекция "точек"
              deletDots();

            } else if (currentSlide === 0) {
              newDot = document.querySelectorAll('.dot');//коллекция "точек"
              deletDots();
              startSlide();
            }
          }
        });
      }

      if (currentSlide >= slide.length) {//начин. с начала
        newDot = document.querySelectorAll('.dot');//коллекция "точек"
        let dotLength = newDot.length;//длина псевдомассива 

        if (dotLength > currentSlide) {//если длина псевдомассива >
          deletDots2();
        }
        currentSlide = 0;
      }

      if (currentSlide < 0) {//возврат на предыдущий слайд
        currentSlide = slide.length - 1;//длина массива > на 1, поэтому -1
        let newDot = document.querySelectorAll('.dot');
        let dotLength = newDot.length;//длина псевдомассива 
        if (dotLength < slide.length) {
          for (let i = 0; dotLength < slide.length; i++) {
            cloneDot();
            dotLength++;
          }
        }

      }
      newDot = document.querySelectorAll('.dot');
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(newDot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide();

  };
  slider();

  //Our team

  const team = () => {

    const command = document.querySelector('#command');

    command.addEventListener('mouseover', (event) => {//при наведении
      const target = event.target;

      if (target.matches('.command__photo')) {//если навели на этот элемент

        //альтернативный код
        //let attributeData = target.getAttribute('data-img');
        //let attributeSrc = target.getAttribute('src');

        let attributeData = target.dataset.img;
        let attributeSrc = target.src;

        target.dataset.img = attributeSrc;//присваиваем значения
        target.src = attributeData;

      }

      if (!target.matches('.command__photo')) {//если кликаем не на эти элем. ничего не происходит
        return;
      }

    });

    command.addEventListener('mouseout', (event) => {//при уходе с элемента
      const target = event.target;
      if (target.matches('.command__photo')) {
        let attributeData = target.getAttribute('data-img');
        let attributeSrc = target.getAttribute('src');

        target.dataset.img = attributeSrc;

        target.src = attributeData;
      }
      if (!target.matches('.command__photo')) {//если кликаем не на эти элем. ничего не происходит
        return;
      }
    });

  };

  team();

  //Calculator


  const calcBlock1 = document.querySelector('.calc-block');

  calcBlock1.addEventListener('input', (event) => {
    const target = event.target;

    if (target.matches('.calc-square, .calc-count, .calc-day')) {
      target.value = target.value.replace(/\D/g, '');//вводятся только цифры, остальные замен. на пустую строку

    }
    if (!target.matches('.calc-square, .calc-count, .calc-day')) {//если кликаем не на эти элем. ничего не происходит
      return;
    }

  });

  //Calculator от Максима

  const calc = (price = 100) => {//100 единиц - цена по умолчанию
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {//считаем сумму
      let total = 0,
        countValue = 1,
        dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value;//значение value у options
      const squareValue = +calcSquare.value;//получаем площадь в числах

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;//получ. десятую долю и её прибавляем;отнимаем 1, т.к. за 1 помещение 10-я часть не прибавляется
      }

      if (calcDay.value && calcDay.value < 5) {//если calcDay существует и < 5
        dayValue *= 2;//* на 2, за скорость цена >
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {//выводим сумму в span если они оба true,при использовании др. полей они будут false
        total = price * typeValue * squareValue * countValue * dayValue;//считается и выводится
      } 


      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      //альтернативный код
      /*  if (target === calcType || target === calcSquare || target === calcDay ||
        target === calcCount) {
          console.log(1);
        } */

      /*  if (target.matches('select') || target.matches('input')) {
        console.log(1);
      }
      */
      /*  if (target.matches('.calc-type') || target.matches('.calc-square') ||
        target.matches('.calc-day') || target.matches('.calc-count')) {
        console.log(1);
 
      }  */


      if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
        countSum();

      }

    });

  };

  calc(100);



});

