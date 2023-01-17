/** Provides constants and static methods for trigonometric, logarithmic, and other common mathematical functions. */
export class CommonMath {
  /**
   * Returns value clamped to the inclusive range of min and max.
   * @param value The value to be clamped.
   * @param min The lower bound of the result.
   * @param max The upper bound of the result.
   * @returns The clamped value.
   */
  public static Clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, Math.floor(value)))
  }

  /**
   * Returns value clamped to the inclusive range of min and max.
   * @param value The value to be clamped.
   * @param min The lower bound of the result.
   * @param max The upper bound of the result.
   * @returns The clamped value.
   */
  public static ClampLong(value: bigint, min: bigint, max: bigint): bigint {
    return value < min ? min : value > max ? max : value
  }
}
