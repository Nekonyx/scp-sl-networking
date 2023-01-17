import { NullReferenceException } from '../Exceptions/NullReferenceException'

/**
 * This class is used to represent a reference to a value. This is
 * useful in cases where you want to pass a value by reference instead
 * of by value. For example, you can use this class to pass a string
 * by reference to a function instead of by value. It is also useful
 * when you want to be able to modify a value that is passed into a
 * function, but you do not want to modify the original variable.
 */
export class Reference<T> {
  /** Value */
  protected _value: T

  /**
   * If the value is undefined, throw an exception. Otherwise, return the value
   * @returns The value of the variable _value.
   */
  public get Value(): T {
    return this._value
  }

  /**
   * It sets the value of the private variable _value to the value passed in.
   * @param {T} value - The value to be stored in the node.
   */
  public set Value(value: T) {
    this._value = value
  }

  /**
   * The constructor function takes a value of type T and assigns it to the private property _value
   * @param {T} value - T - The value that the new instance should hold.
   */
  public constructor(value: T) {
    this._value = value
  }
}
