const apiKey = '85452a6bf7a9898e8e66577f15b53592'

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchTxt = document.querySelector('.search-form__txt')
const searchBtn = document.querySelector('.search-form__btn')

const weatherDisplay = document.querySelector('.weather')
const dataDisplay = document.querySelector('.data')
const error404 = document.querySelector('.error')

//Изменить значение html
const newValueByClass = (className, newValue) => {
  document.querySelector(className).innerHTML = newValue
}

const checkWeather = async city => {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json()

    error404.style.display = 'none'

    // Перевести время с Unix timestamp в UTC
    const timeSun = time => {
      const date = new Date(time * 1000)
      return date.toLocaleTimeString()
    }

    // Перевести давление в мм рт. ст.
    const hPaToMmHg = Math.round(data.main.pressure * 0.750062)

    newValueByClass('.weather__sity', data.name)
    newValueByClass('.weather__temp', data.main.temp + ' &#8451')
    newValueByClass('.weather__description', data.weather[0].description)
    newValueByClass('.data__feels-like', data.main.feels_like + ' &#8451')
    newValueByClass('.data__humidity', data.main.humidity + '%')
    newValueByClass('.data__wind-speed', data.wind.speed + ' m/s')
    newValueByClass('.data__pressure', hPaToMmHg + ' mmHg')
    newValueByClass('.data__sun-rise', timeSun(data.sys.sunrise))
    newValueByClass('.data__sun-set', timeSun(data.sys.sunset))

    weatherDisplay.style.display = 'block'
    dataDisplay.style.display = 'flex'

    const img = document.querySelector('.weather__image')

    switch (data.weather[0].main) {
      case 'Clouds':
        img.src = '/images/DayClouds.svg'
        break
      case 'Clear':
        img.src = '/images/DaySun.svg'
        break
      case 'Rain':
        img.src = '/images/DayRain.svg'
        break
      case 'Wind':
        img.src = '/images/DayWind.svg'
        break
      case 'Thunderstorm':
        img.src = '/images/DayStorm.svg'
        break
      case 'Snow':
        img.src = '/images/DaySnow.svg'
        break
    }
  } catch (error) {
    error404.style.display = 'block'
    weatherDisplay.style.display = 'none'
    dataDisplay.style.display = 'none'
    console.log('Произошла ошибка:', error.message)
  }
}

//Применяем функцию при клике
searchBtn.addEventListener('click', () => {
  checkWeather(searchTxt.value)
  searchTxt.value = ''
})

// enter = 13, вешаем слушатель на поиск по кнопке
searchTxt.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    checkWeather(searchTxt.value)
    searchTxt.value = ''
  }
})
