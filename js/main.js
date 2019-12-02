
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

  const calc = (price = 100) => {//100 единиц - цена по умолчанию
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {//считаем сумму
      let total = 0,//начальная сумма в span
        countValue = 1,//количество помещений изначально
        dayValue = 1;//количество дней, начальное

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
        total = Math.floor(price * typeValue * squareValue * countValue * dayValue);//считается и выводится
      }

      totalValue.textContent = total;//выводим сумму
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

    calcBlock.addEventListener('input', (event) => {
      const target = event.target;
      if (target.matches('.calc-square, .calc-count, .calc-day')) {
        target.value = target.value.replace(/\D/g, '');//вводятся только цифры, остальные замен. на пустую строку
      }

      if (!target.matches('.calc-square, .calc-count, .calc-day')) {//если кликаем не на эти элем. ничего не происходит
        return;
      }

    });
  };

  calc();

  //send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так ...',
      loadMessage = 'Загрузка ...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    const body = document.querySelector('body');


    const inputCyrillic = () => {//ввод только кириллицы и пробелов
      let target = event.target;
      if (target.matches('.form-name') || target.matches('.mess') || target.matches('#form2-name')) {
        target.value = target.value.replace(/[^а-яё\s]/ig, '');
      }
    };

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem; color: #fff`;//применяем стили

    const getForm = (event, form) => {
      event.preventDefault();//чтобы страница не перезагружалась по умолчанию
      form.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;//идёт загрузка
      let formData = new FormData(form);//получ. данные нашей формы c атрибутом name в объект
      let body = {};//объект, ко-й отправл. на сервер в формате json

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(() => {
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });

    };

    const inputReset = (form) => {
      setTimeout(() => {//очистка сообщений
        form.removeChild(statusMessage);
        //statusMessage.textContent = '';
      }, 3000);
      for (const elem of form.elements) {//очистка инпутов
        if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
          elem.value = '';
        }
      }
    };

    function valid(event, form) {
      const elementsForm = [];//пустой массив для инпутов
      const error = new Set();//массив для ошибочных инпутов, вмещает уникальные эл., не повторяются

      for (const elem of form.elements) {//вытаскиваем из формы инпуты
        if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
          elementsForm.push(elem);//пушим в массив только наши инпуты
        }
      }

      elementsForm.forEach(elem => {
        const patternPhone = /^\+?[78]([-()]*\d){10}$/;
        //const patternText = (/[^а-яё\s]/ig, '');
        const patternEmail = /^[\w-]+@\w+\.\w{1,}\D$/;//после точки больше 1 символа, не цифры

        if (elem.value.trim() === '' || elem.type === 'tel' && !patternPhone.test(elem.value) ||
          elem.type === 'email' && !patternEmail.test(elem.value)) {//если не проходит валидацию
          elem.style.border = 'solid red';
          error.add(elem);//добавл. инпуты с ошибками в Set
          event.preventDefault();
        } else {
          error.delete(elem);//удал. инпуты из Seta
          elem.style.border = '';
        }

      });
      if (!error.size) {//если size не содержит ошибки (в Set);size коли-во эл. в массиве Set
        getForm(event, form);
        inputReset(form);
      }
    }

    body.addEventListener('input', (event) => {
      inputCyrillic(event);
    });

    form.addEventListener('submit', (event) => {
      valid(event, form);
    });

    form2.addEventListener('submit', (event) => {
      valid(event, form2);
    });

    form3.addEventListener('submit', (event) => {
      valid(event, form3);
    });



    const postData = (body) => {//ф. отправки запроса

      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();//объект request для обращения к серверу

        request.addEventListener('readystatechange', () => {//событие для пользователя о том, что данные ушли на сервер

          if (request.readyState !== 4) {//не равен 4 событию
            return;//выходим
          }
          if (request.status === 200) {//статус загрузки успешен
            resolve();
          } else {
            reject(request.statusText);//функция, ко-я выдаёт ошибку
          }
        });

        request.open('POST', './server.php');//отправляем запрос на сервер
        request.setRequestHeader('Content-Type', 'application/json');//настройка заголовка: имя и значение(данные отпр. с формы form-data)
        request.send(JSON.stringify(body));//отправляем эти данные на сервер в формате json строка
      });


    };


  };
  sendForm();

});

