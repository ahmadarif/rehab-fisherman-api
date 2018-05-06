'use strict'

const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.increments()
      table.string('username', 30)
      table.enum('hand', ['left', 'right'])
      table.decimal('prediction')
      table.decimal('actual')
      table.timestamps()
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
