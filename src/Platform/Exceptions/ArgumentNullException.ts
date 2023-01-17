import { ArgumentException } from './ArgumentException'
import { Exception } from './Exception'

const DefaultMessage = 'Value cannot be null.'

/** The exception that is thrown when a null reference is passed to a method that does not accept it as a valid argument. */
export class ArgumentNullException extends ArgumentException {
  /** Initializes a new instance of the ArgumentNullException class. */
  public constructor()
  /**
   * Initializes a new instance of the ArgumentNullException class with the name of the parameter that causes this exception.
   * @param paramName The name of the parameter that caused the exception.
   */
  public constructor(paramName: string)
  /**
   * Initializes a new instance of the ArgumentNullException class with a specified error message and the exception that is the cause of this exception.
   * @param message The error message that explains the reason for this exception.
   * @param innerException The exception that is the cause of the current exception, or a null reference (Nothing in Visual Basic) if no inner exception is specified.
   */
  public constructor(message: string, innerException: Exception)
  /**
   * Initializes an instance of the ArgumentNullException class with a specified error message and the name of the parameter that causes this exception.
   * @param paramName The name of the parameter that caused the exception.
   * @param message A message that describes the error.
   */
  public constructor(paramName: string, message: string)
  public constructor(param1?: string, param2?: Exception | string) {
    super(DefaultMessage)

    // First overload
    // no arguments
    if (arguments.length === 0) {
      return
    }

    // Second overload
    // paramName: string
    if (arguments.length === 1 && typeof param1 === 'string') {
      this._paramName = param1
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

    // Fourth overload
    // paramName: string, message: string
    if (
      arguments.length === 2 &&
      typeof param1 === 'string' &&
      typeof param2 === 'string'
    ) {
      this.message = param2
      this._paramName = param1
      return
    }

    throw new Error('Invalid overload')
  }
}
