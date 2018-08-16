const router = require('express').Router()
const { Repairs, User } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Repairs.findAll({ include: [User] })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const info = await Repairs.findAll({
      where: {
        userId: userId,
      },
    })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  Repairs.create(req.body)
    .then(data => {
      data.setUser(req.user.id)
      res.status(201).json(data)
    })
    .catch(err => next(err))
})

router.put('/:userId', (req, res, next) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
  } = req.body
  Repairs.update(
    {
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
    },
    { where: { userId: req.user.id } }
  )
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})
