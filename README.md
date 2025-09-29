# MThw3 - Minimalist Ecommerce Store

> A clean, minimalistic ecommerce website built with vanilla HTML, CSS, and JavaScript, focusing on exceptional user experience and modern design principles.

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Description

MThw3 is a modern, minimalist ecommerce platform designed to showcase products in a clean, distraction-free environment. Built entirely with vanilla web technologies, it demonstrates how powerful web applications can be created without heavy frameworks or dependencies.

The project emphasizes:
- **User Experience**: Intuitive navigation and smooth interactions
- **Performance**: Lightweight, fast-loading pages with no external dependencies
- **Accessibility**: Semantic HTML and keyboard-friendly navigation
- **Responsiveness**: Seamless experience across all device sizes
- **Maintainability**: Clean, well-documented code structure

### Target Audience
- Small businesses looking for a simple ecommerce solution
- Developers learning web fundamentals
- Anyone who appreciates minimalist design and clean code

## ✨ Features

### Core Functionality
- **🏠 Homepage**: Hero section with featured products and company branding
- **🛍️ Shop Page**: Complete product catalog with advanced filtering
- **ℹ️ About Page**: Company story, mission, and values
- **📞 Contact Page**: Contact form with validation and FAQ section
- **🛒 Cart Page**: Full cart management with checkout simulation

### User Experience
- **Minimalist Design**: Clean, modern interface focused on products
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Cart**: Real-time cart updates with persistent storage
- **Smart Filtering**: Category, price range, and search functionality
- **Smooth Animations**: Subtle hover effects and micro-interactions
- **Form Validation**: User-friendly form validation with feedback

### Technical Features
- **Local Storage**: Cart and preferences persist between sessions
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **SEO Friendly**: Semantic HTML structure for better search visibility
- **Fast Loading**: No external dependencies, optimized assets

## 🚀 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic text editor (VS Code, Sublime Text, etc.) for customization
- Local web server (optional, for development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/aldomagana/MThw3.git
   cd MThw3
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file access
   open index.html
   
   # Option 2: Using a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start exploring!**
   - Browse products on the homepage
   - Use the shop page for full catalog
   - Add items to cart and test checkout flow

### Alternative Installation Methods

**Download ZIP**
1. Click "Code" → "Download ZIP" on GitHub
2. Extract the ZIP file
3. Open `index.html` in your browser

**Use Live Server Extension (VS Code)**
1. Install the Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📖 Usage Guide

### For End Users

#### Navigation
- **Homepage**: Overview of featured products and company branding
- **Shop**: Browse all products with filtering options
- **About**: Learn about the company and values
- **Contact**: Get in touch or find answers to common questions
- **Cart**: Manage your items and proceed to checkout

#### Shopping Flow
1. **Browse Products**: Start on homepage or visit shop page
2. **Filter Products**: Use category, price, or search filters
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: Click cart icon to view/edit items
5. **Checkout**: Review order and complete purchase (demo)

#### Cart Management
- **View Items**: Click cart icon in navigation
- **Update Quantities**: Use +/- buttons or direct input
- **Remove Items**: Click × button on individual items
- **Clear Cart**: Use "Clear Cart" button to remove all items

### For Developers

#### Adding Products
Edit the `products` array in `script.js` (homepage) or `shop.js` (shop page):

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 99,
        image: "🎁", // Emoji or image path
        category: "electronics" // electronics, accessories, home, lifestyle
    },
    // Add more products...
];
```

#### Customizing Styles
The entire visual design is controlled by `styles.css`:

```css
/* Main brand colors */
:root {
    --primary-color: #000;
    --secondary-color: #666;
    --background-color: #fff;
    --accent-color: #f8f9fa;
}
```

#### Adding New Pages
1. Create new HTML file following existing structure
2. Include navigation header and footer
3. Link stylesheet and appropriate JavaScript
4. Update navigation links in all pages

#### Cart Integration
To add cart functionality to new pages:

```javascript
// Include cart management
let cart = JSON.parse(localStorage.getItem('mthw3-cart')) || [];

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Navigate to cart
document.getElementById('cart').addEventListener('click', function() {
    window.location.href = 'cart.html';
});
```

## 📁 Project Structure

```
MThw3/
├── index.html              # Homepage with hero and featured products
├── shop.html               # Product catalog with filtering
├── about.html              # Company information and story
├── contact.html            # Contact form and information
├── cart.html               # Shopping cart and checkout
├── styles.css              # All styling and responsive design
├── script.js               # Homepage functionality
├── shop.js                 # Shop page with filtering logic
├── contact.js              # Contact form handling
├── cart.js                 # Cart management and checkout
├── README.md               # Project documentation
└── .github/
    └── copilot-instructions.md # AI agent guidelines
```

### File Responsibilities

| File | Purpose | Key Features |
|------|---------|--------------|
| `index.html` | Homepage | Hero section, featured products, navigation |
| `shop.html` | Product catalog | Full inventory, filtering, search |
| `about.html` | Company info | Brand story, values, team information |
| `contact.html` | Contact page | Contact form, FAQ, business details |
| `cart.html` | Shopping cart | Cart management, checkout, recommendations |
| `styles.css` | All styling | Responsive design, animations, themes |
| `script.js` | Homepage logic | Product rendering, cart basics |
| `shop.js` | Shop functionality | Advanced filtering, search, cart integration |
| `contact.js` | Contact features | Form validation, success handling |
| `cart.js` | Cart management | Full cart CRUD, checkout simulation |

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Flexbox, Grid, custom properties, animations
- **JavaScript (ES6+)**: Modern syntax, local storage, DOM manipulation

### Design & UX
- **Google Fonts**: Inter font family for clean typography
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Animations**: Smooth transitions and micro-interactions
- **Mobile-First Design**: Progressive enhancement approach

### Development Tools
- **No Build Process**: Direct browser compatibility
- **Local Storage API**: Persistent cart and preferences
- **Form API**: Built-in validation and handling
- **History API**: Smooth navigation experience

## 🎨 Customization

### Visual Theming
Update CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #000;        /* Main text and buttons */
    --secondary-color: #666;      /* Secondary text */
    --background-color: #fff;     /* Page backgrounds */
    --accent-color: #f8f9fa;      /* Cards and sections */
    --success-color: #28a745;     /* Success states */
    --error-color: #dc3545;       /* Error states */
}
```

### Content Updates
- **Company Name**: Search and replace "MThw3" across all files
- **Logo**: Update the `.logo` class in `styles.css`
- **Colors**: Modify CSS custom properties
- **Typography**: Change font imports in HTML head sections
- **Copy**: Edit text content in HTML files

### Adding Features
- **New Pages**: Follow existing HTML structure
- **Product Categories**: Add categories to product objects
- **Payment Integration**: Replace checkout simulation in `cart.js`
- **User Accounts**: Add authentication logic
- **Search Enhancement**: Extend search functionality in `shop.js`

## 🌐 Browser Support

### Fully Supported
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### Core Features Work On
- **Internet Explorer**: 11 (with graceful degradation)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

### Progressive Enhancement
- Site works without JavaScript for basic browsing
- Enhanced features require modern browser support
- Responsive design works on all screen sizes

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test across different browsers
5. Submit a pull request

### Guidelines
- Maintain minimalist design principles
- Follow existing code style and structure
- Test on mobile devices
- Update documentation for new features
- Keep accessibility in mind

### Areas for Contribution
- New product categories
- Enhanced filtering options
- Accessibility improvements
- Performance optimizations
- Additional page templates
- Integration examples

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by the MThw3 team**

For questions, suggestions, or support, please [open an issue](https://github.com/aldomagana/MThw3/issues) or contact us through the website.