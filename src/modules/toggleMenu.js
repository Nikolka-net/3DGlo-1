const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');//с помощью css
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

export default toggleMenu;