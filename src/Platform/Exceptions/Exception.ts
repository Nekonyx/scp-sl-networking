/** Represents errors that occur during application execution. */
export class Exception extends Error {
  /** Exception instance that caused the current exception.*/
  protected _innerException: Exception | null = null

  /** Gets the Exception instance that caused the current exception. */
  public get InnerException(): Exception | null {
    return this._innerException
  }

  /** Gets a message that describes the current exception. */
  public get Message(): string {
    return this.message
  }

  /** Initializes a new instance of the Exception class. */
  public constructor()

  /**
   * Initializes a new instance of the Exception class with a specified error message.
   * @param message The message that describes the error.
   */
  public constructor(message: string)

  /**
   * Initializes a new instance of the Exception class with a specified error message and a reference to the inner exception that is the cause of this exception.
   * @param message The error message that explains the reason for the exception.
   * @param innerException The exception that is the cause of the current exception, or a null reference if no inner exception is specified.
   */
  public constructor(message: string, innerException: Exception)
  public constructor(message?: string, innerException?: Exception) {
    super()

    this.name = this.constructor.name

    this.message =
      message ?? `Exception of type "${this.constructor.name}" was thrown`

    if (innerException instanceof Exception) {
      this._innerException = innerException
    }
  }
}
