'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('1 january 2020');
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