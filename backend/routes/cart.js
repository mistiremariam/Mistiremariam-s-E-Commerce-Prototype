const express = require('express');
const router = express.Router();

// Placeholder cart (for simplicity, stored in memory)
let cart = [];

// GET cart items
router.get('/', (req, res) => {
  res.json(cart);
});

// POST add item to cart
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  cart.push({ productId, quantity });
  res.json({ message: 'Item added to cart', cart });
});

// DELETE clear cart
router.delete('/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
