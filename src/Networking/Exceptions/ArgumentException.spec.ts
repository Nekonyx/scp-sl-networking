import test from 'ava'

import { ArgumentException } from './ArgumentException'

test('exception without message, paramName, or inner exception', (t) => {
  const exception = new ArgumentException()

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, '')
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, null)
})

test('exception with message', (t) => {
  const message = 'error message'
  const exception = new ArgumentException(message)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, null)
})

test('exception with message and innerException', (t) => {
  const message = 'error message'

  const innerException = new ArgumentException()
  const exception = new ArgumentException(message, innerException)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, innerException)
})

test('exception with message and paramName', (t) => {
  const message = 'error message'
  const paramName = 'paramName'

  const exception = new ArgumentException(message, paramName)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, paramName)
  t.is(exception.InnerException, null)
})

test('exception with message, paramName, and inner exception', (t) => {
  const message = 'error message'
  const paramName = 'paramName'

  const innerException = new ArgumentException()
  const exception = new ArgumentException(message, paramName, innerException)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, paramName)
  t.is(exception.InnerException, innerException)
})
