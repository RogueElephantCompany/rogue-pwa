const router = require('express').Router()
const { Info } = require('../db/models')
const sequelize = require('sequelize')
module.exports = router

router.get('/:id', async (req, res, next) => {
  console.log('req.params: ', req.params)
  console.log('req.body', req.body)
  const { email } = req.body
  const { id } = req.header
  try {
    const info = await Info.findAll({
      where: {
        email: email,
        //id: id,
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
  const { email } = req.body
  Info.create(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})
