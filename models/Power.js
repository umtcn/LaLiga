class Power {
  constructor(offensive, defensive, fan) {
    this.offensive = offensive;
    this.defensive = defensive;
    this.fan = fan;
  }

  set offensive(power) {
    this._offensive = power;
  }
  get offensive() {
    return this._offensive;
  }
  set defensive(power) {
    this._defensive = power;
  }
  get defensive() {
    return this._defensive;
  }
  set fan(power) {
    this._fan = power;
  }
  get fan() {
    return this._fan;
  }
}

module.exports = Power;
