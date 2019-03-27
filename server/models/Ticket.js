import Sequelize from 'sequelize'
import {sequelize} from "../db/index"
import Offer from './Offer'

module.exports = sequelize.define('Ticket', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  offer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Offer,
      key: 'id'
    }
  },
  order_id: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  order_sum: {
    type: Sequelize.REAL,
    allowNull: false
  },
  comment: {
    type: Sequelize.TEXT
  },
  clicks: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, { timestamps: false })
