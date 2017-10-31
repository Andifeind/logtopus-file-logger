'use strict'

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync

class FileLogger {
  constructor (conf) {
    conf = conf || {}

    this.file = path.resolve(process.cwd(), conf.logfile || './logs/app.log')
    this.separator = conf.separator || ' '
    mkdirp(path.dirname(this.file))
  }

  log (msg) {
    const date = msg.time.toISOString()

    let message = `[${date}] ${msg.type}: ${this.escape(String(msg.msg))}`
    let data

    if (msg.data) {
      data = msg.data.map(data => {
        if (typeof data === 'object') {
          data = JSON.stringify(data)
        }

        return this.escape(String(data))
      }).join(this.separator)
    }

    if (data) {
      message += this.separator + data
    }

    fs.appendFileSync(this.file, message + '\n')
  }

  flush () {
    return Promise.resolve()
  }

  escape (str) {
    return str.replace(/[\n\t\r\0\v\b\f]/g, (match) => {
      switch (match) {
        case '\n': return '\\n'
        case '\t': return '\\t'
        case '\r': return '\\r'
        case '\0': return '\\0'
        case '\v': return '\\v'
        case '\b': return '\\b'
        case '\f': return '\\f'
      }
    })
  }
}

module.exports = FileLogger
