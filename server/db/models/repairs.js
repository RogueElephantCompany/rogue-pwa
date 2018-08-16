const Sequelize = require('sequelize')
const db = require('../db')

const Repairs = db.define('repairs', {
  date: {
    type: Sequelize.STRING,
  },
  problem: {
    type: Sequelize.STRING,
  },
  technician: {
    type: Sequelize.STRING,
  },
  apptLength: {
    type: Sequelize.STRING,
  },
  cost: {
    type: Sequelize.STRING,
  },
})

module.exports = Repairs
