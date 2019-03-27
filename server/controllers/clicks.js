import Click from '../models/Click'
import CacheService from '../services/cache.service'
const cache = new CacheService(60 * 60)

export const getClicksById = (req, res) => {
  const {id} = req.params
  cache.get(`clicks[${id}]`, () => Click.findAll({
    attributes: ["id", "offer_id", "hash", "datetime"],
    where: { offer_id: id }
  }))
    .then(clicks => res.json({ success: true, clicks }))
    .catch(err => res.json({ success: false, message: err.toString() }))
}
