import test from 'ava'

import { ArgumentOutOfRangeException } from './ArgumentOutOfRangeException'

test('exception without message, paramName, actualValue, or innerException', (t) => {
  const exception = new ArgumentOutOfRangeException()

  t.is(exception.name, ArgumentOutOfRangeException.name)
  t.is(exception.ParamName, null)
  t.is(exception.ActualValue, null)
  t.is(exception.InnerException, null)
})

test('exception with paramName', (t) => {
  const paramName = 'paramName'
  const exception = new ArgumentOutOfRangeException(paramName)

  t.is(exception.name, ArgumentOutOfRangeException.name)
  t.is(exception.ParamName, paramName)
  t.is(exception.ActualValue, null)
  t.is(exception.InnerException, null)
})

test('exception with message and innerException', (t) => {
  const message = 'message'
  const innerException = new ArgumentOutOfRangeException()

  const exception = new ArgumentOutOfRangeException(message, innerException)

  t.is(exception.name, ArgumentOutOfRangeException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, null)
  t.is(exception.ActualValue, null)
  t.is(exception.InnerException, innerException)
})

test('exception with paramName and message', (t) => {
  const paramName = 'paramName'
  const message = 'message'
  const exception = new ArgumentOutOfRangeException(paramName, message)

  t.is(exception.name, ArgumentOutOfRangeException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, paramName)
  t.is(exception.ActualValue, null)
  t.is(exception.InnerException, null)
})

test('exception with paramName, actualValue, and message', (t) => {
  const message = 'message'
  const paramName = 'paramName'
  const actualValue = 1

  const exception = new ArgumentOutOfRangeException(
    paramName,
    actualValue,
    message
  )

  t.is(exception.name, ArgumentOutOfRangeException.name)
  t.is(exception.Message, message)
  t.is(exception.ParamName, paramName)
  t.is(exception.ActualValue, actualValue)
  t.is(exception.InnerException, null)
})
