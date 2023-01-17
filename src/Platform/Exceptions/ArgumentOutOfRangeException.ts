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
    if (typeof paramNameOrMessage === 'undefined') {
      return
    }

    // Second overload
    if (
      typeof paramNameOrMessage === 'string' &&
      typeof messageOrActualValueOrInnerException === 'undefined'
    ) {
      this._paramName = paramNameOrMessage
      return
    }

    // Third overload
    if (
      typeof paramNameOrMessage === 'string' &&
      messageOrActualValueOrInnerException instanceof Exception
    ) {
      this.message = paramNameOrMessage
      this._innerException = messageOrActualValueOrInnerException
      return
    }

    // Fourth overload
    if (
      typeof paramNameOrMessage === 'string' &&
      typeof messageOrActualValueOrInnerException === 'string' &&
      typeof message === 'undefined'
    ) {
      this._paramName = paramNameOrMessage
      this.message = messageOrActualValueOrInnerException
      return
    }

    // Fifth overload
    this._paramName = paramNameOrMessage
    this._actualValue = messageOrActualValueOrInnerException
    this.message = message as string
  }
}
