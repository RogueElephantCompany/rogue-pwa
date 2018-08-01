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
  console.log('req.params: ', req.params)
  console.log('req.body', req.body)
  const { email } = req.body
  const { id, userId } = req.params
  try {
    const info = await Info.findAll({
      where: {
        // email: email,
        // id: id,
        userId: userId
      }
    })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // const { userId } = req.params
  console.log('post req.body: ', req.body)
  console.log('req.params: ', req.params)
  console.log('req.header: ', req.header)
  const { email } = req.body
  Info.create(req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => next(err))
})
