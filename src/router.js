const express = require('express')
const model = require('./model')

const router = express.Router()

router.get('/health', jsonRoute(() => 'ok'))

router.get('/', jsonRoute(model.getAll))
router.get('/evas/:eva', jsonRoute(req => model.getByEva(req.params.eva)))
router.get('/ril100/:ril100', jsonRoute(req => model.getByRil100(req.params.ril100)))

router.get('/szentralen', jsonRoute(model.getSZentralen))
router.get('/szentralen/:id', jsonRoute(req => model.getSZentrale(req.params.id)))
router.get('/szentralen/:id/stations', jsonRoute(req => model.getBySZentrale(req.params.id)))

router.get('/stationManagements', jsonRoute(model.getManagements))
router.get('/stationManagements/:id', jsonRoute(req => model.getManagement(req.params.id)))
router.get('/stationManagements/:id/stations', jsonRoute(req => model.getByManagement(req.params.id)))

module.exports = router

function jsonRoute(func) {
  return (req, res, next) => {
    try {
      res.json(func(req))
      next()
    } catch (error) {
      next(error)
    }
  }
}
