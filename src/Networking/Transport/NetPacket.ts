import { $enum } from 'ts-enum-util'

import { PacketProperty } from './Enums/PacketProperty'
import { ArgumentOutOfRangeException } from './Exceptions/ArgumentOutOfRangeException'
import {
  NetConnectAcceptPacket,
  NetConnectRequestPacket
} from './InternalPackets'
import { NetConstants } from './NetConstants'

/**
 * @see LiteNetLib.NetPacket
 */
export class NetPacket {
  /**
   * @see LiteNetLib.NetPacket.LastProperty
   */
  public static readonly PropertiesCount = $enum(PacketProperty).length

  /**
   * @see LiteNetLib.NetPacket.HeaderSizes
   */
  public static readonly HeaderSizes: number[] = []

  /**
   * Empty buffer that is used when clearing a NetPacket or when instantiating a new one.
   */
  private static readonly _emptyByteArray = Buffer.alloc(0)

  /**
   * @see LiteNetLib.NetPacket
   */
  static {
    for (let i = 0; i < NetPacket.PropertiesCount; i++) {
      const property = PacketProperty[i] as unknown as PacketProperty

      if (!property) {
        throw new ArgumentOutOfRangeException('property', i, 'Invalid property')
      }

      switch (property) {
        case PacketProperty.Channeled:
        case PacketProperty.Ack:
          NetPacket.HeaderSizes[i] = NetConstants.ChanneledHeaderSize
          break

        case PacketProperty.Ping:
          NetPacket.HeaderSizes[i] = NetConstants.HeaderSize + 2
          break

        case PacketProperty.Pong:
          NetPacket.HeaderSizes[i] = NetConstants.HeaderSize + 10
          break

        case PacketProperty.ConnectRequest:
          NetPacket.HeaderSizes[i] = NetConnectRequestPacket.HeaderSize
          break

        case PacketProperty.ConnectAccept:
          NetPacket.HeaderSizes[i] = NetConnectAcceptPacket.Size
          break

        case PacketProperty.Disconnect:
          NetPacket.HeaderSizes[i] = NetConstants.HeaderSize + 8
          break

        default:
          NetPacket.HeaderSizes[i] = NetConstants.HeaderSize
          break
      }
    }
  }

  /**
   * Data in the packet.
   */
  public Data: Buffer = NetPacket._emptyByteArray

  /**
   * Return the length of the data array.
   */
  public get DataSize(): number {
    return this.Data.length
  }

  /**
   * Get the property of the packet.
   * @see LiteNetLib.NetPacket.Property
   */
  public get Property(): PacketProperty {
    return this.Data[0] & 0x1f
  }

  /**
   * It sets the first byte of the packet to the specified property.
   * @see LiteNetLib.NetPacket.Property
   * @param {PacketProperty} value - The value to set the property to.
   */
  public set Property(value: PacketProperty) {
    this.Data[0] = (this.Data[0] & 0xe0) | value
  }

  /**
   * Get the connection number from the first byte of the data.
   * @see LiteNetLib.NetPacket.ConnectionNumber
   * @returns The connection number.
   */
  public get ConnectionNumber(): number {
    return (this.Data[0] & 0x60) >> 5
  }

  /**
   * Set the value of the connectionNumber property to the value of the parameter.
   * @see LiteNetLib.NetPacket.ConnectionNumber
   */
  public set ConnectionNumber(value: number) {
    this.Data[0] = (this.Data[0] & 0x9f) | (value << 5)
  }

  /**
   * The time that the connection was made.
   * @returns The connection time in seconds.
   */
  public get ConnectionTime() {
    return this.Data.readBigUInt64LE(5)
  }

  /**
   * Sets the source of the data.
   * @param source - The buffer to be used as the source.
   */
  public SetSource(source: Buffer) {
    this.Data = Buffer.from(source)
  }

  /**
   * Clears data for reuse
   */
  public Clear() {
    this.SetSource(NetPacket._emptyByteArray)
  }

  /**
   * @see LiteNetLib.NetPacket.Verify
   */
  public Verify() {
    const property = this.Data[0] & 0x1f

    if (property >= NetPacket.PropertiesCount) {
      return false
    }

    const headerSize = NetPacket.HeaderSizes[property]!
    const fragmented = (this.Data[0] & 0x80) !== 0

    // prettier-ignore
    return (
      this.DataSize >= headerSize &&
      (!fragmented || this.DataSize >= headerSize + NetConstants.FragmentHeaderSize)
    )
  }
}
