const mongoose = require('mongoose');
const Farms = require('../models/farm');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Connected to Mongo');
  })
  .catch(err => {
    console.log(`Error: ${ err }`);
  });

// name, city, email, products
const seedFarm = [
  {
    name: 'Blount County Farmer\'s Market',
    city: 'Maryville',
    email: 'bcfarmersmarket@gmail.com'
  },
  {
    name: 'Plentiful Harvest',
    city: 'Loudon',
    email: 'plentifulharvest@yahoo.com'
  }
]

Farms.insertMany(seedFarm)
  .then(res => {
    console.log(res);
  }).catch(e => {
  console.log(e);
});