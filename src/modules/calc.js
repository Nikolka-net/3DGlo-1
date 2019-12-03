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

export default calc;