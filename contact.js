£// Cart functionality for contact page
let cart = JSON.parse(localStorage.getItem('mthw3-cart')) || [];

// DOM elements
const cartCount = document.getElementById('cartCount');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Cart click handler - navigate to cart page
document.getElementById('cart').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Handle contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message (in a real app, you'd send this to a server)
    showSuccessMessage();
    
    // Reset form
    form.reset();
}

// Show success message
function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        color: #fff;
        padding: 2rem 3rem;
        border-radius: 10px;
        z-index: 1001;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    notification.innerHTML = `
        <h3 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Thank You!</h3>
        <p style="margin: 0; opacity: 0.9;">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    // Close on overlay click
    overlay.addEventListener('click', closeModal);
    
    // Auto close after 3 seconds
    setTimeout(closeModal, 3000);
    
    function closeModal() {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }
}

// Load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('mthw3-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Load cart on page load
window.addEventListener('load', loadCart);