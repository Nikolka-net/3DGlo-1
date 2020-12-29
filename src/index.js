'use strict';

import "@babel/polyfill";//решает многие проблемы совместимости
import 'nodelist-foreach-polyfill';//подключ. полифил foreach для IE11
import elementClosest from 'element-closest';
elementClosest(window);//вызываем его
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('1 january 2023');
//Menu
toggleMenu();
//Popup
togglePopUp();
//Tabs
tabs();
//Slider
slider();
//Our team
team();
//Calculator
calc();
//send-ajax-form
sendForm();
