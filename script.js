// Sample product data
const products = [
    {
        id: 1,
        name: "Minimalist Watch",
        price: 199,
        image: "⌚"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149,
        image: "🎧"
    },
    {
        id: 3,
        name: "Premium Notebook",
        price: 29,
        image: "📓"
    },
    {
        id: 4,
        name: "Ceramic Coffee Mug",
        price: 24,
        image: "☕"
    },
    {
        id: 5,
        name: "Desk Lamp",
        price: 89,
        image: "💡"
    },
    {
        id: 6,
        name: "Plant Pot",
        price: 39,
        image: "🪴"
    }
];

// Cart functionality
let cart = [];

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
});

// Render products to the grid
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
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
        
        updateCartCount();
        showAddToCartFeedback();
    }
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show feedback when item is added to cart
function showAddToCartFeedback() {
    // Create a temporary notification
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
    notification.textContent = 'Item added to cart!';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Cart click handler - navigate to cart page
document.getElementById('cart').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Add some interactivity to product cards
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-card') || e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        if (card && !e.target.classList.contains('add-to-cart')) {
            // Add a subtle scale effect when clicking on the card
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        }
    }
});

// Simple search functionality (for future enhancement)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredProducts;
}

// Local storage for cart persistence
function saveCart() {
    localStorage.setItem('mthw3-cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('mthw3-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart on page unload
window.addEventListener('beforeunload', saveCart);

// Load cart on page load
window.addEventListener('load', loadCart);