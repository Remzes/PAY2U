import {getOffers} from "../controllers/offers"
const router = require('express').Router()

// GET request - get tickets
router.get('/', getOffers)

module.exports = router
