import { Exception } from './Exception'
import { SystemException } from './SystemException'

const DefaultMessage = 'Value does not fall within the expected range.'

export interface IArgumentExceptionParams {
  message?: string
  innerException?: Exception
  paramName?: string
}

/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */
export class ArgumentException extends SystemException {
  /**
   * Name of the parameter that causes this exception
   */
  protected _paramName: string | null = null

  /**
   * Gets the name of the parameter that causes this exception.
   */
  public get ParamName(): string | null {
    return this._paramName
  }

  /**
   * Initializes a new instance of the ArgumentException class.
   */
  public constructor()

  /**
   * Initializes a new instance of the ArgumentException class with a specified error message.
   * @param message The error message that explains the reason for the exception.
   */
  public constructor(message: string)

  /**
   * Initializes a new instance of the ArgumentException class with a specified error message and a reference to the inner exception that is the cause of this exception.
   * @param message The error message that explains the reason for the exception.
   * @param innerException The exception that is the cause of the current exception. If the innerException parameter is not a null reference, the current exception is raised in a catch block that handles the inner exception.
   */
  public constructor(message: string, innerException: Exception)

  /**
   * Initializes a new instance of the ArgumentException class with a specified error message and the name of the parameter that causes this exception.
   * @param message The error message that explains the reason for the exception.
   * @param paramName The name of the parameter that caused the current exception.
   */
  public constructor(message: string, paramName: string)

  /**
   * Initializes a new instance of the ArgumentException class with a specified error message, the parameter name, and a reference to the inner exception that is the cause of this exception.
   * @param message The error message that explains the reason for the exception.
   * @param paramName The name of the parameter that caused the current exception.
   * @param innerException The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.
   */
  public constructor(
    message: string,
    paramName: string,
    innerException: Exception
  )
  public constructor(
    message?: string,
    paramNameOrInnerException?: string | Exception,
    innerException?: Exception
  ) {
    super(DefaultMessage)

    if (message) {
      this.message = message
    }

    if (typeof paramNameOrInnerException === 'string') {
      this._paramName = paramNameOrInnerException
      this.message += `\nParameter name: ${this._paramName}`
    }

    if (paramNameOrInnerException instanceof Exception) {
      this._innerException = paramNameOrInnerException
    }

    if (innerException instanceof Exception) {
      this._innerException = innerException
    }
  }
}
