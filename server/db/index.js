import Sequelize from 'sequelize'
import {config} from "../config/config"

export const sequelize = new Sequelize({
  dialect: config.dialect,
  timestamp: false,
  storage: config.storage
});

export const dbInit = routeInit => {
  sequelize.sync()
    .then(() => routeInit())
    .catch(err => console.log("Error!", err.toString()))
}
