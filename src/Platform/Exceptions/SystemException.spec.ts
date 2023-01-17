import test from 'ava'

import { SystemException } from './SystemException'

test('exception without message or inner exception', (t) => {
  const exception = new SystemException()

  t.is(exception.name, SystemException.name)
  t.assert(
    exception.Message.includes(SystemException.name),
    'message should contain exception name'
  )
  t.is(exception.InnerException, null)
})

test('exception with message', (t) => {
  const message = 'message'
  const exception = new SystemException(message)

  t.is(exception.name, SystemException.name)
  t.is(exception.Message, message)
  t.is(exception.InnerException, null)
})

test('exception with message and inner exception', (t) => {
  const message = 'message'

  const innerException = new SystemException()
  const exception = new SystemException(message, innerException)

  t.is(exception.name, SystemException.name)
  t.is(exception.Message, message)
  t.is(exception.InnerException, innerException)
})
