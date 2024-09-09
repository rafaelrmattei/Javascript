const fighters = [
  createKnight('Galahad the Valiant'),
  createKnight('Aric Thunderstrike'),
  createKnight('Cedric Ironheart'),
  createKnight('Reginald the Brave'),
  createKnight('Alistair Dragonbane'),
  createKnight('Eamon Steelblade'),
  createKnight('Tristan Stormrider'),
  createKnight('Valerius the Bold'),
  createKnight('Garrick Lionheart'),
  createKnight('Thorne Darkblade'),
  createSorcerer('Eldric the Enchanter'),
  createSorcerer('Magnus Shadowcaster'),
  createSorcerer('Thalor the Mystic'),
  createSorcerer('Xander Nightshade'),
  createSorcerer('Alaric Stormweaver'),
  createSorcerer('Vesper Darkspell'),
  createSorcerer('Orin the Arcane'),
  createSorcerer('Malchior the Wise'),
  createSorcerer('Seraphis the Sorcerer'),
  createSorcerer('Zaneth the Mysterious'),
  createLittleMonster('Nibble the Mischievous'),
  createLittleMonster('Spikey the Tiny Terror'),
  createLittleMonster('Grimble the Gremlin'),
  createLittleMonster('Scamp the Sneaky'),
  createLittleMonster('Snarl the Small'),
  createLittleMonster('Pipsqueak the Menace'),
  createLittleMonster('Thorn the Trickster'),
  createLittleMonster('Wriggle the Wily'),
  createLittleMonster('Scrappy the Fierce'),
  createLittleMonster('Peep the Pest'),
  createBigMonster('Grendel the Mighty'),
  createBigMonster('Ragnar the Ravager'),
  createBigMonster('Thundor the Colossal'),
  createBigMonster('Krull the Crusher'),
  createBigMonster('Behemoth the Unstoppable'),
  createBigMonster('Brutus the Brutal'),
  createBigMonster('Goliath the Giant'),
  createBigMonster('Titanus the Terrible'),
  createBigMonster('Fangor the Ferocious'),
  createBigMonster('Direclaw the Devourer')    
]

battle.prepareArena(fighters[Math.floor(Math.random() * 40)], fighters[Math.floor(Math.random() * 40)])

document.querySelector("#btnStart").addEventListener('click',() => { 
  battle.start() 
})