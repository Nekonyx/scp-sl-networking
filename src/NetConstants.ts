/**
 * Network constants. Can be tuned from sources for your purposes.
 */
export class NetConstants {
  // can be tuned
  public static readonly DefaultWindowSize = 64
  public static readonly SocketBufferSize = 1024 * 1024 // 1mb
  public static readonly SocketTTL = 255

  public static readonly HeaderSize = 1
  public static readonly ChanneledHeaderSize = 4
  public static readonly FragmentHeaderSize = 6
  public static readonly FragmentedHeaderTotalSize =
    NetConstants.ChanneledHeaderSize + NetConstants.FragmentHeaderSize
  public static readonly MaxSequence = 32768
  public static readonly HalfMaxSequence = NetConstants.MaxSequence / 2

  // protocol
  public static readonly ProtocolId = 13
  public static readonly MaxUdpHeaderSize = 68
  public static readonly ChannelTypeCount = 4

  public static readonly PossibleMtu = [
    576 - NetConstants.MaxUdpHeaderSize, // minimal (RFC 1191)
    1024, // most games standard
    1232 - NetConstants.MaxUdpHeaderSize,
    1460 - NetConstants.MaxUdpHeaderSize, // google cloud
    1472 - NetConstants.MaxUdpHeaderSize, // VPN
    1492 - NetConstants.MaxUdpHeaderSize, // Ethernet with LLC and SNAP, PPPoE (RFC 1042)
    1500 - NetConstants.MaxUdpHeaderSize // Ethernet II (RFC 1191)
  ]

  //Max possible single packet size
  public static readonly MaxPacketSize =
    NetConstants.PossibleMtu[NetConstants.PossibleMtu.length - 1]

  //peer specific
  public static readonly MaxConnectionNumber = 4

  public static readonly PacketPoolSize = 1000
}
