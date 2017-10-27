const FileLogger = require('../')
const log = new FileLogger({
  logfile: './tmp/example.log'
})

log.log({
  type: 'info',
  msg: 'Test',
  data: [123],
  time: new Date()
})

log.log({
  type: 'info',
  msg: 'Test',
  data: [
    123,
    'foo',
    null,
    undefined,
    true,
    false
  ],
  time: new Date()
})

log.log({
  type: 'sys',
  msg: 'Array',
  data: [
    ['one', 'two', 'three']
  ],
  time: new Date()
})

log.log({
  type: 'sys',
  msg: 'Object',
  data: [
    { one: 'one', two: 'two', three: 3 }
  ],
  time: new Date()
})

log.log({
  type: 'error',
  msg: new Error('Shit happens'),
  time: new Date()
})
