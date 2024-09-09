const defaultCharacter = {
  name: '',
  type: '',
  life: 1,
  maxLife: 1,
  attack: 0,
  defense: 0
}

const createKnight = (name) => {
  return {
    ...defaultCharacter,
    name: name,
    type: 'Knight',
    life: 100,
    maxLife: 100,
    attack: 10,
    defense: 8
  }
}

const createSorcerer = (name) => {
  return {
    ...defaultCharacter,
    name: name,
    type: 'Sorcerer',
    life: 50,
    maxLife: 50,
    attack: 14,
    defense: 3
  }
}

const createLittleMonster = (name) => {
  return {
    ...defaultCharacter,
    name: name,
    type: 'Little Monster',
    life: 40,
    maxLife: 40,
    attack: 4,
    defense: 4
  }
}

const createBigMonster = (name) => {
  return {
    ...defaultCharacter,
    name: name,
    type: 'Big Monster',
    life: 120,
    maxLife: 120,
    attack: 16,
    defense: 6
  }
}

const battle = {

  playerOne: null,
  playerTwo: null,
  attackerOrder: Math.floor(Math.random() * 2),
  elementOne: document.querySelector('#playerOne'),
  elementTwo: document.querySelector('#playerTwo'),

  prepareArena(playerOne, playerTwo) {

    this.playerOne = playerOne
    this.playerTwo = playerTwo

    this.setPlayers()
    this.updateLifeBar()

  },

  setPlayers() {

    this.elementOne.querySelector('.name').innerHTML = `${this.playerOne.name}`
    this.elementOne.querySelector('.type').innerHTML = `${this.playerOne.type}`
    this.elementTwo.querySelector('.name').innerHTML = `${this.playerTwo.name}`
    this.elementTwo.querySelector('.type').innerHTML = `${this.playerTwo.type}`

  },

  updateLifeBar() {

    let playerOneLifeBar = (this.playerOne.life / this.playerOne.maxLife) * 100
    this.elementOne.querySelector('.hp').innerHTML = `HP: ${this.playerOne.life.toFixed(2)}`
    this.elementOne.querySelector('.bar').style.width = `${playerOneLifeBar}%`

    let playerTwoLifeBar = (this.playerTwo.life / this.playerTwo.maxLife) * 100
    this.elementTwo.querySelector('.hp').innerHTML = `HP: ${this.playerTwo.life.toFixed(2)}`
    this.elementTwo.querySelector('.bar').style.width = `${playerTwoLifeBar}%`

  },

  start() {

    log.create(`BATTLE BEGINS: ${this.playerOne.name} X ${this.playerTwo.name}`)
    buttonBattle.disable().changeText(`Battle's Running`)

    runningBattle = setInterval(() => {
      this.attackerOrder === 0 ? this.attack(this.playerOne, this.playerTwo) : this.attack(this.playerTwo, this.playerOne)
      this.attackerOrder = this.changeAttackerOrder(this.attackerOrder)
      this.updateLifeBar()
      this.checkDead() ? this.finish() : null
    }, 500);

  },

  finish() {
    clearInterval(runningBattle)
    log.create(`${this.loser().name} died`)
    log.create(`BATTLE ENDS: ${this.winner().name} is the WINNER!`)
    buttonBattle.changeText(`Battle Ends`)
  },

  attack(attacker, attacked) {

    let attackFactor = (Math.random() * 2).toFixed(2)
    let defenseFactor = (Math.random() * 2).toFixed(2)
    let actualAttack = (attacker.attack * attackFactor).toFixed(2)
    let actualDefence = (attacked.defense * defenseFactor).toFixed(2)

    if (actualAttack > actualDefence) {
      attacked.life -= actualAttack
      attacked.life <= 0 ? attacked.life = 0 : attacked.life
      log.create(`${this.getFirstName(attacker.name)}'s attacking ${this.getFirstName(attacked.name)} - Damage: ${actualAttack}`)
    } else {
      log.create(`${this.getFirstName(attacker.name)}'s attacking ${this.getFirstName(attacked.name)} - Blocked!`)
    }

  },

  checkDead() {
    return this.playerOne.life <= 0 || this.playerTwo.life <= 0 ? true : false
  },

  loser() {
    return this.playerOne.life <= 0 ? this.playerOne : this.playerTwo
  },

  winner() {
    return this.playerOne.life <= 0 ? this.playerTwo : this.playerOne
  },

  getFirstName(name) {
    return name.split(' ')[0]
  },

  changeAttackerOrder(attacker) {
    return attacker === 0 ? 1 : 0
  }

}

const buttonBattle = {
  element: document.querySelector('#btnStart'),
  enable() {
    this.element.disabled = false
    return this
  },
  disable() {
    this.element.disabled = true
    return this
  },
  changeText(message) {
    this.element.innerHTML = message
    return this
  }
}

const log = {
  list: document.querySelector('.log'),
  create(message) {
    let newLog = document.createElement('li')
    newLog.innerHTML = message
    this.list.prepend(newLog)
  }
}