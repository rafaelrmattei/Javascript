document.body.addEventListener('keyup', (e) => {  
  playSound(e.code.toLowerCase())
})

document.querySelector('#composer button').addEventListener('click', () => {
  let song = document.querySelector('#composer input').value 
  song != '' ? playComposition(song.split('')) : null
})

const playSound = (keyPressed) => {  
  let audioElement = document.querySelector(`#s_${keyPressed}`)
  let keyElement = document.querySelector(`div[data-key="${keyPressed}"]`)
  if(audioElement){
    audioElement.currentTime = 0
    audioElement.play()
    keyElement.classList.add('active')
    setTimeout(() => {
      keyElement.classList.remove('active')
    }, 100);
  }    
}

const playComposition = (composition) => {
  let gap = 0
  for(let note of composition){
    setTimeout(() => {
      playSound(`key${note}`)
    }, gap);
    gap += 300
  }
}