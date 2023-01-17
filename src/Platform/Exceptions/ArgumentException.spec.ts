import test from 'ava'

import { ArgumentException } from './ArgumentException'

test('exception without message, paramName, or inner exception', (t) => {
  const exception = new ArgumentException()

  t.is(exception.name, ArgumentException.name)
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, null)
})

test('exception with message', (t) => {
  const message = 'message'
  const exception = new ArgumentException(message)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, null)
})

test('exception with message and innerException', (t) => {
  const message = 'message'

  const innerException = new ArgumentException()
  const exception = new ArgumentException(message, innerException)

  t.is(exception.name, ArgumentException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, null)
  t.is(exception.InnerException, innerException)
})

test('exception with message and paramName', (t) => {
  const message = 'message'
  const paramName = 'paramName'

  const exception = new ArgumentException(message, paramName)

  t.is(exception.name, ArgumentException.name)
  t.assert(
    exception.Message.includes(message),
    'message should contain message'
  )
  t.assert(
    exception.Message.includes(paramName),
    'message should contain paramName'
  )
  t.is(exception.ParamName, paramName)
  t.is(exception.InnerException, null)
})

test('exception with message, paramName, and inner exception', (t) => {
  const message = 'message'
  const paramName = 'paramName'

  const innerException = new ArgumentException()
  const exception = new ArgumentException(message, paramName, innerException)

  t.is(exception.name, ArgumentException.name)
  t.assert(
    exception.Message.includes(message),
    'message should contain message'
  )
  t.assert(
    exception.Message.includes(paramName),
    'message should contain paramName'
  )
  t.is(exception.ParamName, paramName)
  t.is(exception.InnerException, innerException)
})
