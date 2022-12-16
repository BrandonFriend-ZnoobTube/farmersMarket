const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const productTypes = require('./models/productTypes');
const TryAsync = require('./utils/TryAsync');
const ExpressError = require('./utils/ExpressError');

const Product = require('./models/product');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Connected to Mongo');
  })
  .catch(err => {
    console.log(`Error: ${ err }`);
  });

const port = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', TryAsync(async (req, res, next) => {
  const products = await Product.find({});
  res.render('products/index', { products });
}));

app.get('/products/new', (req, res) => {
  res.render('products/new', { productTypes });
});

app.get('/products/:id', TryAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/detail', { product });
}));

app.get('/products/:id/edit', TryAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, productTypes });
}));

app.post('/products/create',TryAsync(async (req, res, next) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${ newProduct._id }`);
}));

app.put('/products/:id', TryAsync(async (req, res, next) => {
  const { id } = req.params;
  const editedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect(`/products/${ editedProduct._id }`);
}));

app.delete('/products/:id', TryAsync(async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
}));

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500} = err;
  if (!err.message) { err.message = 'Something went wrong'; }
  res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
  console.log(`Server running on port: ${ port }`);
});