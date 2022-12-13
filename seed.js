const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Connected to Mongo');
  })
  .catch(err => {
    console.log(`Error: ${ err }`);
  });

const seedData = [
  {
    name: 'Celery',
    price: 0.5,
    category: 'vegetable'
  },
  {
    name: 'Milk',
    price: 3.99,
    category: 'dairy'
  },
  {
    name: 'Cheese',
    price: 1.99,
    category: 'dairy'
  },
  {
    name: 'Squash',
    price: 0.75,
    category: 'vegetable'
  },
  {
    name: 'Watermelon',
    price: 1.25,
    category: 'fruit'
  },
  {
    name: 'Orange',
    price: 0.33,
    category: 'fruit'
  }
];

Product.insertMany(seedData)
  .then(res => {
    console.log(res);
  }).catch(e => {
  console.log(e);
});