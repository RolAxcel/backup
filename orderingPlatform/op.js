let cart = [];
let total = 0;
let cartCount = 0;

function addToCart(itemName, itemPrice) {
    // Add the item to the cart array
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;  // Update the total price
    cartCount++;  // Increment the number of items in the cart

    updateCartIcon();  // Update the cart icon count
    updateCart();  // Update the cart modal
}

function updateCartIcon() {
    // Update the cart icon with the number of items in the cart
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;  // Display the cart count number
}

function updateCart() {
    // Update the cart modal with the list of items and total
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');

    cartItems.innerHTML = '';  // Clear the existing items in the modal
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');  // Apply the same styling as menu item

        // Add item content to cart
        div.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: ₱${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    totalDisplay.textContent = `₱${total}`;  // Update total in the modal
}

function removeFromCart(index) {
    // Remove item from cart and update total
    const item = cart[index];
    cart.splice(index, 1);
    total -= item.price;
    cartCount--;  // Decrement cart count

    updateCartIcon();  // Update the cart icon count
    updateCart();  // Update the cart modal
}

function toggleCartModal() {
    // Toggle the visibility of the cart modal
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Reset cart after checkout
    cart = [];
    total = 0;
    cartCount = 0;

    updateCartIcon();  // Reset the cart count
    updateCart();  // Reset the cart modal

    // Close the modal
    toggleCartModal();

    // Show checkout success message
    alert('Thank you for your purchase!');
}

function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.dataset.category === category || category === 'all') {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Download cart items as a text file when the download icon is clicked
function downloadCartItems() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
    let cartContent = [];

    // Loop through all cart items and collect their information
    cartItems.forEach(item => {
        const itemName = item.querySelector('h3') ? item.querySelector('h3').innerText : 'Unnamed Item';
        const itemPrice = item.querySelector('p') ? item.querySelector('p').innerText : 'Unknown Price';
        cartContent.push(`Item: ${itemName}, Price: ${itemPrice}`);
    });

    // Convert the cart content to a string
    const cartText = cartContent.join('\n');

    // Create a Blob from the cart content and trigger the download
    const blob = new Blob([cartText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cart-items.txt'; // Name of the file to download
    link.click();
}

// Event listener for the download icon click
document.getElementById('download-icon').addEventListener('click', downloadCartItems);
