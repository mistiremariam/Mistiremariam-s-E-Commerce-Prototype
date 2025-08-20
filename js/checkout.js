// Simulated cart items (replace with your real cart logic)
const cartItems = [
  { id: 1, name: "Tomatoes", price: 2.5, quantity: 2 },
  { id: 2, name: "Carrots", price: 1.8, quantity: 3 }
];

// Display cart summary
const cartSummary = document.getElementById('cart-summary');
let total = 0;

cartItems.forEach(item => {
  const div = document.createElement('div');
  div.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
  cartSummary.appendChild(div);
  total += item.price * item.quantity;
});

document.getElementById('cart-total').textContent = total.toFixed(2);

// Handle Pay Now button
document.getElementById('pay-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total })
    });

    const data = await response.json();
    console.log('Client Secret:', data.clientSecret);

    // Simulate payment success
    alert("Payment simulated successfully!");

    // Save cart data to localStorage for order confirmation
    localStorage.setItem('orderItems', JSON.stringify(cartItems));
    localStorage.setItem('orderTotal', total.toFixed(2));

    // Redirect to order confirmation page
    window.location.href = 'order-confirmation.html';

  } catch (error) {
    console.error("Payment simulation failed:", error);
    alert("Payment failed. Please try again.");
  }
});
