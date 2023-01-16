import test from 'ava'
import { endianness } from 'os'

import { BitConverter } from './BitConverter'

// prettier-ignore
const Char: [string, Buffer][] = [
  ['\0', Buffer.from([0x00, 0x00])],
  [' ', Buffer.from([0x20, 0x00])],
  ['*', Buffer.from([0x2a, 0x00])],
  ['3', Buffer.from([0x33, 0x00])],
  ['A', Buffer.from([0x41, 0x00])],
  ['[', Buffer.from([0x5b, 0x00])],
  ['a', Buffer.from([0x61, 0x00])],
  ['{', Buffer.from([0x7b, 0x00])],
  ['❤', Buffer.from([0x64, 0x27])]
]

// prettier-ignore
const Double: [number, Buffer][] = [
  [0.0, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])],
  [1.0, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])],
  [2.55e2, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x6f, 0x40])],
  [4.294967295e9, Buffer.from([0x00, 0x00, 0xe0, 0xff, 0xff, 0xff, 0xef, 0x41])],
  [3.90625e-3, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x70, 0x3f])],
  [2.3283064365386963e-10, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3d])],
  [1.23456789012345e-300, Buffer.from([0xdf, 0x88, 0x1e, 0x1c, 0xfe, 0x74, 0xaa, 0x01])],
  [1.2345678901234565, Buffer.from([0xfa, 0x59, 0x8c, 0x42, 0xca, 0xc0, 0xf3, 0x3f])],
  [1.2345678901234567, Buffer.from([0xfb, 0x59, 0x8c, 0x42, 0xca, 0xc0, 0xf3, 0x3f])],
  [1.2345678901234569, Buffer.from([0xfc, 0x59, 0x8c, 0x42, 0xca, 0xc0, 0xf3, 0x3f])],
  [1.2345678901234569e300, Buffer.from([0x52, 0xd3, 0xbb, 0xbc, 0xe8, 0x7e, 0x3d, 0x7e])],
  [1.7976931348623157e308, Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0x7f])],
  [4.9406564584124654e-324, Buffer.from([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])]
]

// prettier-ignore
const Int16: [number, Buffer][] = [
  [0, Buffer.from([0x00, 0x00])],
  [15, Buffer.from([0x0f, 0x00])],
  [-15, Buffer.from([0xf1, 0xff])],
  [10000, Buffer.from([0x10, 0x27])],
  [-10000, Buffer.from([0xf0, 0xd8])],
  [-32768, Buffer.from([0x00, 0x80])],
  [32767, Buffer.from([0xff, 0x7f])]
]

// prettier-ignore
const Int32: [number, Buffer][] = [
  [0, Buffer.from([0x00, 0x00, 0x00, 0x00])],
  [15, Buffer.from([0x0f, 0x00, 0x00, 0x00])],
  [-15, Buffer.from([0xf1, 0xff, 0xff, 0xff])],
  [1048576, Buffer.from([0x00, 0x00, 0x10, 0x00])],
  [-1048576, Buffer.from([0x00, 0x00, 0xf0, 0xff])],
  [1000000000, Buffer.from([0x00, 0xca, 0x9a, 0x3b])],
  [-1000000000, Buffer.from([0x00, 0x36, 0x65, 0xc4])],
  [-2147483648, Buffer.from([0x00, 0x00, 0x00, 0x80])],
  [2147483647, Buffer.from([0xff, 0xff, 0xff, 0x7f])]
]

// prettier-ignore
const Int64: [bigint, Buffer][] = [
  [0n, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])],
  [16777215n, Buffer.from([0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00])],
  [-16777215n, Buffer.from( [0x01, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff])],
  [1000000000n, Buffer.from([0x00, 0xca, 0x9a, 0x3b, 0x00, 0x00, 0x00, 0x00])],
  [-1000000000n,Buffer.from( [0x00, 0x36, 0x65, 0xc4, 0xff, 0xff, 0xff, 0xff])],
  [4294967296n, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00])],
  [-4294967296n, Buffer.from( [0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff])],
  [187649984473770n, Buffer.from([0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0x00, 0x00])],
  [-187649984473770n, Buffer.from( [0x56, 0x55, 0x55, 0x55, 0x55, 0x55, 0xff, 0xff])],
  [1000000000000000000n, Buffer.from([0x00, 0x00, 0x64, 0xa7, 0xb3, 0xb6, 0xe0, 0x0d])],
  [-1000000000000000000n, Buffer.from( [0x00, 0x00, 0x9c, 0x58, 0x4c, 0x49, 0x1f, 0xf2])],
  [-9223372036854775808n, Buffer.from( [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80])],
  [9223372036854775807n, Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f])]
]

// prettier-ignore
const Single: [number, Buffer][] = [
  [0.0, Buffer.from([0x00, 0x00, 0x00, 0x00])],
  [1.0, Buffer.from([0x00, 0x00, 0x80, 0x3f])],
  [1.5e1, Buffer.from([0x00, 0x00, 0x70, 0x41])],
  [6.5535e4, Buffer.from([0x00, 0xff, 0x7f, 0x47])],
  [3.90625e-3, Buffer.from([0x00, 0x00, 0x80, 0x3b])],
  [2.3283064365386963e-10, Buffer.from([0x00, 0x00, 0x80, 0x2f])],
  [1.2344999485404616e-35, Buffer.from([0x49, 0x46, 0x83, 0x05])],
  [1.2345670461654663, Buffer.from([0x4b, 0x06, 0x9e, 0x3f])],
  [1.2345672845840454, Buffer.from([0x4d, 0x06, 0x9e, 0x3f])],
  [1.234567642211914, Buffer.from([0x50, 0x06, 0x9e, 0x3f])],
  [1.2345678906183669e+35, Buffer.from([0x1e, 0x37, 0xbe, 0x79])],
  [-3.4028234663852886e+38, Buffer.from([0xff, 0xff, 0x7f, 0xff])],
  [3.4028234663852886e+38, Buffer.from([0xff, 0xff, 0x7f, 0x7f])],
  [1.401298464324817e-45, Buffer.from([0x01, 0x00, 0x00, 0x00])]
]

// prettier-ignore
const Uint16: [number, Buffer][] = [
  [15, Buffer.from([0x0f, 0x00])],
  [1023, Buffer.from([0xff, 0x03])],
  [10000, Buffer.from([0x10, 0x27])],
  [0, Buffer.from([0x00, 0x00])],
  [32767, Buffer.from([0xff, 0x7f])],
  [65535, Buffer.from([0xff, 0xff])]
]

// prettier-ignore
const Uint32: [number, Buffer][] = [
  [15, Buffer.from([0x0f, 0x00, 0x00, 0x00])],
  [1023, Buffer.from([0xff, 0x03, 0x00, 0x00])],
  [1048576, Buffer.from([0x00, 0x00, 0x10, 0x00])],
  [1000000000, Buffer.from([0x00, 0xca, 0x9a, 0x3b])],
  [0, Buffer.from([0x00, 0x00, 0x00, 0x00])],
  [2147483647, Buffer.from([0xff, 0xff, 0xff, 0x7f])],
  [4294967295, Buffer.from([0xff, 0xff, 0xff, 0xff])]
]

// prettier-ignore
const Uint64: [bigint, Buffer][] = [
  [16777215n, Buffer.from([0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00])],
  [1000000000n, Buffer.from([0x00, 0xca, 0x9a, 0x3b, 0x00, 0x00, 0x00, 0x00])],
  [4294967296n, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00])],
  [187649984473770n, Buffer.from([0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0x00, 0x00])],
  [1000000000000000000n, Buffer.from([0x00, 0x00, 0x64, 0xa7, 0xb3, 0xb6, 0xe0, 0x0d])],
  [10000000000000000000n, Buffer.from([0x00, 0x00, 0xe8, 0x89, 0x04, 0x23, 0xc7, 0x8a])],
  [0n, Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])],
  [9223372036854775807n, Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f])],
  [18446744073709551615n, Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])]
]

test('is little endian should be true if the system is little endian', (t) => {
  t.is(BitConverter.IsLittleEndian, endianness() === 'LE')
})

//#region To Buffer
test('FromBoolean converts to Buffer correctly', (t) => {
  const truthy = BitConverter.FromBoolean(true)
  const falsy = BitConverter.FromBoolean(false)

  t.is(truthy.length, 1)
  t.is(falsy.length, 1)

  t.deepEqual(truthy, Buffer.from([1]))
  t.deepEqual(falsy, Buffer.from([0]))
})

test('FromChar converts to Buffer correctly', (t) => {
  for (const [value, expected] of Char) {
    const result = BitConverter.FromChar(value)

    t.is(result.length, 2)
    t.deepEqual(result, expected)
  }
})

test('FromDouble converts to Buffer correctly', (t) => {
  for (const [value, expected] of Double) {
    const result = BitConverter.FromDouble(value)

    t.is(result.length, 8)
    t.deepEqual(result, expected)
  }
})

test('FromInt16 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Int16) {
    const result = BitConverter.FromInt16(value)

    t.is(result.length, 2)
    t.deepEqual(result, expected)
  }
})

test('FromInt32 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Int32) {
    const result = BitConverter.FromInt32(value)

    t.is(result.length, 4)
    t.deepEqual(result, expected)
  }
})

test('FromInt64 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Int64) {
    const result = BitConverter.FromInt64(value)

    t.is(result.length, 8)
    t.deepEqual(result, expected)
  }
})

test('FromSingle converts to Buffer correctly', (t) => {
  for (const [value, expected] of Single) {
    const result = BitConverter.FromSingle(value)

    t.is(result.length, 4)
    t.deepEqual(result, expected)
  }
})

test('FromUint16 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Uint16) {
    const result = BitConverter.FromUInt16(value)

    t.is(result.length, 2)
    t.deepEqual(result, expected)
  }
})

test('FromUint32 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Uint32) {
    const result = BitConverter.FromUInt32(value)

    t.is(result.length, 4)
    t.deepEqual(result, expected)
  }
})

test('FromUint64 converts to Buffer correctly', (t) => {
  for (const [value, expected] of Uint64) {
    const result = BitConverter.FromUInt64(value)

    t.is(result.length, 8)
    t.deepEqual(result, expected)
  }
})
//#endregion

//#region From Buffer
test('ToBoolean converts to boolean correctly', (t) => {
  const truthy = BitConverter.ToBoolean(Buffer.from([1]), 0)
  const falsy = BitConverter.ToBoolean(Buffer.from([0]), 0)

  t.is(truthy, true)
  t.is(falsy, false)
})

test('ToChar converts to string correctly', (t) => {
  for (const [expected, value] of Char) {
    const result = BitConverter.ToChar(value, 0)

    t.is(result, expected)
  }
})

test('ToDouble converts to number correctly', (t) => {
  for (const [expected, value] of Double) {
    const result = BitConverter.ToDouble(value, 0)

    t.is(result, expected)
  }
})

test('ToInt16 converts to number correctly', (t) => {
  for (const [expected, value] of Int16) {
    const result = BitConverter.ToInt16(value, 0)

    t.is(result, expected)
  }
})

test('ToInt32 converts to number correctly', (t) => {
  for (const [expected, value] of Int32) {
    const result = BitConverter.ToInt32(value, 0)

    t.is(result, expected)
  }
})

test('ToInt64 converts to bigint correctly', (t) => {
  for (const [expected, value] of Int64) {
    const result = BitConverter.ToInt64(value, 0)

    t.is(result, expected)
  }
})

test('ToSingle converts to number correctly', (t) => {
  for (const [expected, value] of Single) {
    const result = BitConverter.ToSingle(value, 0)

    t.is(result, expected)
  }
})

test('ToUint16 converts to number correctly', (t) => {
  for (const [expected, value] of Uint16) {
    const result = BitConverter.ToUInt16(value, 0)

    t.is(result, expected)
  }
})

test('ToUint32 converts to number correctly', (t) => {
  for (const [expected, value] of Uint32) {
    const result = BitConverter.ToUInt32(value, 0)

    t.is(result, expected)
  }
})

test('ToUint64 converts to bigint correctly', (t) => {
  for (const [expected, value] of Uint64) {
    const result = BitConverter.ToUInt64(value, 0)

    t.is(result, expected)
  }
})

//#endregion
