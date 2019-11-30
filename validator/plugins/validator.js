'use strict';

class Validator {
  constructor({ selector, pattern = {}, method }) {//идентификаторы
    this.form = document.querySelector(selector);//получ. форму
    this.pattern = pattern;
    this.method = method;
    //создаём новый массив с по-ю spred оператора и [], добавляем туда только input. filter работает с массивом
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' &&
        item.type !== 'button';
    });
    this.error = new Set();//уникальная коллекция, куда перед. наш элемент, на ко-м произошла ошибка
  }

  init() {
    this.applyStyle();//вызываем метод создания style
    this.setPattern();//метод устанавл. паттерны: наши и пользователя
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));//навешиваем событие, вызыв. f.chekIt, привязываем this к chekIt
    this.form.addEventListener('submit', event => {//блокировка кнопки, если не прошли валидацию
      this.elementsForm.forEach(elem => this.chekIt({ target: elem }));//проверка на пустые поля, из объекта добав. elem
      if (this.error.size) {//если size содержит ошибки (в Set)
        event.preventDefault();
      }
    });
  }

  isValid(elem) {//валидация
    const validatorMethod = {
      notEmpty(elem) {//проверка на пустую строку
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {//проверка паттернов с по-ю test
        return pattern.test(elem.value);
      }
    };

    if (this.method) {//проверка: если метод не был передан
      const method = this.method[elem.id];//получаем правила: notEmpty, pattern, phone

      if (method) {//проверка правильно ли пользователь ввёл методы
        return method.every(item => {
          return validatorMethod[item[0]](elem, this.pattern[item[1]]);//возвр. true либо false
        });
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }
    return true;//поля зелёные если true
  }

  chekIt(event) {
    const target = event.target;//эл. ко-й вызвал событие

    if (this.isValid(target)) {//проверяем на валидность target (input)
      this.showSuccess(target);
      this.error.delete(target);//удал. из коллекц. эл., если нет ошибок
    } else {
      this.showError(target);
      this.error.add(target);//добавл. в коллекцию эл. с ошибкой
    }
  }

  showError(elem) {//ошибка валидации
    elem.classList.remove('success');//удаляем, чтобы стили не вносили путаницу
    elem.classList.add('error');//добавл. класс ошибка 
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {//если уже есть строка
      return;//новую не добавлять
    }
    const errorDiv = document.createElement('div');//div с текстом ошибки
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');//стили для div
    elem.insertAdjacentElement('afterend', errorDiv);//добавл. errorDiv в конец, после элемента
  }

  showSuccess(elem) {//валидация успешна
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {//есть ли такой элемент следующий, есть ли у него класс validator-error
      elem.nextElementSibling.remove();//элемент удаляем
    }
  }

  applyStyle() {//создаём тег со стилями
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green
    }
    input.error {
      border: 2px solid red
    }
    .validator-error {
      font-size: 12px;
      color: red;
      font-family: sans-serif
    }
    `;
    document.head.appendChild(style);//вставляем в head
  }
  setPattern() {//какие паттерны применять: пользователя или по-умолчанию

    if (!this.pattern.phone) {//если паттерн не передали
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;//то по-умолчанию
    }

    if (!this.pattern.email) {
      this.pattern.email = /^[\w-]+@\w+\.\w{2,}$/;
    }
  }
}

const valid = new Validator({
  selector: '#myform',
  pattern: {
    phone: /^\+38\d{7}$/,
    zip: /\d{5,6}/,
    message: /[^\sА-ЯЁа-яё]*$/
  },
  method: {
    'phone': [
      ['notEmpty'],
      ['pattern', 'phone'],
    ],
    'email': [
      ['notEmpty'],
      ['pattern', 'email'],
    ],
    'message': [
      ['notEmpty'],
      ['pattern', 'message'],
    ]

  }
});

valid.init();//запускаем