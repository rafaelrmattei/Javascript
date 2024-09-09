//ITEMS
let areas = {
  a: null,
  b: null,
  c: null
}

//FUNCTIONS ITEM
const dragStart = (e) => e.currentTarget.classList.add('dragging')
const dragEnd = (e) => e.currentTarget.classList.remove('dragging')

//FUNCTIONS AREA
const dragOver = (e) => {
  if (e.currentTarget.querySelector('.item') === null) {
    e.preventDefault()
    e.currentTarget.classList.add('hover')
  }
}

const dragLeave = (e) => e.currentTarget.classList.remove('hover')

const drop = (e) => {
  e.currentTarget.classList.remove('hover')
  let dragItem = document.querySelector('.item.dragging')
  e.currentTarget.querySelector('.item') === null ? e.currentTarget.appendChild(dragItem) : null
  updateAreas()
}

//FUNCTIONS NEUTRAL/BACK
const dragOverBack = (e) => {
  e.preventDefault()
  e.currentTarget.classList.add('hover')
}

const dragLeaveBack = (e) => e.currentTarget.classList.remove('hover')

const dropBack = (e) => {
  e.currentTarget.classList.remove('hover')
  let dragItem = document.querySelector('.item.dragging')
  e.currentTarget.appendChild(dragItem)
  updateAreas()
}

//LOGICAL FUNCTIONS
const updateAreas = () => {
  document.querySelectorAll('.area').forEach(area => {
    let dataName = area.getAttribute('data-name')
    area.querySelector('.item') !== null ? areas[dataName] = area.querySelector('.item').innerHTML : areas[dataName] = null
  })
  areas.a === '1' && areas.b === '2' && areas.c === '3' ? document.querySelector('.areas').classList.add('correct') : document.querySelector('.areas').classList.remove('correct')
}

//EVENTS
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(area => {
  area.addEventListener('dragover', dragOver)
  area.addEventListener('dragleave', dragLeave)
  area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverBack)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveBack)
document.querySelector('.neutralArea').addEventListener('drop', dropBack)
