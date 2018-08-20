class Game {
  constructor(club_1, club_2) {
    this.club1 = club_1;
    this.club2 = club_2;
    this.gp = Math.floor(Math.random() * 11) + 5;
    this.c1op = this.club1.clubPower.offensive+this.club1.clubPower.fan;
    this.c1dp = this.club1.clubPower.defensive+this.club1.clubPower.fan;
    this.c2op = this.club2.clubPower.offensive+this.club2.clubPower.fan;
    this.c2dp = this.club2.clubPower.defensive+this.club2.clubPower.fan;
    // Deplasman Guc Azalmasi
    this.c2op = Math.floor(this.c2op*.75);
    this.c2dp = Math.floor(this.c2dp*.75);
    this.c1gc = 0;
    this.c2gc = 0;
  }

  // Game Info
  set club1(club) {
    this._club1 = club;
  }
  get club1() {
    return this._club1;
  }
  set club2(club) {
    this._club2 = club;
  }
  get club2() {
    return this._club2;
  }
  set gp(count) {
    this._gp = count;
  }
  get gp() {
    return this._gp;
  }

  // Power Info
  set c1op(power) {
    this._c1op = power;
  }
  get c1op() {
    return this._c1op;
  }
  set c2op(power) {
    this._c2op = power;
  }
  get c2op() {
    return this._c2op;
  }
  set c1dp(power) {
    this._c1dp = power;
  }
  get c1dp() {
    return this._c1dp;
  }
  set c2dp(power) {
    this._c2dp = power;
  }
  get c2dp() {
    return this._c2dp;
  }

  // Game Result Info
  set c1gc(count) {
    this._c1gc = count;
  }
  get c1gc() {
    return this._c1gc;
  }
  set c2gc(count) {
    this._c2gc = count;
  }
  get c2gc() {
    return this._c2gc;
  }
}

module.exports = Game;
