const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=6ba25fbc62d3d73369c6be9caf83a8d7&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

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
        city.textContent = 'Лихтенштейн';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

// Set city
function setCity(event) {
    if (event.type === 'keypress') {
        // Make sure enter is pressed
        if (event.which == 13 || event.keyCode == 13) { 
            localStorage.setItem('city', event.target.innerText);
            getWeather();
            city.blur();
        } else {
            localStorage.setItem('city', event.target.innerText);
        }
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

getCity();