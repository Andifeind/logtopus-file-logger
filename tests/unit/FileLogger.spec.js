'use strict'

const path = require('path')

const inspect = require('inspect.js')
// const sinon = require('sinon')
// inspect.useSinon(sinon)

const FileLogger = require('../../')
const LOG_DIR = path.join(__dirname, '../temp/')
const LOG_FILE = path.join(__dirname, '../temp/test.log')

describe('FileLogger', () => {
  describe('log()', () => {
    let fileLogger

    beforeEach(() => {
      fileLogger = new FileLogger({
        logfile: LOG_FILE
      })

      inspect.removeDir(LOG_DIR, {
        silent: true
      })
    })

    it('writes a log into a file', () => {
      fileLogger.log({
        time: new Date('Wed Oct 18 2017 22:13:03 GMT+0200 (CEST)'),
        type: 'info',
        msg: 'Test log'
      })

      inspect(LOG_FILE).isFile()
      inspect(LOG_FILE).fileContains('[2017-10-18T20:13:03.000Z] info: Test log\n')
    })
  })
})
