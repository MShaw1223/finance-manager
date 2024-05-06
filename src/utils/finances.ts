export class overviews {
  private value;
  private valueB;

  constructor(value: number, valueB: number) {
    this.value = value;
    this.valueB = valueB;
  }
  satisfiesDailySpend() {
    if (this.value < this.valueB) {
      return "This satisfies the spend";
    }
    if (this.value == this.valueB) {
      return "you have met the spend";
    }
    if (this.value > this.valueB) {
      return "Doesn't satisfy spend";
    }
  }
  amountToSave() {
    const percent = this.valueB / 100;
    return this.value * percent;
  }
  runningSpend() {
    return this.value + this.valueB;
  }
}
