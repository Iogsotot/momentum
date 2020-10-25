const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const error = document.querySelector('.error');
const errorImg = document.querySelector('svg');
const mock = document.querySelector('.weather-mock');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=6ba25fbc62d3d73369c6be9caf83a8d7&units=metric`;
    const promise = await fetch(url);
    // console.log('Промис: ' + promise.status);
    if (promise.ok) {                                       //если всё ок, то покажи юзеру погоду
        var data = await promise.json();
        error.style.visibility = 'hidden';
        mock.style.display = 'none';
        errorImg.style.display = 'none';
        city.style.background = 'transparent';
        city.style.border = 'none';
    } else if (promise.status !== 404) {                     // ошибка на пустой ввод
        mock.style.display = 'block';
        city.style.background = 'rgba(0, 0, 0, 0.5)';
        city.style.border = '2px solid black';
        wind.textContent = '';
        humidity.textContent = '';
        weatherDescription.textContent = '';
        temperature.textContent = '';
        errorImg.style.display = 'none';
        error.style.visibility = 'hidden';
    } else {                                                    //ошибка на всякую фигню в поле city
        city.style.background = 'rgba(0, 0, 0, 0.5)';
        error.style.visibility = 'visible';
        mock.style.display = 'none';
        errorImg.style.display = 'block';
        wind.textContent = '';
        humidity.textContent = '';
        weatherDescription.textContent = '';
        temperature.textContent = '';
    }


    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent = `Ветер ${data.wind.speed.toFixed(0)} м/с ${getDirection(data.wind.deg)}`;
    humidity.textContent = `Относительная влажность ${data.main.humidity.toFixed(0)}%`;
    weatherDescription.textContent = data.weather[0].description;
}


// Wind name
function getDirection(angle) {
    var directions = ['северный', 'северо-западный', 'западный', 'юго-западный', 'южный', 'юго-восточный', 'восточный', 'северо-восточный'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}

//Get city
function getCity() {
    if (!localStorage.getItem('city')) {
        city.value = '';
    } else {
        city.value = localStorage.getItem('city');
    }
}

// Check for empty string
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// Set city
function setCity(event) {
    if (event.type === 'keypress') {
        // Make sure enter is pressed
        if (event.which == 13 || event.keyCode == 13) {
            // console.log(event.target.value)
            if (!isBlank(event.target.value)) {
                localStorage.setItem('city', event.target.value);
                getWeather();
                city.blur();
            } else {
                getCity()
                city.blur();
            }
        }
    } else {
        if (!isBlank(event.target.value)) {
            localStorage.setItem('city', event.target.value);
            getWeather();
        } else {
            getCity()
        }
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

getCity();