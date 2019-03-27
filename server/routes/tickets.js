const router = require('express').Router()
import {createTicket} from "../controllers/tickets";

// POST request - create a ticket
router.post('/', createTicket)

module.exports = router
