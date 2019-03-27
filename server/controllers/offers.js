import Offer from '../models/Offer'
import CacheService from '../services/cache.service'
const cache = new CacheService(60 * 60)

export const getOffers = (req, res) => {
  cache.get('offers', () => Offer.findAll({attributes: ["id", "name"]}))
    .then(offers => res
      .set({'Cache-Control': 'public, max-age=60'})
      .json({success: true, offers}))
    .catch(err => res.json({success: false, message: err.toString()}))
}
