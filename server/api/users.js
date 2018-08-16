const router = require('express').Router()
const { User } = require('../db/models')
const sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', (req, res, next) => {
  const { userId } = req.params
  const { email } = req.body
  sequelize
    .query(`UPDATE users WHERE email = ${email}`)
    .then(() => res.status(200))
    .catch(() => res.status(500))
})
