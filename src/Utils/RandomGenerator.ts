import { pseudoRandomBytes, randomBytes } from 'crypto'

export class RandomGenerator {
  public static GetInt32(secure: boolean): number {
    return secure ? this.GetInt32Secure() : this.GetInt32Unsecure()
  }

  private static GetInt32Secure(): number {
    return randomBytes(4).readInt32LE()
  }

  private static GetInt32Unsecure(): number {
    return pseudoRandomBytes(4).readInt32LE()
  }
}
