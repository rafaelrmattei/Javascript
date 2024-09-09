let fighters = [
  new Knight('Galahad the Valiant'),
  new Knight('Aric Thunderstrike'),
  new Knight('Cedric Ironheart'),
  new Knight('Reginald the Brave'),
  new Knight('Alistair Dragonbane'),
  new Knight('Eamon Steelblade'),
  new Knight('Tristan Stormrider'),
  new Knight('Valerius the Bold'),
  new Knight('Garrick Lionheart'),
  new Knight('Thorne Darkblade'),
  new Sorcerer('Eldric the Enchanter'),
  new Sorcerer('Magnus Shadowcaster'),
  new Sorcerer('Thalor the Mystic'),
  new Sorcerer('Xander Nightshade'),
  new Sorcerer('Alaric Stormweaver'),
  new Sorcerer('Vesper Darkspell'),
  new Sorcerer('Orin the Arcane'),
  new Sorcerer('Malchior the Wise'),
  new Sorcerer('Seraphis the Sorcerer'),
  new Sorcerer('Zaneth the Mysterious'),
  new LittleMonster('Nibble the Mischievous'),
  new LittleMonster('Spikey the Tiny Terror'),
  new LittleMonster('Grimble the Gremlin'),
  new LittleMonster('Scamp the Sneaky'),
  new LittleMonster('Snarl the Small'),
  new LittleMonster('Pipsqueak the Menace'),
  new LittleMonster('Thorn the Trickster'),
  new LittleMonster('Wriggle the Wily'),
  new LittleMonster('Scrappy the Fierce'),
  new LittleMonster('Peep the Pest'),
  new BigMonster('Grendel the Mighty'),
  new BigMonster('Ragnar the Ravager'),
  new BigMonster('Thundor the Colossal'),
  new BigMonster('Krull the Crusher'),
  new BigMonster('Behemoth the Unstoppable'),
  new BigMonster('Brutus the Brutal'),
  new BigMonster('Goliath the Giant'),
  new BigMonster('Titanus the Terrible'),
  new BigMonster('Fangor the Ferocious'),
  new BigMonster('Direclaw the Devourer')    
]

let log = new Log(document.querySelector('.log'))

const stage = new Stage(
  fighters[Math.floor(Math.random() * 40)],
  fighters[Math.floor(Math.random() * 40)],
  document.querySelector('#playerOne'),
  document.querySelector('#playerTwo'),
  log
)

document.querySelector("#btnStart").addEventListener('click',() => {
  stage.start()
})

stage.update()