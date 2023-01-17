import { ByteSize } from '../Enums/ByteSize'
import { ArgumentNullException } from '../Exceptions/ArgumentNullException'
import { OverflowException } from '../Exceptions/OverflowException'
import { Reference } from '../Utils/Reference'

/** Represents an 8-bit unsigned integer. */
export class Byte {
  /** Represents the largest possible value of a Byte. This field is constant. */
  public static readonly MaxValue = 255

  /** Represents the smallest possible value of a Byte. This field is constant. */
  public static readonly MinValue = 0

  /** Represents the number of bytes required to store a Byte. This field is constant. */
  public static readonly Size = ByteSize.Byte

  /**
   * Converts the string representation of a number in a specified style and culture-specific format to its Byte equivalent.
   * @param value A string or number that contains a number to convert. The string is interpreted using the style specified by style.
   * @returns A byte value that is equivalent to the number contained in s.
   * @throws {ArgumentNullException} value is null.
   * @throws {OverflowException} value represents a number less than Byte.MinValue or greater than Byte.MaxValue.
   */
  public static Parse(value: number | string): number {
    if (typeof value === 'undefined' || value === null) {
      throw new ArgumentNullException('value')
    }

    if (typeof value === 'string') {
      value = Number(value)
    }

    if (value > Byte.MaxValue || value < Byte.MinValue) {
      throw new OverflowException('Value was either too large or too small')
    }

    return value
  }

  /**
   * Tries to convert the string representation of a number to its Byte equivalent, and returns a value that indicates whether the conversion succeeded.
   * @param value A string or number that contains a number to convert.
   * @param result When this method returns, contains the Byte value equivalent to the number contained in s if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.
   * @returns true if s was converted successfully; otherwise, false.
   */
  public static TryParse(value: any, result: Reference<number>): boolean {
    if (typeof value === 'undefined' || value === null) {
      return false
    }

    if (typeof value !== 'string') {
      value = Number(value)
    }

    if (value > Byte.MaxValue || value < Byte.MinValue) {
      return false
    }

    result.Value = value
    return true
  }
}
