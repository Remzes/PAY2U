import Sequelize from 'sequelize'
import {sequelize} from "../db/index"
import Offer from './Offer'

module.exports = sequelize.define('Click', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  offer_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Offer,
      key: 'id'
    }
  },
  hash: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  datetime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, { timestamps: false })
