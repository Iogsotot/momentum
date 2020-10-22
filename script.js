// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
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
  let today = date,
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
  let today = date,
    hour = today.getHours();

  if (hour >= 6 && hour < 12 ) {
    // Morning
    document.body.style.backgroundImage = "url('./assets/images/morning/01.jpg')";
    greeting.textContent = 'Доброе утро, ';
  } else if (hour >= 12 && hour < 18) {
    // Day
    document.body.style.backgroundImage = "url('./assets/images/day/01.jpg')";
    greeting.textContent = 'Добрый день, ';
  } else if (hour >= 18 && hour <= 23) {
    // Evening
    document.body.style.backgroundImage = "url('./assets/images/evening/01.jpg')";
    greeting.textContent = 'Добрый вечер, ';
  } else {
    // Night
    document.body.style.backgroundImage = "url('./assets/images/night/01.jpg')";
    greeting.textContent = 'Прекрасная ночь, ';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {            // на всякий случай страхуем вторым условием - e.keyCode
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
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
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

//Get month name
function getMonthName() {
  let today = date;
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня',
                'Июля', 'Августа', 'Сентября', 'Октяря', 'Ноября', 'Декабря'];
  return months[today.getMonth()]
}

// Get weekDay
function getWeekDay() {
  let today = date;
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 
            'Пятница', 'Суббота'];

  return days[today.getDay()];
}

//Hide placeholder


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getMonthName();
getWeekDay();
