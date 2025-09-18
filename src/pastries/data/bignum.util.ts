import { SUFFIXES } from './suffixes.util';

const MAX_EXPONENT = 63;

export class BigNum {
  mantissa: number;
  exponent: number;

  constructor(mantissa: number, exponent: number) {
    this.mantissa = mantissa || 0;
    this.exponent = exponent || 0;
    this.normalize();
  }

  // Ensure 1 <= |mantissa| < 10 (unless zero) and clamp to MAX_EXPONENT
  private normalize() {
    if (!isFinite(this.mantissa) || isNaN(this.mantissa)) {
      this.mantissa = 0;
      this.exponent = 0;
      return;
    }

    if (this.mantissa === 0) {
      this.exponent = 0;
      return;
    }

    const sign = Math.sign(this.mantissa);
    let mag = Math.abs(this.mantissa);

    // push mantissa into [1,10)
    while (mag >= 10 && this.exponent < MAX_EXPONENT) {
      mag /= 10;
      this.exponent++;
    }
    while (mag < 1 && mag !== 0) {
      mag *= 10;
      this.exponent--;
    }

    this.mantissa = mag * sign;

    // clamp to Vigintillion
    if (this.exponent >= MAX_EXPONENT) {
      this.exponent = MAX_EXPONENT;
      this.mantissa = sign >= 0 ? 9.99 : -9.99;
    }
  }

  clone(): BigNum {
    return new BigNum(this.mantissa, this.exponent);
  }

  toObject() {
    return { mantissa: this.mantissa, exponent: this.exponent };
  }

  static fromObject(o: { mantissa: number; exponent: number }): BigNum {
    return new BigNum(o.mantissa ?? 0, o.exponent ?? 0);
  }

  // compare: returns 1 if a>b, 0 if equal, -1 if a<b
  static compare(a: BigNum, b: BigNum): number {
    if (!a || !b) throw new Error('BigNum.compare: invalid args');
    // quick zero check
    if (a.mantissa === 0 && b.mantissa === 0) return 0;
    if (a.exponent === b.exponent) {
      if (a.mantissa === b.mantissa) return 0;
      return a.mantissa > b.mantissa ? 1 : -1;
    }
    return a.exponent > b.exponent ? 1 : -1;
  }

  static add(a: BigNum, b: BigNum): BigNum {
    if (a.mantissa === 0) return b.clone();
    if (b.mantissa === 0) return a.clone();

    // same exponent — simple add
    if (a.exponent === b.exponent) {
      return new BigNum(a.mantissa + b.mantissa, a.exponent);
    }

    // align to the larger exponent
    let larger = a,
      smaller = b;
    if (b.exponent > a.exponent) {
      larger = b;
      smaller = a;
    }
    const diff = larger.exponent - smaller.exponent;

    // if difference is huge, smaller number negligible
    if (diff > 50) {
      return larger.clone();
    }

    const adjustedSmallMantissa = smaller.mantissa / Math.pow(10, diff);
    return new BigNum(larger.mantissa + adjustedSmallMantissa, larger.exponent);
  }

  static subtract(a: BigNum, b: BigNum): BigNum {
    // Implement as addition with the negated subtrahend
    return BigNum.add(a, new BigNum(-b.mantissa, b.exponent));
  }

  static multiply(a: BigNum, b: BigNum): BigNum {
    return new BigNum(a.mantissa * b.mantissa, a.exponent + b.exponent);
  }

  // format as suffix-based string, e.g. "1.23M"
  toSuffixString(decimals: number = 2): string {
    if (this.mantissa === 0) return '0';
    // clamp exponent (safety)
    const exp = Math.min(this.exponent, MAX_EXPONENT);
    const suffixIndex = Math.floor(exp / 3);
    const suffix = SUFFIXES[suffixIndex] ?? 'Vg';

    // scaled shows leading digits before suffix
    const mod = exp % 3;
    const scaled = this.mantissa * Math.pow(10, mod);
    // In some edge cases scaled might be >=1000 if mantissa ~9.99 and mod pushes it,
    // but the suffix indexing is still fine for readability.
    return `${scaled.toFixed(decimals)}${suffix}`;
  }
}
