import test from 'ava'

import { Exception } from './Exception'

test('exception without message or inner exception', (t) => {
  const exception = new Exception()

  t.is(exception.name, Exception.name)
  t.assert(
    exception.Message.includes(Exception.name),
    'message should contain exception name'
  )
  t.is(exception.InnerException, null)
})

test('exception with message', (t) => {
  const message = 'message'
  const exception = new Exception(message)

  t.is(exception.name, Exception.name)
  t.is(exception.Message, message)
  t.is(exception.InnerException, null)
})

test('exception with message and inner exception', (t) => {
  const message = 'message'

  const innerException = new Exception()
  const exception = new Exception(message, innerException)

  t.is(exception.name, Exception.name)
  t.is(exception.Message, message)
  t.is(exception.InnerException, innerException)
})
