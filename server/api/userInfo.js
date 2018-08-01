const router = require('express').Router()
const { Info } = require('../db/models')
const sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Info.findAll()
    res.json(info)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const info = await Info.findAll({
      where: {
        userId: userId
      }
    })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  Info.create(req.body)
    .then(data => {
      data.setUser(req.user.id)
      res.status(201).json(data)
    })
    .catch(err => next(err))
})
