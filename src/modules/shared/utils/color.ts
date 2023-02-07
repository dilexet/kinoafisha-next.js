export default class Color {
  private r: number;
  private g: number;
  private b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public setRgb(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public getRgb() {
    return [this.r, this.g, this.b];
  }

  public getRgbString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }

  public toHex(withNumberSign = true): string {
    const rHex1 = this.r.toString(16);
    const gHex1 = this.g.toString(16);
    const bHex1 = this.b.toString(16);

    const rHex2 = `0${rHex1}`.slice(-2);
    const gHex2 = `0${gHex1}`.slice(-2);
    const bHex2 = `0${bHex1}`.slice(-2);

    return withNumberSign ? `#${rHex2}${gHex2}${bHex2}` : rHex2 + gHex2 + bHex2;
  }
}
