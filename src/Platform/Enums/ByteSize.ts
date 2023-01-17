/** Byte size */
export enum ByteSize {
  Boolean = 1,
  Char = 2,

  // Integral
  SByte = 1,
  Byte = 1,
  Int16 = 2,
  Int32 = 4,
  Int64 = 8,
  UInt16 = 2,
  UInt32 = 4,
  UInt64 = 8,

  // Floating-point
  Single = 4,
  Double = 8,
  Decimal = 16,

  // Aliases
  Short = Int16,
  UShort = UInt16,
  Int = Int32,
  UInt = UInt32,
  Long = Int64,
  ULong = UInt64,
  Float = Single
}
