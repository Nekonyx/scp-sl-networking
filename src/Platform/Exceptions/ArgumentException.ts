import { Exception } from './Exception'
import { SystemException } from './SystemException'

const DefaultMessage = 'Value does not fall within the expected range.'

/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */
export class ArgumentException extends SystemException {
  /** Name of the parameter that causes this exception */
  protected _paramName: string | null = null

  /** Gets the name of the parameter that causes this exception. */
  public get ParamName(): string | null {
    return this._paramName
  }

  /** Initializes a new instance of the ArgumentException class. */
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
    param1?: string,
    param2?: string | Exception,
    param3?: Exception
  ) {
    super(DefaultMessage)

    // First overload
    // no arguments
    if (arguments.length === 0) {
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

    // Fourth overload
    // message: string, paramName: string
    if (
      arguments.length === 2 &&
      typeof param1 === 'string' &&
      typeof param2 === 'string'
    ) {
      this.message = `${param1}\nParameter name: ${param2}`
      this._paramName = param2
      return
    }

    // Fifth overload
    // message: string, paramName: string, innerException: Exception
    if (
      arguments.length === 3 &&
      typeof param1 === 'string' &&
      typeof param2 === 'string' &&
      param3 instanceof Exception
    ) {
      this.message = `${param1}\nParameter name: ${param2}`
      this._paramName = param2
      this._innerException = param3
      return
    }

    throw new Error('Invalid overload')
  }
}
