// Stripe payment simulation (test mode)

const stripe = require('stripe')('sk_test_your_test_key'); // Replace with your Stripe test secret key
const express = require('express');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency,
      payment_method_types: ['card']
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment intent creation failed' });
  }
});

module.exports = router;
