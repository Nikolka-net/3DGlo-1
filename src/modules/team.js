const team = () => {

  const command = document.querySelector('#command');

  command.addEventListener('mouseover', (event) => {//при наведении
    const target = event.target;

    if (target.matches('.command__photo')) {//если навели на этот элемент
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

export default team;