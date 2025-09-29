// Extended product data for the shop page
const allProducts = [
    // Electronics
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
        id: 7,
        name: "Smart Speaker",
        price: 89,
        image: "🔊",
        category: "electronics"
    },
    {
        id: 8,
        name: "Wireless Charger",
        price: 45,
        image: "📱",
        category: "electronics"
    },
    
    // Accessories
    {
        id: 9,
        name: "Leather Wallet",
        price: 79,
        image: "👛",
        category: "accessories"
    },
    {
        id: 10,
        name: "Sunglasses",
        price: 120,
        image: "🕶️",
        category: "accessories"
    },
    {
        id: 11,
        name: "Canvas Tote Bag",
        price: 35,
        image: "👜",
        category: "accessories"
    },
    
    // Home & Living
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
    },
    {
        id: 12,
        name: "Scented Candle",
        price: 28,
        image: "🕯️",
        category: "home"
    },
    {
        id: 13,
        name: "Throw Pillow",
        price: 45,
        image: "🛋️",
        category: "home"
    },
    
    // Lifestyle
    {
        id: 14,
        name: "Water Bottle",
        price: 32,
        image: "🍶",
        category: "lifestyle"
    },
    {
        id: 15,
        name: "Yoga Mat",
        price: 65,
        image: "🧘",
        category: "lifestyle"
    },
    {
        id: 16,
        name: "Travel Mug",
        price: 38,
        image: "🧳",
        category: "lifestyle"
    }
];

// Current filtered products
let filteredProducts = [...allProducts];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('mthw3-cart')) || [];

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
});

// Render products to the grid
function renderProducts() {
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    filteredProducts.forEach(product => {
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
        
        updateCartCount();
        saveCart();
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
    }, 3000);
}

// Filter products based on selected criteria
function filterProducts() {
    let filtered = [...allProducts];
    
    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Price filter
    const selectedPriceRange = priceFilter.value;
    if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
        filtered = filtered.filter(product => {
            if (max === undefined) return product.price >= min;
            return product.price >= min && product.price <= max;
        });
    }
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredProducts = filtered;
    renderProducts();
}

// Search products
function searchProducts() {
    filterProducts();
}

// Cart click handler - navigate to cart page
document.getElementById('cart').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Save cart to local storage
function saveCart() {
    localStorage.setItem('mthw3-cart', JSON.stringify(cart));
}

// Load cart from local storage
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