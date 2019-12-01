'use strict';

const output = document.getElementById('output');

const getData = (url) => {

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();//создаём запрос
    request.open('GET', url);//получ. с адреса с API
    request.addEventListener('readystatechange', () => {//отлавливаем событие
      if (request.readyState !== 4) {//фильтруем
        return;
      }
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);//сохран. данные из json формата в объект
        resolve(response);//передаётся как колбек
      } else {
        reject(request.statusText);//выводим ошибку
      }
    });
    request.send();//открыв. соединение, отправл. запрос; это метод
  });

};

const outputPhotos = (data) => {//data - массив с фото, ко-й получили с по-ю getData()
  const random = Math.floor(Math.random() * data.length);//получ. случ. фото
  const obj = data[random];//выводим наш объект
  output.innerHTML = `<h4>${obj.title}</h4><img src="${obj.thumbnailUrl}" alt="${obj.title}">`;//выводим на стр. title объекта и фото

  // output.insertAdjacentHTML('beforebegin', `<h4>${data.title}</h4><img src="${data.thumbnailUrl}" alt="${data.title}">`);
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),//получ. 1 и 2 фото
  twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');


/* oneImg
  .then(outputPhotos)
  .catch(error => console.log(error));

twoImg
  .then(outputPhotos)
  .catch(error => console.log(error)); */

// Promise.race([oneImg, twoImg])//обрабыты-я только 1 промис, первый
//   .then(outputPhotos)
//   .catch(error => console.log(error));

getData(urlPhotos)//запрос к json файлу с данными по фото
  .then(outputPhotos)
  .catch(error => console.error(error)); 