'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('history', 'HistoryController.getHistories')
Route.post('history', 'HistoryController.addHistory')

Route.get('tes', async ({ request, response }) => {
  const History = use('App/Models/History')

  const username = request.input('username')
  const hand = request.input('hand') || 'right'

  const actuals = await History.query().where('username', username).where('hand', hand).orderBy('id').pluck('actual')
  const predictions = await History.query().where('username', username).where('hand', hand).orderBy('id').pluck('prediction')

  response.send({
    actuals: actuals,
    predictions: predictions
  })
})
