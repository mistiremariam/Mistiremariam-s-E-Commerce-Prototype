// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to render cart
function renderCart() {
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.innerText = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.style.display = 'flex';
    cartItem.style.justifyContent = 'space-between';
    cartItem.style.alignItems = 'center';
    cartItem.style.padding = '10px 0';
    cartItem.style.borderBottom = '1px solid #ccc';

    cartItem.innerHTML = `
      <div>
        <strong>${item.name}</strong> <br>
        Price: $${item.price.toFixed(2)} 
      </div>
      <div>
        Quantity: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" />
        <button data-index="${index}" class="remove-btn">Remove</button>
        
      </div>
      <div>
        Total: $${itemTotal.toFixed(2)}
      </div>
    `;

    cartItemsDiv.appendChild(cartItem);
  });

  cartTotalDiv.innerText = `Cart Total: $${total.toFixed(2)}`;
  checkoutBtn.style.display = 'inline-block';

  // Add event listeners
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', updateQuantity);
  });
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', removeItem);
  });
}

// Update quantity
function updateQuantity(event) {
  const index = event.target.getAttribute('data-index');
  const value = parseInt(event.target.value);
  if (value <= 0) return;
  cart[index].quantity = value;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove item
function removeItem(event) {
  const index = event.target.getAttribute('data-index');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initial render
renderCart();
