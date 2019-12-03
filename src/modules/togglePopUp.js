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

export default togglePopUp;