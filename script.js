// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  nameElement = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  monthHtml = document.querySelector('.month'),
  weekdayHtml = document.querySelector('.weekday'),
  dayHtml =  document.querySelector('.day');

// Date toggle
let date = new Date();
// let date = new Date(2011, 0, 1, 20, 0, 0, 0);    // for checking

// Options
const showAmPm = false; 

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month = getMonthName(),
    weekDay = getWeekDay(),
    day = today.getDay();

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

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 12 ) {
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

// Changing background 
  function bgChanging () {
    let today = new Date();
    let bgHour = today.getHours();
    // let bgHour = 2
    let bgDayTime = getDayTime();
    document.body.style.backgroundImage = `url('./assets/images/${bgDayTime}/${addZero(bgHour)}.jpg')`;  //заменить bgHour на элемент массива картинок(и задать рандомное пересоздание массива при рефреше страницы)
    console.log( document.body.style.backgroundImage);

    function getDayTime() {
      if (bgHour >= 6 && bgHour < 12 ) {
        return 'morning';
      } else if (bgHour >= 12 && bgHour < 18) {
        return 'day';
      } else if (bgHour >= 18 && bgHour <= 23) {
        return 'evening';
      } else {
        return 'night';
      }
    }
  }


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
                'Июля', 'Августа', 'Сентября', 'Октяря', 'Ноября', 'Декабря'];
  return months[today.getMonth()]
}

// Get weekDay
function getWeekDay() {
  let today = new Date();
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 
            'Пятница', 'Суббота'];

  return days[today.getDay()];
}

// input size                                                 didn't work at all 
// let inputName = document.querySelector('.name');
// let inputFocus = document.querySelector('.focus');
// let NameSize = inputName.getAttribute('size');
// let FocusSize = inputFocus.getAttribute('size');
// let FocusElementSize = inputElement[1].getAttribute('size');


// function inputWidthChange(e) {
//   inputName.style.width = '23rem'
//   inputFocus.style.width = '15rem'
//   if (e.type === 'keypress') { 
//     console.log(inputName.style.width)
//     console.log(inputFocus.style.width)
//   } else {return}
// }

// nameElement.addEventListener('onchange', inputWidthChange);
// focus.addEventListener('onchange', inputWidthChange);

nameElement.addEventListener('keypress', setName);
nameElement.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
bgChanging();
getName();
getFocus();
getMonthName();
getWeekDay();
