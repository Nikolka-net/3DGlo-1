const countTimer = (deadline) => {
  const timerDays = document.querySelector('#timer-days'),
    timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaining = () => {
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
export default countTimer;