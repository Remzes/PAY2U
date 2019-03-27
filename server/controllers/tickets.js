import Ticket from "../models/Ticket"
import ticketValidation from "../helpers/ticketValidation"

export const createTicket = (req, res) => {
  const results = ticketValidation(req.body)
  if (!results.isValid) return res.json({ success: false, errors: results.errors })
  const {offer_id, clicks, order_id, comment, order_sum} = req.body
  Ticket.create({offer_id, clicks, order_id, comment, order_sum })
    .then(() => res.json({ success: true, message: 'Вы успешно добавили тикет!'}))
    .catch(err => res.json({ success: false, message: 'Произошла ошибка! Повторите позже.' }))
}
