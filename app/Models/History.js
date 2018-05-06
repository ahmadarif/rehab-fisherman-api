'use strict'

const Model = use('Model')

class History extends Model {
  static get table() {
    return 'histories'
  }
}

module.exports = History
