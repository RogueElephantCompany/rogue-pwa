const router = require('express').Router()
const { Info } = require('../db/models')
const sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Info.findAll({
      attributes: ['id', 'email']
    })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/:email', (req, res, next) => {
  // const { userId } = req.params
  const { email } = req.body
  sequelize
    .query(`UPDATE users WHERE email = ${email}`)
    .then(() => res.status(200))
    .catch(() => res.status(500))
})
