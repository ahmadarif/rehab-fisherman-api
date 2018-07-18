'use strict'

const History = use('App/Models/History')
const Env = use('Env')
const Database = use('Database')

class HistoryController {

  async getHistories ({ response, request }) {
    const { username, hand } = request.all()

    // cek apakah user baru atau bukan
    const user = await History.query()
      .where('username', username)
      .where('hand', hand)
      .first()

    if (!user) {
      const trx = await Database.beginTransaction()
      for (let i=0; i<2; i++) {
        await History.create({ username: username, hand: hand, actual: 50 }, trx)
      }
      await trx.commit()
    }
    //> cek apakah user baru atau bukan

    // ambil data dengan limit
    const count = (await History.query().where('username', username).where('hand', hand).count())[0]['count(*)']
    const limit = Env.get('LIMIT')
    const offset = count - limit < 0 ? 0 : count - limit

    const data = await History.query()
      .where('username', username)
      .where('hand', hand)
      .offset(offset)
      .limit(limit)
      .fetch()
    //> ambil data dengan limit

    response.send({ data })
  }

  async addHistory ({ request, response }) {
    console.log(request.only(['username', 'hand', 'prediction', 'actual']));
    await History.create(request.only(['username', 'hand', 'prediction', 'actual']))
    response.send({ message: 'Data has been saved!' })
  }
}

module.exports = HistoryController
