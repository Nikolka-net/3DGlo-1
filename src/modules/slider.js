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

  const dotLength = () => {
    let dotLength = document.querySelectorAll('.dot').length;//длина псевдомассива 
    return dotLength;
  };


  const autoPlaySlide = () => {//автоматическое перелистывание

    cloneDot();
    let newDot = document.querySelectorAll('.dot');//коллекция "точек"

    prevSlide(slide, currentSlide, 'portfolio-item-active');//передаём значение и класс
    prevSlide(newDot, currentSlide, 'dot-active');//передаём значение и класс, чтобы менялись точки, удал. класс
    currentSlide++;

    if (currentSlide >= slide.length) {//начин. с начала
      if (dotLength() > currentSlide) {//если длина псевдомассива >
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

      if (currentSlide >= slide.length) {//начин. с начала
        if (dotLength() > currentSlide) {//если длина псевдомассива >
          for (let i = 0; i < currentSlide; i++) {
            newDot[i].parentNode.removeChild(newDot[i]);//удал. элемент из коллекции
          }
        }
        currentSlide = 0;//обнуляем
      }


    } else if (target.matches('#arrow-left')) {

      if (dotLength() > currentSlide) {//если длина псевдомассива >
        deletDots2();
        currentSlide--;
      }

    } else if (target.matches('.dot')) {
      newDot.forEach((elem, index) => {//для сравнения точки и нажатого таргета
        if (elem === target) {
          currentSlide = index;//присваиваем акт. индекс слайду
          if (currentSlide > 0) {
            deletDots();

          } else if (currentSlide === 0) {
            deletDots();
            startSlide();
          }
        }
      });
    }

    if (currentSlide >= slide.length) {//начин. с начала
      if (dotLength() > currentSlide) {//если длина псевдомассива >
        deletDots2();
      }
      currentSlide = 0;
    }

    if (currentSlide < 0) {//возврат на предыдущий слайд
      currentSlide = slide.length - 1;//длина массива > на 1, поэтому -1

      let dotLength = document.querySelectorAll('.dot').length;

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

export default slider;