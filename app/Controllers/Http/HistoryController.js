'use strict'

const History = use('App/Models/History')
const Env = use('Env')

class HistoryController {
  async login ({ request, response }) {
    const user = await History.query().where('username', request.input('username')).first()
    if (user) {
      response.send({ status: 'old user' })
    } else {
      response.send({ status: 'new user' })
    }
  }

  async getHistories ({ response, request }) {
    const { username, hand } = request.all()
    const count = (await History.query().where('username', username).where('hand', hand).count())[0]['count(*)']
    const limit = Env.get('LIMIT')
    const offset = count - limit < 0 ? 0 : count - limit

    const data = await History.query()
      .where('username', username)
      .where('hand', hand)
      .offset(offset)
      .limit(limit)
      .fetch()
    response.send({ data })
  }

  async addHistory ({ request, response }) {
    await History.create(request.only(['username', 'hand', 'prediction', 'actual']))
    response.send({ message: 'Data has been saved!' })
  }
}

module.exports = HistoryController
