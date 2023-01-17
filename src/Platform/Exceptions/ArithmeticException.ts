import { Exception } from './Exception'
import { SystemException } from './SystemException'

const DefaultMessage = 'The arithmetic operation is not allowed.'

/** The exception that is thrown for errors in an arithmetic, casting, or conversion operation. */
export class ArithmeticException extends SystemException {
  /** Initializes a new instance of the ArithmeticException class. */
  public constructor()

  /**
   * Initializes a new instance of the ArithmeticException class with a specified error message.
   * @param message A String that describes the error.
   */
  public constructor(message: string)

  /**
   * Initializes a new instance of the ArithmeticException class with a specified error message and a reference to the inner exception that is the cause of this exception.
   * @param message The error message that explains the reason for the exception.
   * @param innerException The exception that is the cause of the current exception. If the innerException parameter is not a null reference, the current exception is raised in a catch block that handles the inner exception.
   */
  public constructor(message: string, innerException: Exception)
  public constructor(message?: string, innerException?: Exception) {
    super(DefaultMessage)

    // First overload
    // no arguments
    if (arguments.length === 0) {
      return
    }

    // Second overload
    // message: string
    if (arguments.length === 1 && typeof message === 'string') {
      this.message = message
      return
    }

    // Third overload
    // message: string, innerException: Exception
    if (
      arguments.length === 2 &&
      typeof message === 'string' &&
      innerException instanceof Exception
    ) {
      this.message = message
      this._innerException = innerException
      return
    }

    throw new Error('Invalid overload')
  }
}
