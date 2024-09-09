const clock = document.querySelector('#digital')
const handH = document.querySelector('.p_h')
const handM = document.querySelector('.p_m')
const handS = document.querySelector('.p_s')

const fixZero = (time) => time.toString().padStart(2, '0')

const updateClocks = () => {

  let now = new Date()
  let h = now.getHours()
  let m = now.getMinutes()
  let s = now.getSeconds()

  clock.innerHTML = `${fixZero(h)}:${fixZero(m)}:${fixZero(s)}`

  let sDeg = ((360 / 60) * s) - 90
  let mDeg = ((360 / 60) * m + (s / 10) - 90)
  let hDeg = ((360 / 12) * h + (m / 2) + (s / 120)) - 90;

  handS.style.transform = `rotate(${sDeg}deg)`
  handM.style.transform = `rotate(${mDeg}deg)`
  handH.style.transform = `rotate(${hDeg}deg)`
  
}

setInterval(updateClocks, 1000);
updateClocks()