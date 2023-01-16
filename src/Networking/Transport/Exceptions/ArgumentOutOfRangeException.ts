import { ArgumentException } from './ArgumentException'
import { Exception } from './Exception'

/**
 * The exception that is thrown when the value of an argument is outside the allowable range of values as defined by the invoked method.
 */
export class ArgumentOutOfRangeException extends ArgumentException {
  private _actualValue: unknown | null

  public get ActualValue(): unknown | null {
    return this._actualValue
  }

  /**
   * Initializes a new instance of the ArgumentOutOfRangeException class.
   */
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
  )
  public constructor(
    paramNameOrMessage?: string,
    messageOrActualValueOrInnerException?: string | unknown | Exception,
    message?: string
  ) {
    // Sorry for this mess, but it's the only way to get the correct overload
    super(
      ...(() => {
        // First overload
        // No arguments
        if (typeof paramNameOrMessage !== 'string') {
          return []
        }

        // Second overload
        // Only paramName is provided
        if (
          typeof paramNameOrMessage === 'string' &&
          typeof messageOrActualValueOrInnerException === 'undefined' &&
          typeof message === 'undefined'
        ) {
          return [undefined, paramNameOrMessage]
        }

        // Third overload
        // message and innerException are provided
        if (
          typeof paramNameOrMessage === 'string' &&
          messageOrActualValueOrInnerException instanceof Exception
        ) {
          return [
            paramNameOrMessage,
            messageOrActualValueOrInnerException
          ] as any
        }

        // Fourth overload
        // paramName, message are provided
        if (typeof message === 'undefined') {
          return [messageOrActualValueOrInnerException, paramNameOrMessage]
        }

        // Fifth overload
        // paramName, actualValue, message are provided
        return [message, paramNameOrMessage]
      })()
    )

    this._actualValue =
      typeof paramNameOrMessage !== 'undefined' &&
      typeof messageOrActualValueOrInnerException !== 'undefined' &&
      typeof message !== 'undefined'
        ? messageOrActualValueOrInnerException
        : null
  }
}
