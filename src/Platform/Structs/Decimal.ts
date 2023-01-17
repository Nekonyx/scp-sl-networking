import { ByteSize } from '../Enums/ByteSize'
import { CommonMath } from '../Utils/CommonMath'

/** Represents a decimal floating-point number. */
export class Decimal {
  public static readonly MaxValueString = '79228162514264337593543950335'

  public static readonly MinValueString = '-79228162514264337593543950335'

  public static readonly MaxValueSafe = BigInt(Decimal.MaxValueString)

  public static readonly MinValueSafe = BigInt(Decimal.MinValueString)

  /** Represents the largest possible value of Decimal. This field is constant and read-only. */
  public static readonly MaxValue = Number(Decimal.MaxValueString)

  /** Represents the number negative one (-1). */
  public static readonly MinValue = Number(Decimal.MinValueString)

  /** Represents the number of bytes required to store a Decimal. This field is constant. */
  public static readonly Size = ByteSize.Decimal

  public static Sanitize(value: bigint): bigint
  public static Sanitize(value: number): number
  public static Sanitize(value: bigint | number): bigint | number {
    if (typeof value === 'bigint') {
      return CommonMath.ClampLong(
        value,
        Decimal.MinValueSafe,
        Decimal.MaxValueSafe
      )
    } else {
      return CommonMath.Clamp(value, Decimal.MinValue, Decimal.MaxValue)
    }
  }
}
