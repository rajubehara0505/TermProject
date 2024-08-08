// Cart array to store added products
let cart = [];

// Function to add product to cart
function addToCart(productId) {
    // Find product details from the products section
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    // Check if product is already in the cart
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);

        total += item.price * item.quantity;
    });

    // Update total price
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Function to remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Function to handle checkout
function checkout() {
    if (cart.length > 0) {
        alert('Thank you for your purchase! Your total is $' + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
        cart = []; // Clear the cart
        updateCartDisplay(); // Update the cart display to show it's empty
    } else {
        alert('Your cart is empty.');
    }
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// By default, show the home section
document.addEventListener("DOMContentLoaded", function() {
    navigateTo('home');
});
