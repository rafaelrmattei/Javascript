const players = ['o', 'x']
const lines = [123, 456, 789, 147, 258, 369, 159, 357]

const resetMatch = () => location.reload()
const sortPlayer = () => players[Math.floor(Math.random() * 2)]
const actualPlayer = () => document.querySelector('.turn-result').innerHTML
const togglePlayer = () => actualPlayer() == 'x' ? document.querySelector('.turn-result').innerHTML = 'o' : document.querySelector('.turn-result').innerHTML = 'x'
const freeSpots = () => document.querySelectorAll('.free-spot').length
const checkLine = () => {
  let oLine = '', xLine = ''
  document.querySelectorAll('.o-spot').forEach(e => oLine += e.getAttribute('data-spot'))
  document.querySelectorAll('.x-spot').forEach(e => xLine += e.getAttribute('data-spot'))
  for (let i = 0; i <= oLine.length - 3; i++) {
    if(lines.includes(parseInt(oLine.substring(i, i + 3)))) return true
  }
  for (let i = 0; i <= xLine.length - 3; i++) {
    if(lines.includes(parseInt(xLine.substring(i, i + 3)))) return true
  }  
  return false
}
const takeTurn = (element) => {
  if (element.target.classList.contains('free-spot')) {
    document.getElementById(element.target.id).classList.remove('free-spot')
    document.getElementById(element.target.id).classList.add(`${actualPlayer()}-spot`)
    document.getElementById(element.target.id).innerHTML = actualPlayer()
    if(checkLine()){
      document.querySelector(".winner-result").innerHTML = actualPlayer()
      document.querySelector(".turn-result").innerHTML = '--'
      document.querySelectorAll('.spot').forEach(element => element.classList.remove('free-spot'))
    } else if(freeSpots() === 0){    
      document.querySelector(".winner-result").innerHTML = 'Draw'
      document.querySelector(".turn-result").innerHTML = '--'
    } else {      
      togglePlayer()
    }
  }
}

document.querySelector('#btn-reset').addEventListener('click', resetMatch);
document.querySelector('.turn-result').innerHTML = sortPlayer()
document.querySelectorAll('.spot').forEach(element => element.addEventListener('click', takeTurn))