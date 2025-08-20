const items = JSON.parse(localStorage.getItem('orderItems')) || [];
const total = localStorage.getItem('orderTotal') || '0.00';

const orderSummaryDiv = document.getElementById('order-summary');
items.forEach(item => {
  const row = document.createElement('div');
  row.className = 'order-item';
  row.innerHTML = `
    <div><strong>${item.name}</strong> × ${item.quantity}</div>
    <div>$${(item.price * item.quantity).toFixed(2)}</div>
  `;
  orderSummaryDiv.appendChild(row);
});

document.getElementById('order-total').textContent = total;

// clean up
localStorage.removeItem('orderItems');
localStorage.removeItem('orderTotal');
document.getElementById('confirm-order').addEventListener('click', () => {
  // Handle order confirmation (e.g., send to API)
  alert('Order confirmed!');
});