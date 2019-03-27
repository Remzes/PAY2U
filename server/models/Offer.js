import Sequelize from 'sequelize'
import {sequelize} from "../db/index";

module.exports = sequelize.define('Offer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: Sequelize.STRING
  }, { timestamps: false })
