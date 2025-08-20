const express = require('express');
const router = express.Router();

// Placeholder orders
let orders = [];

// POST create order
router.post('/', (req, res) => {
  const { name, email, address, city, zip, cartItems } = req.body;
  const newOrder = {
    id: orders.length + 1,
    name,
    email,
    address,
    city,
    zip,
    cartItems,
    date: new Date()
  };
  orders.push(newOrder);
  res.json({ message: 'Order placed successfully', order: newOrder });
});

// GET all orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
