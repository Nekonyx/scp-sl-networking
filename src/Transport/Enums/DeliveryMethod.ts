/** Sending method type. */
export enum DeliveryMethod {
  /** Unreliable. Packets can be dropped, can be duplicated, can arrive without order. */
  Unreliable = 4,
  /** Reliable. Packets won't be dropped, won't be duplicated, can arrive without order. */
  ReliableUnordered = 0,
  /** Unreliable. Packets can be dropped, won't be duplicated, will arrive in order. */
  Sequenced = 1,
  /** Reliable and ordered. Packets won't be dropped, won't be duplicated, will arrive in order. */
  ReliableOrdered = 2,
  /** Reliable only last packet. Packets can be dropped (except the last one), won't be duplicated, will arrive in order. Cannot be fragmented. */
  ReliableSequenced = 3
}
