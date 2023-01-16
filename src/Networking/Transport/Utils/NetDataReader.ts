import { ByteSize } from '../Enums/ByteSize'
import { BitConverter } from './BitConverter'
import { NetDataWriter } from './NetDataWriter'

export class NetDataReader {
  protected _data: Buffer
  protected _position: number
  protected _dataSize: number
  private _offset: number

  public get RawData(): Buffer {
    return this._data
  }

  public get RawDataSize(): number {
    return this._dataSize
  }

  public get UserDataOffset(): number {
    return this._offset
  }

  public get UserDataSize(): number {
    return this._dataSize - this._offset
  }

  public get IsNull(): boolean {
    return this._data == null
  }

  public get Position(): number {
    return this._position
  }

  public get EndOfData(): boolean {
    return this._position == this._dataSize
  }

  public get AvailableBytes() {
    return this._dataSize - this._position
  }

  public SkipBytes(count: number) {
    this._position += count
  }

  public constructor()
  public constructor(writer: NetDataWriter)
  public constructor(source: Buffer)
  public constructor(source: Buffer, offset: number, maxSize: number)
  public constructor(
    source?: Buffer | NetDataWriter,
    offset?: number,
    maxSize?: number
  ) {
    if (source) {
      this.SetSource(source, offset, maxSize)
    }
  }

  public SetSource(dataWriter: NetDataWriter): void
  public SetSource(source: Buffer): void
  public SetSource(source: Buffer, offset: number, maxSize: number): void
  public SetSource(
    source: Buffer | NetDataWriter,
    offset?: number,
    maxSize?: number
  ): void
  public SetSource(
    source: Buffer | NetDataWriter,
    offset?: number,
    maxSize?: number
  ): void {
    if (source instanceof NetDataWriter) {
      this._data = source.Data
      this._position = 0
      this._offset = 0
      this._dataSize = source.Length
    } else {
      this._data = source
      this._position = offset || 0
      this._offset = offset || 0
      this._dataSize = maxSize || source.length
    }
  }

  public GetByte(): number {
    const res = this._data[this._position]
    this._position += ByteSize.Byte
    return res
  }

  public GetSByte(): number {
    const res = this._data[this._position]

    this._position += ByteSize.Byte

    return res < 128 ? res : res - 256
  }

  public GetBoolArray(): boolean[] {
    const size = BitConverter.ToUInt16(this._data, this._position)
    this._position += ByteSize.UInt16

    const array = this._data.subarray(this._position, this._position + size)
    this._position += size

    return NetDataReader.bufferToBoolArray(array)
  }

  public GetUShortArray(): number[] {
    const size = BitConverter.ToUInt16(this._data, this._position) * 2
    this._position += ByteSize.UInt16

    const array = this._data.subarray(this._position, this._position + size)
    this._position += size

    return NetDataReader.bufferToUShortArray(array)
  }

  public GetShortArray(): number[] {
    const size = BitConverter.ToUInt16(this._data, this._position) * 2
    this._position += ByteSize.UInt16

    const array = this._data.subarray(this._position, this._position + size)
    this._position += size

    return NetDataReader.bufferToShortArray(array)
  }

  private static bufferToShortArray(buffer: Buffer): number[] {
    const array = new Array<number>(buffer.length)

    for (const byte of buffer) {
      array.push((byte < 128 ? byte : byte - 256) * 256)
    }

    return array
  }

  private static bufferToUShortArray(buffer: Buffer): number[] {
    const array = new Array<number>(buffer.length)

    for (const byte of buffer) {
      array.push(byte * 256)
    }

    return array
  }

  private static bufferToBoolArray(buffer: Buffer): boolean[] {
    const array = new Array<boolean>(buffer.length)

    for (const byte of buffer) {
      array.push(Boolean(byte))
    }

    return array
  }
}
