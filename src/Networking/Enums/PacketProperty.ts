/**
 * Packet property
 */
export enum PacketProperty {
  Unreliable = 0x00,
  Channeled = 0x01,
  Ack = 0x02,
  Ping = 0x03,
  Pong = 0x04,
  ConnectRequest = 0x05,
  ConnectAccept = 0x06,
  Disconnect = 0x07,
  UnconnectedMessage = 0x08,
  MtuCheck = 0x09,
  MtuOk = 0x0a,
  Broadcast = 0x0b,
  Merged = 0x0c,
  ShutdownOk = 0x0d,
  PeerNotFound = 0x0e,
  InvalidProtocol = 0x0f,
  NatMessage = 0x10,
  Empty = 0x11
}
