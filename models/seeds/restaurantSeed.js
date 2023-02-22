const mongoose = require('mongoose')
const restaurantModel = require('../restaurant-model')
require('dotenv').config()
const restaurantJson = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoDB connected - seed!');
  restaurantJson.results.forEach(restaurant => {
    restaurantModel.create(restaurant)
  })
  console.log('done')
})