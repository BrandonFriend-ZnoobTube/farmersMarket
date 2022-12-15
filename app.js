const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const productTypes = require('./models/productTypes');

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
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render('products/index', { products });
  } catch (e) {
    next(e);
  }
});

app.get('/products/new', (req, res) =>{
  res.render('products/new', { productTypes });
});

app.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/detail', { product });
  } catch (e) {
    next(e);
  }
});

app.get('/products/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, productTypes });
  } catch (e) {
    next(e);
  }
});

app.post('/products/create', async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${ newProduct._id }`);
  } catch (e) {
    next(e);
  }
});

app.put('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const editedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${ editedProduct._id }`);
  } catch (e) {
    next(e);
  }
});

app.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (e) {
    next(e);
  }
});



app.listen(port, () => {
  console.log(`Server running on port: ${ port }`);
});