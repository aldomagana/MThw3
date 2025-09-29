// Sample products for recommendations (from shop.js)
const allProducts = [
    {
        id: 1,
        name: "Minimalist Watch",
        price: 199,
        image: "⌚",
        category: "electronics"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149,
        image: "🎧",
        category: "electronics"
    },
    {
        id: 3,
        name: "Premium Notebook",
        price: 29,
        image: "📓",
        category: "home"
    },
    {
        id: 4,
        name: "Ceramic Coffee Mug",
        price: 24,
        image: "☕",
        category: "home"
    },
    {
        id: 5,
        name: "Desk Lamp",
        price: 89,
        image: "💡",
        category: "home"
    },
    {
        id: 6,
        name: "Plant Pot",
        price: 39,
        image: "🪴",
        category: "home"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('mthw3-cart')) || [];

// DOM elements
const cartCount = document.getElementById('cartCount');
const emptyCart = document.getElementById('emptyCart');
const cartItems = document.getElementById('cartItems');
const cartActions = document.getElementById('cartActions');
const cartSummary = document.getElementById('cartSummary');
const recommendedSection = document.getElementById('recommendedSection');
const recommendedGrid = document.getElementById('recommendedGrid');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCart();
    renderRecommendedProducts();
});

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render the entire cart
function renderCart() {
    if (cart.length === 0) {
        showEmptyCart();
    } else {
        showCartWithItems();
        renderCartItems();
        updateCartSummary();
    }
}

// Show empty cart state
function showEmptyCart() {
    emptyCart.style.display = 'block';
    cartItems.style.display = 'none';
    cartActions.style.display = 'none';
    cartSummary.style.display = 'none';
    recommendedSection.style.display = 'none';
}

// Show cart with items
function showCartWithItems() {
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartActions.style.display = 'flex';
    cartSummary.style.display = 'block';
    recommendedSection.style.display = 'block';
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });
}

// Create individual cart item
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <div class="cart-item-image">${item.image}</div>
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Unit price: $${item.price}</p>
        </div>
        <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                   onchange="updateQuantity(${item.id}, this.value)" readonly>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">×</button>
    `;
    
    return cartItem;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart();
        renderCart();
        updateCartCount();
        showUpdateFeedback('Quantity updated');
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
    showUpdateFeedback('Item removed from cart');
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
        showUpdateFeedback('Cart cleared');
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Free shipping for orders over $100
    const shippingElement = document.getElementById('shipping');
    if (subtotal >= 100) {
        shippingElement.textContent = 'Free';
        shippingElement.style.color = '#28a745';
    } else {
        shippingElement.textContent = '$9.99';
        shippingElement.style.color = '#666';
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.08;
    const grandTotal = total + tax;
    
    // Simulate checkout process
    showCheckoutModal(grandTotal + tax);
}

// Show checkout modal
function showCheckoutModal(total) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <h2 style="margin: 0 0 1rem 0; color: #000;">Checkout</h2>
            <p style="margin: 0 0 1.5rem 0; color: #666;">
                This is a demo checkout. Total: <strong>$${total.toFixed(2)}</strong>
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="completeOrder()" style="
                    background: #000;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Complete Order</button>
                <button onclick="closeModal()" style="
                    background: #f8f9fa;
                    color: #666;
                    border: 1px solid #ddd;
                    padding: 0.75rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functions
    window.closeModal = function() {
        document.body.removeChild(modal);
    };
    
    window.completeOrder = function() {
        // Simulate successful order
        cart = [];
        saveCart();
        updateCartCount();
        document.body.removeChild(modal);
        
        showOrderSuccess();
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    };
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Show order success
function showOrderSuccess() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #28a745;
        color: white;
        padding: 2rem 3rem;
        border-radius: 10px;
        z-index: 1001;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    notification.innerHTML = `
        <h2 style="margin: 0 0 1rem 0;">🎉 Order Successful!</h2>
        <p style="margin: 0; opacity: 0.9;">Thank you for your purchase. Redirecting to home...</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Render recommended products
function renderRecommendedProducts() {
    if (cart.length === 0) return;
    
    // Get products not in cart
    const cartProductIds = cart.map(item => item.id);
    const recommended = allProducts.filter(product => !cartProductIds.includes(product.id)).slice(0, 4);
    
    recommendedGrid.innerHTML = '';
    
    recommended.forEach(product => {
        const item = document.createElement('div');
        item.className = 'recommended-item';
        item.onclick = () => addRecommendedToCart(product.id);
        
        item.innerHTML = `
            <div class="recommended-image">${product.image}</div>
            <div class="recommended-info">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            </div>
        `;
        
        recommendedGrid.appendChild(item);
    });
}

// Add recommended product to cart
function addRecommendedToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCart();
        renderCart();
        updateCartCount();
        renderRecommendedProducts();
        showUpdateFeedback(`${product.name} added to cart!`);
    }
}

// Show update feedback
function showUpdateFeedback(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 1001;
        font-size: 0.9rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('mthw3-cart', JSON.stringify(cart));
}

// Cart icon click handler (since we're on the cart page, just scroll to top)
document.getElementById('cart').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    renderCart();
});

// Auto-save cart periodically
setInterval(saveCart, 30000); // Save every 30 seconds