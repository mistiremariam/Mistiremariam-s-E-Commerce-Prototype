// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Check if cart exists in localStorage, if not create one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update localStorage
function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add click event to each button
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Get the parent product card
    const productCard = button.parentElement;
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = parseFloat(productCard.querySelector('p').innerText.replace(/[^0-9.]/g, ""));
    const quantity = parseInt(productCard.querySelector('input[type="number"]').value);

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
      // Increase quantity
      existingProduct.quantity += quantity;
    } else {
      // Add new product
      cart.push({
        name: productName,
        price: productPrice,
        quantity: quantity
      });
    }

    // Update localStorage
    updateCartStorage();

    // Optional: show feedback
    alert(`${productName} added to cart!`);
  });
});
