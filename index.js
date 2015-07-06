var dat = require('dat-core')
var resolve = require('resolve')
var config = require('./lib/util/config.js')()

module.exports = Dat

function Dat (path, opts) {
  if (!opts) opts = {}
  if (!opts.valueEncoding) opts.valueEncoding = 'json'

  if (config.addons && config.addons.backend) {
    var res = resolve.sync(config.addons.backend.module, { basedir: process.cwd() })
    var module = require(res)
    var env = process.env[config.addons.backend.env]
    opts.backend = function () {
      return module(env)
    }
  }

  var db = dat(path, opts)
  return db
}
