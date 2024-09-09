document.querySelector("#search").addEventListener('submit', (e) => {

  e.preventDefault()
  let location = document.querySelector('#search input').value

  if (location != '') {
    showMessage('Loading...')
    hideInfo()
    setWeather(location)
  } else {
    showMessage('Location\'s mandatory...')
  }

})

const setWeather = async (location) => {

  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(location)}&appid=06d30504865f8a523b07cbe83ea66cb7&units=metric&lang=pt_br`)
  let json = await response.json()

  if (json.cod == 200) {
    hideMessage()
    setInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      icon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg
    })
    showInfo()
  } else {
    showMessage('Location not found!')
    setInterval(hideMessage, 3000)
  }

}

const setInfo = (json) => {
  document.querySelector('.city').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.icon}@2x.png`
  document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
  document.querySelector('.windPoint').style.transform = `rotate(${json.windAngle - 90}deg)`
}

const showMessage = (message) => {
  document.querySelector('#weather #alerts').style.display = 'block'
  document.querySelector('#weather #alerts').innerHTML = message
}

const hideMessage = () => document.querySelector('#weather #alerts').style.display = 'none'

const showInfo = () => document.querySelector('#result').style.display = 'block'
const hideInfo = () => document.querySelector('#result').style.display = 'none'


// eb7dcaaf89e126dbc8ca5c3d05468a47
// weatherJsStudy