'use strict';

const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content'),
    allProgects = document.getElementById('all-progects'),
    img = allProgects.querySelectorAll('img'),
    dots = document.querySelectorAll('.portfolio-dots');


  const cloneDot = () => {//создание новые точек, равных коли-ву картинок
    let dot = document.createElement('li');
    dot.classList.add('dot', 'dot-active');
    dots[0].appendChild(dot);

    for (let i = 1; i < img.length; i++) {
      dot = dot.cloneNode();
      dot.classList.remove('dot-active');
      dots[0].appendChild(dot);
    }
  };
  cloneDot();

  let newDot = document.querySelectorAll('.dot');//коллекция "новых точек"
  let currentSlide = 0;//индекс текущего слайда
  let interval;//для идентификатора setInterval

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);//удаляем active
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {//автоматическое перелистывание
    prevSlide(slide, currentSlide, 'portfolio-item-active');//передаём значение и класс
    prevSlide(newDot, currentSlide, 'dot-active');//передаём значение и класс, чтобы менялись точки

    currentSlide++;
    if (currentSlide >= slide.length) {//начин. с начала
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(newDot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 1500) => {//запуск слайда, по умолч. 3с
    interval = setInterval(autoPlaySlide, time);//запуск слайда через каждые 2с
  };

  const stopSlide = () => {//остановка слайда
    clearInterval(interval);//остановка интервала через идентификатор

  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();//сбрасываем знач. по умолч, заглушки #

    let target = event.target;//цель события, на что нажимаем ~

    if (!target.matches('.portfolio-btn, .dot')) {//если кликаем не на эти элем. ничего не происходит
      return;
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(newDot, currentSlide, 'dot-active');


    if (target.matches('#arrow-right')) {//при нажатии на правую кнопку > slide
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      newDot.forEach((elem, index) => {//для сравнения точки и нажатого таргета
        if (elem === target) {
          currentSlide = index;//присваиваем акт. индекс слайду
        }
      });
    }
    if (currentSlide >= slide.length) {//начин. с начала
      currentSlide = 0;
    }
    if (currentSlide < 0) {//возврат на предыдущий слайд
      currentSlide = slide.length - 1;//длина массива > на 1, поэтому -1
    }

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