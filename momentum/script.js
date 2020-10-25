// DOM Elements
const time = document.querySelector('.time'),
greeting = document.querySelector('.greeting'),
nameElement = document.querySelector('.name'),
focus = document.querySelector('.focus'),
monthHtml = document.querySelector('.month'),
weekdayHtml = document.querySelector('.weekday'),
dayHtml = document.querySelector('.day');

// Date toggle
let date = new Date();
// let date = new Date(2011, 0, 1, 20, 0, 0, 0);    // for checking

// Options
const showAmPm = false;
let currentBgDaytime = null;
let currentBgNextHour = null;

// Infinite loop to update time and backgrounds
function updateScreen() {
  showTime();
  setBgGreet();
  setTimeout(updateScreen, 1000);
}

// Show Time
function showTime() {
  let today = new Date(),
  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds(),
  month = getMonthName(),
  weekDay = getWeekDay(),
  day = today.getDate();
  
  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';
  
  // 12hr Format
  // hour = hour % 12 || 12;
  
  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} 
  ${showAmPm ? amPm : ''}`;
  
  monthHtml.innerHTML = `${month}`;
  weekdayHtml.innerHTML = `${weekDay}`;
  dayHtml.innerHTML = `${day}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
  hour = today.getHours(),
  minutes = today.getMinutes(),
  seconds = today.getSeconds();
  if (!greeting.textContent) {
    if (hour >= 6 && hour < 12) {
      // Morning
      greeting.textContent = 'Доброе утро, ';
    } else if (hour >= 12 && hour < 18) {
      // Day
      greeting.textContent = 'Добрый день, ';
    } else if (hour >= 18 && hour <= 23) {
      // Evening
      greeting.textContent = 'Добрый вечер, ';
    } else {
      // Night
      greeting.textContent = 'Прекрасная ночь, ';
    }
  }
  if (currentBgNextHour == null && currentBgNextHour == null) {
    currentBgDaytime = getDayTime(hour);
    currentBgNextHour = getHourImage(hour, "next");
    changeBg(currentBgDaytime, getHourImage(hour, "next"))
  }
  if (minutes === 0 && seconds === 0) {
    currentBgDaytime = getDayTime(hour);
    currentBgNextHour = getHourImage(hour, "next");
    changeBg(currentBgDaytime, getHourImage(hour, "next"))
  }
}

function getCurrentBgElements() {
  bgCurrentEl = document.querySelector('.bg.current');
  bgNextEl = document.querySelector('.bg:not(.current)');
  return bgCurrentEl, bgNextEl
}

function getBgImageUrl(bgDayTime, bgHourIndex) {
  return `./assets/images/${bgDayTime}/${bgHourIndex}.jpg`
}

function changeBg(bgDayTime, bgNextName) {
  getCurrentBgElements();
  const img = document.createElement('img');
  const imgPath = getBgImageUrl(bgDayTime, addZero(bgNextName));
  img.src = imgPath;
  img.onload = () => {
    bgNextEl.style.backgroundImage = `url(${imgPath})`;
    bgNextEl.classList.toggle('current');
    bgCurrentEl.classList.toggle('current');
  };
}

function getHourImage(bgHour, bgEl) {
  if (bgEl == 'current') {
    return ShuffleBgArr[bgHour];
  }
  else if (bgEl == 'next') {
    if (bgHour == 23) return ShuffleBgArr[0];
    else return ShuffleBgArr[bgHour + 1]
  }
}

function getDayTime(bgHour) {
  if (bgHour >= 6 && bgHour < 12) {
    return 'morning';
  } else if (bgHour >= 12 && bgHour < 18) {
    return 'day';
  } else if (bgHour >= 18 && bgHour <= 23) {
    return 'evening';
  } else {
    return 'night';
  }
}

// Next img button
const NextImgBtn = document.querySelector('.img-next-btn');
function showNextImg() {
  changeBg(currentBgDaytime, ShuffleBgArr[currentBgNextHour]);
  currentBgNextHour = currentBgNextHour != 23 ? currentBgNextHour + 1 : 0
  currentBgDaytime = getDayTime(currentBgNextHour)
}

// Shuffle imgs array 
let bgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let arrMorning = shuffle(bgArr).slice(5, 11);   //шафлим и обрезаем массив картинок под количество часов во времени суток
let arrDay = shuffle(bgArr).slice(5, 11);
let arrEvening = shuffle(bgArr).slice(5, 11);
let arrNight = shuffle(bgArr).slice(5, 11);

let ShuffleBgArr = arrNight.concat(arrMorning).concat(arrDay).concat(arrEvening);

function shuffle(arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    nameElement.value = '';
  } else {
    nameElement.value = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {            // на всякий случай страхуем вторым условием - e.keyCode
      localStorage.setItem('name', e.target.value);
      nameElement.blur();
    }
  } else {
    localStorage.setItem('name', e.target.value);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.value = '';
  } else {
    focus.value = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.value);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.value);
  }
}

//Get month name
function getMonthName() {
  let today = new Date();
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  return months[today.getMonth()]
}

// Get weekDay
function getWeekDay() {
  let today = new Date();
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг',
  'Пятница', 'Суббота'];
  
  return days[today.getDay()];
}

NextImgBtn.addEventListener('click', showNextImg);

nameElement.addEventListener('keypress', setName);
nameElement.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
updateScreen();
getName();
getFocus();
getMonthName();
getWeekDay();
