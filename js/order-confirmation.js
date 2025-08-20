// Retrieve order details from localStorage
const cartItems = JSON.parse(localStorage.getItem('orderItems')) || [];
const total = localStorage.getItem('orderTotal') || 0;

const orderSummaryDiv = document.getElementById('order-summary');

cartItems.forEach(item => {
  const div = document.createElement('div');
  div.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
  orderSummaryDiv.appendChild(div);
});

document.getElementById('order-total').textContent = total;

// Clear localStorage after displaying order
localStorage.removeItem('orderItems');
localStorage.removeItem('orderTotal');
