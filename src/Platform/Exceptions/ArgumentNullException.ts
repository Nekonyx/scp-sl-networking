import { ArgumentException } from './ArgumentException'

/**
 * The exception that is thrown when a null reference (Nothing in Visual Basic) is passed to a method that does not accept it as a valid argument.
 */
export class ArgumentNullException extends ArgumentException {}
