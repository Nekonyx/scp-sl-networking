import { IPool } from '../Interfaces/IPool'
import { NetPacket } from '../NetPacket'

/**
 * Returns pooled NetPacket.
 */
export class NetPacketPool implements IPool<NetPacket> {
  /**
   * Shared pool
   */
  public static readonly Shared = new NetPacketPool()

  private _pool: NetPacket[] = []

  /**
   * Return a NetPacket from the pool, or create a new one if the pool is empty.
   *
   * @param source - The source buffer to read from.
   * @returns NetPacket.
   */
  public rent(source?: Buffer): NetPacket {
    const packet = this._pool.pop() ?? new NetPacket()

    if (source) {
      packet.SetSource(source)
    }

    return packet
  }

  /**
   * Return NetPacket to the pool.
   * @param packet - NetPacket - The NetPacket object to return to the pool.
   */
  public return(packet: NetPacket): void {
    packet.Clear()
    this._pool.push(packet)
  }
}
