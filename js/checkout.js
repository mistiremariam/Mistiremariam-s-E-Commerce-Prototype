// js/checkout.js

// ---- Config ----
const CART_KEY = 'cart';                // where your cart is stored
const ORDER_ITEMS_KEY = 'orderItems';   // temp store for confirmation page
const ORDER_TOTAL_KEY = 'orderTotal';

// Currency helper
const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Elements
const cartSummaryEl = document.getElementById('cart-summary');
const cartTotalEl   = document.getElementById('cart-total');
const payBtn        = document.getElementById('pay-btn');
const statusEl      = document.getElementById('payment-status');

// Optional shipping form (if present on your page)
const form = document.getElementById('checkout-form');

// ---- Cart helpers ----
function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    // sanitize
    return Array.isArray(arr) ? arr.map(sanitizeItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function sanitizeItem(item) {
  if (!item) return null;
  const id = item.id ?? item.productId ?? cryptoRandomId();
  const name = String(item.name ?? 'Unnamed item');
  const price = Number(item.price);
  const qty = Number(item.quantity ?? 1);

  if (!isFinite(price) || price < 0) return null;
  const quantity = !isFinite(qty) || qty < 1 ? 1 : Math.floor(qty);

  return {
    id,
    name,
    price,
    quantity,
    image: item.image ?? null
  };
}

function cryptoRandomId() {
  // fallback id for malformed items
  return 'id_' + Math.random().toString(36).slice(2);
}

// ---- Render cart ----
function renderCart() {
  const cart = readCart();
  cartSummaryEl.innerHTML = ''; // clear

  if (cart.length === 0) {
    cartSummaryEl.innerHTML = `
      <p>Your cart is empty.</p>
      <p><a class="btn" href="index.html">Browse vegetables</a></p>
    `;
    cartTotalEl.textContent = fmt.format(0);
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.title = 'Add items to cart first';
    }
    return;
  }

  let total = 0;
  const frag = document.createDocumentFragment();

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:54px;height:54px;object-fit:cover;border-radius:8px;">` : ''}
        <strong>${item.name}</strong> × ${item.quantity}
      </div>
      <div>${fmt.format(lineTotal)}</div>
    `;
    frag.appendChild(row);
  });

  // Append rows
  cartSummaryEl.appendChild(frag);

  // Total
  cartTotalEl.textContent = fmt.format(total);

  // Enable pay
  if (payBtn) {
    payBtn.disabled = false;
    payBtn.title = '';
    // attach handler with current total
    payBtn.onclick = () => handlePay(total, cart);
  }
}

// ---- Optional: validate shipping form if present ----
function validateFormIfPresent() {
  if (!form) return { ok: true, data: null }; // no form on page
  const name = form.querySelector('#name')?.value?.trim();
  const email = form.querySelector('#email')?.value?.trim();
  const address = form.querySelector('#address')?.value?.trim();
  const city = form.querySelector('#city')?.value?.trim();
  const zip = form.querySelector('#zip')?.value?.trim();

  if (!name || !email || !address || !city || !zip) {
    return { ok: false, msg: 'Please fill in all required fields.' };
  }
  return { ok: true, data: { name, email, address, city, zip } };
}

// ---- Payment flow (simulated Stripe intent + redirect) ----
async function handlePay(total, cart) {
  // Validate form if it exists
  const formCheck = validateFormIfPresent();
  if (!formCheck.ok) {
    alert(formCheck.msg);
    return;
  }

  try {
    // Create payment intent (simulated)
    const res = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Stripe expects cents on the server; our server multiplies by 100 already
      body: JSON.stringify({ amount: Number(total.toFixed(2)) })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Payment intent failed');

    console.log('Stripe clientSecret:', data.clientSecret);

    // Simulate success immediately (no card input in this prototype)
    if (statusEl) {
      statusEl.textContent = 'Payment simulated successfully!';
      statusEl.style.color = 'green';
    }

    // Save order snapshot for confirmation page
    localStorage.setItem(ORDER_ITEMS_KEY, JSON.stringify(cart));
    localStorage.setItem(ORDER_TOTAL_KEY, total.toFixed(2));

    // (Optional) you could also clear the active cart now:
    localStorage.removeItem(CART_KEY);

    // Redirect
    window.location.href = 'order-confirmation.html';
  } catch (err) {
    console.error(err);
    if (statusEl) {
      statusEl.textContent = 'Payment failed. Please try again.';
      statusEl.style.color = 'crimson';
    }
    alert('Payment failed. Please try again.');
  }
}

// Init
document.addEventListener('DOMContentLoaded', renderCart);
