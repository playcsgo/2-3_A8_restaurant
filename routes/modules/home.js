const express = require('express')
const router = express.Router()
const restaurantModel = require('../../models/restaurant-model')

router.get('/', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ _id: 'asc' }) // in sequence order
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// sort
router.post('/', (req, res) => {
  let selectedSort = {
    asc: false,
    desc: false,
    byCategory: false,
    byLocation: false
  }
  let sortMethod
  switch(req.body.sort) {
    case 'asc':
      sortMethod = { name: 'asc' }
      selectedSort.asc = true
      break
    case 'desc':
      sortMethod = { name: 'desc' }
      selectedSort.desc = true
      break
    case 'byCategory':
      sortMethod = { category: 'asc' }
      selectedSort.byCategory = true
      break
    case 'byLocation':
      sortMethod = { location: 'asc' }
      selectedSort.byLocation = true
      break
    default:
      sortMethod = { _id: 'asc' }
  }
  restaurantModel.find()
    .lean()
    .sort(sortMethod)
    .then(restaurants => res.render('index', {restaurants, selectedSort}))
})



// search get 
router.get('/search', (req, res) => {
  console.log(req.query.keyword)
  if (!req.query.keyword) {
    res.redirect('/')
  }
  let selectedSort = {
    asc: false,
    desc: false,
    byCategory: false,
    byLocation: false
  }
  let sortMethod
  switch(req.body.sort) {
    case 'asc':
      sortMethod = { name: 'asc' }
      selectedSort.asc = true
      break
    case 'desc':
      sortMethod = { name: 'desc' }
      selectedSort.desc = true
      break
    case 'byCategory':
      sortMethod = { category: 'asc' }
      selectedSort.byCategory = true
      break
    case 'byLocation':
      sortMethod = { location: 'asc' }
      selectedSort.byLocation = true
      break
    default:
      sortMethod = { _id: 'asc' }
  }

  const keyword = req.query.keyword.trim().toLowerCase()
  restaurantModel.find()
    .lean()
    .sort(sortMethod)
    .then(allRestaurants => {
      const filteredRestaurant = allRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) || 
        restaurant.name_en.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: filteredRestaurant, keyword })
    })
    .catch(err => console.log(err))
})

// search post 
router.post('/search', (req, res) => {
  console.log(req.query.keyword)
  if (!req.query.keyword) {
    res.redirect('/')
  }
  let selectedSort = {
    asc: false,
    desc: false,
    byCategory: false,
    byLocation: false
  }
  let sortMethod
  switch(req.body.sort) {
    case 'asc':
      sortMethod = { name: 'asc' }
      selectedSort.asc = true
      break
    case 'desc':
      sortMethod = { name: 'desc' }
      selectedSort.desc = true
      break
    case 'byCategory':
      sortMethod = { category: 'asc' }
      selectedSort.byCategory = true
      break
    case 'byLocation':
      sortMethod = { location: 'asc' }
      selectedSort.byLocation = true
      break
    default:
      sortMethod = { _id: 'asc' }
  }

  const keyword = req.query.keyword.trim().toLowerCase()
  restaurantModel.find()
    .lean()
    .sort(sortMethod)
    .then(allRestaurants => {
      const filteredRestaurant = allRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) || 
        restaurant.name_en.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: filteredRestaurant, keyword })
    })
    .catch(err => console.log(err))
})

module.exports = router