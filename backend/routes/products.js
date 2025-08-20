const express = require('express');
const router = express.Router();

// Sample product data
let products = [
  { id: 1, name: 'Tomatoes', price: 2.5 },
  { id: 2, name: 'Carrots', price: 1.8 },
  { id: 3, name: 'Spinach', price: 1.2 },
  { id: 4, name: 'Potatoes', price: 0.9 }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET single product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
