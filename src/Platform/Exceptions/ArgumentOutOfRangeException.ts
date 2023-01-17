import { ArgumentException } from './ArgumentException'
import { Exception } from './Exception'

const DefaultMessage =
  'Specified argument was out of the range of valid values.'

/** The exception that is thrown when the value of an argument is outside the allowable range of values as defined by the invoked method. */
export class ArgumentOutOfRangeException extends ArgumentException {
  protected _actualValue: unknown | null = null

  public get ActualValue(): unknown | null {
    return this._actualValue
  }

  /** Initializes a new instance of the ArgumentOutOfRangeException class. */
  public constructor()

  /**
   * Initializes a new instance of the ArgumentOutOfRangeException class with the name of the parameter that causes this exception.
   * @param paramName The name of the parameter that causes this exception.
   */
  public constructor(paramName: string)

  /**
   * Initializes a new instance of the ArgumentOutOfRangeException class with a specified error message and the exception that is the cause of this exception.
   * @param message The error message that explains the reason for this exception.
   * @param innerException The exception that is the cause of the current exception, or a null reference if no inner exception is specified.
   */

  public constructor(message: string, innerException: Exception)

  /**
   * Initializes a new instance of the ArgumentOutOfRangeException class with the name of the parameter that causes this exception and a specified error message.
   * @param paramName The name of the parameter that caused the exception.
   * @param message The message that describes the error.
   */
  public constructor(paramName: string, message: string)

  /**
   * Initializes a new instance of the ArgumentOutOfRangeException class with the parameter name, the value of the argument, and a specified error message.
   * @param paramName The name of the parameter that caused the exception.
   * @param actualValue The value of the argument that causes this exception.
   * @param message The message that describes the error.
   */
  public constructor(paramName: string, actualValue: unknown, message: string)
  public constructor(
    paramNameOrMessage?: string,
    messageOrActualValueOrInnerException?: string | unknown | Exception,
    message?: string
  ) {
    super(DefaultMessage)

    // First overload
    // no arguments
    if (arguments.length === 0) {
      return
    }

    // Second overload
    // paramName: string
    if (arguments.length === 1 && typeof paramNameOrMessage === 'string') {
      this._paramName = paramNameOrMessage
      return
    }

    // Third overload
    // message: string, innerException: Exception
    if (
      arguments.length === 2 &&
      typeof paramNameOrMessage === 'string' &&
      messageOrActualValueOrInnerException instanceof Exception
    ) {
      this.message = paramNameOrMessage
      this._innerException = messageOrActualValueOrInnerException
      return
    }

    // Fourth overload
    // paramName: string, message: string
    if (
      arguments.length === 2 &&
      typeof paramNameOrMessage === 'string' &&
      typeof messageOrActualValueOrInnerException === 'string'
    ) {
      this.message = messageOrActualValueOrInnerException
      this._paramName = paramNameOrMessage
      return
    }

    // Fifth overload
    // paramName: string, actualValue: unknown, message: string
    if (arguments.length === 3) {
      this.message = message!
      this._paramName = paramNameOrMessage!
      this._actualValue = messageOrActualValueOrInnerException
      return
    }

    throw new Error('Invalid overload')
  }
}
