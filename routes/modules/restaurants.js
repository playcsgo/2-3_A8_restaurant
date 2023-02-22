const express = require('express')
const restaurantModel = require('../../models/restaurant-model')
const router = express.Router()

// C-1 (create page)
router.post('/create', (req, res) => {
  res.render('create')
})

// C-2 (form and inputs)
router.post('/new', (req, res) => {
  restaurantModel.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// R (read restaurant)
router.get('/:id', (req, res) => {
  const id = req.params.id
  restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})
// U-1 (edit page)
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// U-2 (form and inputs with valule="")
router.put('/:id', (req, res) => {
  const id = req.params.id
  restaurantModel.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// D (delete restaurant)
router.delete('/:id', (req, res) => {
  const id = req.params.id
  restaurantModel.findById(id)
    .then(resstaurant => resstaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})



module.exports = router