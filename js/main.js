let cart = [];

const cartCount = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    // Add product to cart
    cart.push({ id, name, price });
    cartCount.textContent = cart.length;

    alert(`${name} added to cart!`);
  });
});
