const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)
routes.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

routes.use(authMiddleware)

/**
 * Ads
 */

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */

routes.get('/purchase', handle(controllers.PurchaseController.index))
routes.put('/purchase/:id', handle(controllers.PurchaseController.marksold))
routes.delete('/purchase/:id', handle(controllers.PurchaseController.destroy))
routes.post(
  '/purchase',
  validate(validators.Puchanse),
  handle(controllers.PurchaseController.store)
)

module.exports = routes
