class Character {

  _life = 1
  maxLife = 1
  attack = 0
  defense = 0

  constructor(name) {
    this.name = name
  }

  get life() {
    return this._life
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife
  }

}

class Knight extends Character {
  type = 'Knight'
  constructor(name) {
    super(name)
    this.life = 100
    this.attack = 10
    this.defense = 8
    this.maxLife = this.life
  }
}

class Sorcerer extends Character {
  type = 'Sorcerer'
  constructor(name) {
    super(name)
    this.life = 80
    this.attack = 15
    this.defense = 3
    this.maxLife = this.life
  }
}

class LittleMonster extends Character {
  type = 'Little Monster'
  constructor(name) {
    super(name)
    this.life = 40
    this.attack = 4
    this.defense = 4
    this.maxLife = this.life
  }
}

class BigMonster extends Character {
  type = 'Big Monster'
  constructor(name) {
    super(name)
    this.life = 120
    this.attack = 16
    this.defense = 6
    this.maxLife = this.life
  }
}

class Stage {

  fightStatus = false

  constructor(fighter1, fighter2, fighter1Element, fighter2Element, log) {
    this.fighter1 = fighter1
    this.fighter2 = fighter2
    this.fighter1Element = fighter1Element
    this.fighter2Element = fighter2Element
    this.log = log
  }

  start() {
    this.log.add(`BATTLE BEGINS: ${this.fighter1.name} X ${this.fighter2.name}`)
    this.fightStatus = true
    document.querySelector('#btnStart').disabled = true
    document.querySelector('#btnStart').innerHTML = 'Battle\'s Running'
    let dead = false
    let interval = false
    let fight = setInterval(() => {
      if (this.fightStatus) {
        if (!interval) {
          dead = this.attack(this.fighter1, this.fighter2)
          if(!dead){
            interval = true
            setTimeout(() => {
              this.attack(this.fighter2, this.fighter1)
              interval = false;
            }, 3500);    
          }
        }
      } else {
        clearInterval(fight);
      }
    }, 3500);
  }

  update() {

    this.fighter1Element.querySelector('.name').innerHTML = `${this.fighter1.name}`
    this.fighter1Element.querySelector('.type').innerHTML = `${this.fighter1.type}`
    this.fighter1Element.querySelector('.hp').innerHTML = `HP: ${this.fighter1.life.toFixed(2)}`
    let fighter1LifePct = (this.fighter1.life / this.fighter1.maxLife) * 100
    this.fighter1Element.querySelector('.bar').style.width = `${fighter1LifePct}%`

    this.fighter2Element.querySelector('.name').innerHTML = `${this.fighter2.name}`
    this.fighter2Element.querySelector('.type').innerHTML = `${this.fighter2.type}`
    this.fighter2Element.querySelector('.hp').innerHTML = `HP: ${this.fighter2.life.toFixed(2)}`
    let fighter2LifePct = (this.fighter2.life / this.fighter2.maxLife) * 100
    this.fighter2Element.querySelector('.bar').style.width = `${fighter2LifePct}%`

  }

  attack(attacker, attacked) {

    if (this.dead()) {
      this.fightStatus = false
      this.log.add(`${attacker.name} dies`)
      this.log.add((`${attacked.name} wins!`).toUpperCase())
      document.querySelector('#btnStart').innerHTML = 'Battle Ends'
      return true;
    }

    let attackFactor = (Math.random() * 2).toFixed(2)
    let defenseFactor = (Math.random() * 2).toFixed(2)

    let actualAttack = (attacker.attack * attackFactor).toFixed(2)
    let actualDefence = (attacked.defense * defenseFactor).toFixed(2)

    if (actualAttack > actualDefence) {
      attacked.life -= actualAttack
      this.log.add(`${attacker.name.split(' ')[0]}'s attacking ${attacked.name.split(' ')[0]} - Damage: ${actualAttack}`)
    } else {
      this.log.add(`${attacker.name.split(' ')[0]}'s attacking ${attacked.name.split(' ')[0]} - He blocks`)
    }

    this.update()

  }

  dead() {
    if (this.fighter1.life <= 0 || this.fighter2.life <= 0){
      return true
    }
    return false
  }

}

class Log {

  constructor(log) {
    this.log = log
  }

  add(message) {
    let newLog = document.createElement('li')
    newLog.innerHTML = message
    this.log.prepend(newLog)
  }

}