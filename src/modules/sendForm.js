const sendForm = () => {
  const errorMessage = 'Что-то пошло не так ...',
    loadMessage = 'Загрузка ...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.getElementById('form1');
  const form2 = document.getElementById('form2');
  const form3 = document.getElementById('form3');
  const bodyPage = document.querySelector('body');


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
      .then((response) => {//данные, ко-е мы получаем
        if (response.status !== 200) {
          throw new Error('status network not 200');//обрабатываем как ошибку через конструктор
        }
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

  bodyPage.addEventListener('input', (event) => {
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
    return fetch('./server.php', {//отправка запроса на сервер с по-ю промисов
      method: 'POST',//отправляем и получаем
      headers: {//заголовки
        'Content-Type': 'application/json'//сообщаем серверу, что передаём json
      },
      body: JSON.stringify(body),//преобр. данные (~body) в json(строка) и передаём
      credentials: 'include',//возможна проверка с по-ю cookie на сервере, передача учёт. записи; 'some-origin' - только в нашем домене, 'include' во всех    
      cache: 'default' //лучше выставлять, т.к. в браузерах бывает по др.
    });

  };

};

export default sendForm;