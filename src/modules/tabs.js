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

export default tabs;