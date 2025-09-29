# Copilot Instructions

## Project Overview
MThw3 is a minimalist ecommerce website built with vanilla HTML, CSS, and JavaScript. The project focuses on clean design, smooth interactions, and responsive layout without heavy frameworks.

## Architecture & Structure
- **Frontend-only**: Pure HTML/CSS/JS without backend dependencies
- **Single Page Application**: All functionality contained in one page
- **Component Structure**: Products rendered dynamically via JavaScript
- **Local Storage**: Cart persistence using browser storage

## Key Files & Patterns
- `index.html`: Semantic HTML structure with clear sections (header, hero, products, footer)
- `styles.css`: Mobile-first responsive design using CSS Grid and Flexbox
- `script.js`: Vanilla JS with modular functions for cart management and product rendering

## Development Conventions
- **CSS**: BEM-inspired class naming, CSS custom properties for theming
- **JavaScript**: Pure ES6+ features, no external dependencies
- **Design**: Minimalist aesthetic with subtle animations and micro-interactions
- **Typography**: Inter font family for clean, modern text rendering

## Product Management
- Products defined in `products` array in `script.js`
- Each product requires: `id`, `name`, `price`, `image` (emoji placeholder)
- Cart functionality handles quantity tracking and local storage persistence

## Styling Approach
- **Colors**: Primarily black/white with gray accents for minimalism
- **Layout**: CSS Grid for product grid, Flexbox for navigation and components
- **Responsive**: Mobile-first breakpoints at 768px and 480px
- **Animations**: CSS transitions for hover states, transform effects for interactions

## Adding Features
- New products: Add to `products` array with unique ID
- New pages: Consider SPA routing or separate HTML files
- Styling: Follow existing color scheme and spacing patterns
- JavaScript: Maintain modular function structure and vanilla JS approach

## Testing & Preview
- Open `index.html` directly in browser (no build process required)
- Test responsive design at different viewport sizes
- Verify cart persistence across browser refresh
- Check accessibility with keyboard navigation