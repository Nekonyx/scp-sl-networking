import { SystemException } from './SystemException'

/** The exception that is thrown when there is an attempt to dereference a null object reference. */
export class NullReferenceException extends SystemException {}
