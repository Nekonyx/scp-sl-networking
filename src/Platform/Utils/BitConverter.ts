import { endianness } from 'os'

import { ByteSize } from '../Enums/ByteSize'

/** Converts base data types to an array of bytes, and an array of bytes to base data types. */
export class BitConverter {
  /** Indicates the byte order ("endianness") in which data is stored in this computer architecture. */
  public static readonly IsLittleEndian: boolean = endianness() === 'LE'

  /**
   * Converts the specified double-precision floating point number to a 64-bit signed integer.
   * @param value The number to convert.
   */
  public static DoubleToInt64Bits(value: number): bigint {
    return BigInt(value)
  }

  /**
   * It takes a boolean value and returns a Buffer containing a single byte with a value of 1 if
   * the boolean is true, or 0 if the boolean is false
   * @param {boolean} value - boolean - The boolean value to convert to bytes.
   * @returns A Buffer of 1 byte with a value of 1 or 0.
   */
  public static FromBoolean(value: boolean): Buffer {
    const buffer = Buffer.alloc(1)
    buffer.writeUInt8(value ? 1 : 0)
    return buffer
  }

  /**
   * Converts a string to a byte array.
   * @param {string} value - The string to convert to bytes.
   * @returns A Buffer
   */
  public static FromChar(value: string): Buffer {
    return Buffer.from(value, 'utf16le')
  }

  /**
   * It converts a double-precision floating point number to a byte array
   * @param {number} value - The number you want to convert to bytes.
   * @returns A Buffer
   */
  public static FromDouble(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.Double)
    buffer.writeDoubleLE(value)
    return buffer
  }

  /**
   * It converts a number to a byte array.
   * @param {number} value - The value to be converted to bytes.
   * @returns A Buffer
   */
  public static FromInt16(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.Int16)
    buffer.writeInt16LE(value)
    return buffer
  }

  /**
   * It takes a 32-bit integer and returns a Buffer containing the bytes of that integer in
   * little-endian order
   * @param {number} value - The value to be converted to bytes.
   * @returns A Buffer
   */
  public static FromInt32(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.Int32)
    buffer.writeInt32LE(value)
    return buffer
  }

  /**
   * It converts a 64-bit integer into an array of 8 bytes
   * @param {bigint} value - bigint - The value to convert to bytes.
   * @returns A Buffer
   */
  public static FromInt64(value: bigint): Buffer {
    const buffer = Buffer.alloc(ByteSize.Int64)
    buffer.writeBigInt64LE(value)
    return buffer
  }

  /**
   * It takes a number, converts it to a buffer, writes the number to the buffer, and then returns the
   * buffer as a Buffer
   * @param {number} value - The number you want to convert to bytes.
   * @returns A Buffer
   */
  public static FromSingle(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.Single)
    buffer.writeFloatLE(value)
    return buffer
  }

  /**
   * It converts a number to a byte array.
   * @param {number} value - The value to convert to bytes.
   * @returns A Buffer
   */
  public static FromUInt16(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.UInt16)
    buffer.writeUInt16LE(value)
    return buffer
  }

  /**
   * It converts a 32-bit unsigned integer to a byte array.
   * @param {number} value - The value to convert to bytes.
   * @returns A Buffer
   */
  public static FromUInt32(value: number): Buffer {
    const buffer = Buffer.alloc(ByteSize.UInt32)
    buffer.writeUInt32LE(value)
    return buffer
  }

  /**
   * It converts a bigint to a Buffer.
   * @param {bigint} value - The value to convert to bytes.
   * @returns A Buffer
   */
  public static FromUInt64(value: bigint): Buffer {
    const buffer = Buffer.alloc(ByteSize.UInt64)
    buffer.writeBigUInt64LE(value)
    return buffer
  }

  /**
   * Returns a Boolean value converted from the byte at a specified position in a byte array.
   * @param bytes A byte array.
   * @param startIndex The index of the byte within value to convert.
   */
  public static ToBoolean(bytes: Buffer, startIndex: number): boolean {
    return bytes[startIndex] === 1
  }

  /**
   * Returns a Unicode character converted from two bytes at a specified position in a byte array.
   * @param bytes An array that includes the two bytes to convert.
   * @param startIndex The index of the first byte to convert.
   * @returns
   */
  public static ToChar(bytes: Buffer, startIndex: number): string {
    return bytes
      .subarray(startIndex, startIndex + ByteSize.Char)
      .toString('utf16le')
  }

  /**
   * Returns a double-precision floating point number converted from eight bytes at a specified position in a byte array.
   * @param bytes An array of bytes that includes the eight bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToDouble(bytes: Buffer, startIndex: number): number {
    return bytes.readDoubleLE(startIndex)
  }

  /**
   * Returns a 16-bit signed integer converted from two bytes at a specified position in a byte array.
   * @param bytes An array of bytes that includes the two bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToInt16(bytes: Buffer, startIndex: number): number {
    return bytes.readInt16LE(startIndex)
  }

  /**
   * Returns a 32-bit signed integer converted from four bytes at a specified position in a byte array.
   * @param bytes An array of bytes that includes the four bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToInt32(bytes: Buffer, startIndex: number): number {
    return bytes.readInt32LE(startIndex)
  }

  /**
   * Returns a 64-bit signed integer converted from eight bytes at a specified position in a byte array.
   * @param bytes An array of bytes that includes the eight bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToInt64(bytes: Buffer, startIndex: number): bigint {
    return bytes.readBigInt64LE(startIndex)
  }

  /**
   * Returns a single-precision floating point number converted from four bytes at a specified position in a byte array.
   * @param bytes An array of bytes.
   * @param startIndex The starting position within value.
   * @returns
   */
  public static ToSingle(bytes: Buffer, startIndex: number): number {
    return bytes.readFloatLE(startIndex)
  }

  /**
   * Converts the numeric value of each element of a specified array of bytes to its equivalent hexadecimal string representation.
   * @param bytes An array of bytes.
   */
  public static ToString(bytes: Buffer): string
  public static ToString(bytes: Buffer, startIndex: number): string
  public static ToString(bytes: Buffer, startIndex: number, length: number): string
  public static ToString(bytes: Buffer, startIndex?: number, length?: number): string {
    return bytes.toString('hex')
  }

  /**
   * Returns a 16-bit unsigned integer converted from two bytes at a specified position in a byte array.
   * @param bytes The array of bytes that includes the two bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToUInt16(bytes: Buffer, startIndex: number): number {
    return bytes.readUInt16LE(startIndex)
  }

  /**
   * Returns a 32-bit unsigned integer converted from four bytes at a specified position in a byte array.
   * @param bytes An array of bytes.
   * @param startIndex The starting position within value.
   */
  public static ToUInt32(bytes: Buffer, startIndex: number): number {
    return bytes.readUInt32LE(startIndex)
  }

  /**
   * Returns a 64-bit unsigned integer converted from eight bytes at a specified position in a byte array.
   * @param bytes An array of bytes that includes the eight bytes to convert.
   * @param startIndex The starting position within value.
   */
  public static ToUInt64(bytes: Buffer, startIndex: number): bigint {
    return bytes.readBigUInt64LE(startIndex)
  }
}
