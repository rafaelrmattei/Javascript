//ELEMENTS
const btnColor = document.querySelector('#color')
const btnReset = document.querySelector('#btnReset')
const canvasBoard = document.querySelector('#board')
let currentColor = btnColor.value
let ctx = canvasBoard.getContext('2d')
let canDraw = false
let mouseX = 0
let mouseY = 0

//FUNCTIONS
const changeColor = () => currentColor = btnColor.value
const mouseDown = (e) => {
  canDraw = true
  mouseX = e.pageX - canvasBoard.offsetLeft
  mouseY = e.pageY - canvasBoard.offsetTop
}
const mouseMove = (e) => {
  if (canDraw) {
    draw(e.pageX, e.pageY)
  }
}
const mouseUp = () => {
  canDraw = false
}
const draw = (x, y) => {

  let pointX = x - canvasBoard.offsetLeft
  let pointY = y - canvasBoard.offsetTop

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.moveTo(mouseX, mouseY)
  ctx.lineTo(pointX, pointY)
  ctx.closePath()
  ctx.strokeStyle = currentColor
  ctx.stroke()

  mouseX = pointX
  mouseY = pointY

}
const cleanBoard = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

//EVENTS
btnColor.addEventListener('change', changeColor)
canvasBoard.addEventListener('mousedown', mouseDown)
canvasBoard.addEventListener('mousemove', mouseMove)
canvasBoard.addEventListener('mouseup', mouseUp)
btnReset.addEventListener('click', cleanBoard)