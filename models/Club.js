const Power = require('./Power');

class Club {
  constructor(name) {
    this.name = name;
    this.clubPower = new Power(Math.floor(Math.random()*50)+50, Math.floor(Math.random()*50)+50, Math.floor(Math.random()*50)+50);
    this.gameCount = 0;
    this.winCount = 0;
    this.drawnCount = 0;
    this.GFCount = 0;
    this.GACount = 0;
  }

  // Club Info
  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set clubPower(power) {
    this._clubPower = power;
  }
  get clubPower() {
    return this._clubPower;
  }

  // Game Info
  set gameCount(count) {
    this._gameCount = count;
  }
  get gameCount() {
    return this._gameCount;
  }
  set winCount(count) {
    this._winCount = count;
  }
  get winCount() {
    return this._winCount;
  }
  set drawnCount(count) {
    this._drawnCount = count;
  }
  get drawnCount() {
    return this._drawnCount;
  }
  get loseCount() {
    return this._gameCount-this._winCount-this._drawnCount;
  }
  get points() {
    return (this.winCount*3)+this.drawnCount;
  }

  // Goal Info
  set GFCount(count) {
    this._GFCount = count;
  }
  get GFCount() {
    return this._GFCount;
  }
  set GACount(count) {
    this._GACount = count;
  }
  get GACount() {
    return this._GACount;
  }
  get GDCount() {
    return this._GFCount-this._GACount;
  }

  // Helper Functions
  addGame(GF, GA) {
    this.GFCount+=GF;
    this.GACount+=GA;
    if(GF>GA)
      this.winCount++;
    else if(GF==GA)
      this.drawnCount++;
    this.gameCount++;
  }
  removeGame(GF, GA) {
    this.GFCount-=GF;
    this.GACount-=GA;
    if(GF>GA)
      this.winCount--;
    else if(GF==GA)
      this.drawnCount--;
    this.gameCount--;
  }
  toString() {
    return this.name;
  }
}

module.exports = Club;
