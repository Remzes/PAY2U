import {getClicksById} from "../controllers/clicks"

const router = require('express').Router()

// GET request - get clicks by id
router.get('/:id', getClicksById)

module.exports = router
