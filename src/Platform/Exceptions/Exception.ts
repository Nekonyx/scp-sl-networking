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
  public constructor(param1?: string, param2?: Exception) {
    super()

    this.name = this.constructor.name

    // First overload
    // no arguments
    if (arguments.length === 0) {
      this.message = `Exception of type "${this.constructor.name}" was thrown`
      return
    }

    // Second overload
    // message: string
    if (arguments.length === 1 && typeof param1 === 'string') {
      this.message = param1
      return
    }

    // Third overload
    // message: string, innerException: Exception
    if (
      arguments.length === 2 &&
      typeof param1 === 'string' &&
      param2 instanceof Exception
    ) {
      this.message = param1
      this._innerException = param2
      return
    }

    throw new Error('Invalid overload')
  }
}
