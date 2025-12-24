# Dean by D'Zyne - Professional Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and Vue.js 3. Showcasing web development, app development, and digital integration services.

## 🎯 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Animated Service Carousel** - Auto-rotating showcase of services with manual controls
- **Interactive Components** - Built with Vue.js 3 for dynamic, reactive elements
- **Modern Aesthetics** - Elegant design with sophisticated color palette
- **Smooth Animations** - Scroll-triggered animations and transitions
- **SEO Optimized** - Semantic HTML and meta tags
- **Fast Loading** - Minimal dependencies, optimized performance

## 📁 Project Structure

```
DEAN BY D'ZYNE/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   └── app.js          # Vue.js application and interactions
├── assets/             # (Create this folder for images/logos)
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code recommended)
- Optional: A local server (Python, Node.js, or VS Code Live Server extension)

### Installation

1. **Clone or Download** the project folder
2. **Navigate** to the project directory
3. **Open** `index.html` in your browser

### Using a Local Server (Recommended)

**Option 1: VS Code Live Server**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

**Option 2: Python**
```bash
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE"
python -m http.server 8000
# Visit http://localhost:8000 in your browser
```

**Option 3: Node.js**
```bash
npm install -g http-server
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE"
http-server
```

## 🎨 Customization Guide

### Update Contact Information
Edit the footer section in `index.html`:
```html
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

### Add Your Logo
Replace the logo placeholder in the hero section:
```html
<div class="logo-placeholder">D</div>
```

Or add an image:
```html
<img src="assets/your-logo.png" alt="Logo" class="logo-image">
```

### Update Partner Information
Modify the partners array in `js/app.js`:
```javascript
partners: [
    {
        name: 'Your Partner Name',
        initials: 'YP',
        description: 'Partner description',
        website: 'https://partner-website.com',
        linkedin: 'https://linkedin.com/company/partner'
    },
    // Add more partners...
]
```

### Update Services
Modify the services array in `js/app.js`:
```javascript
services: [
    {
        name: 'Your Service',
        description: 'Service description'
    },
    // Add more services...
]
```

### Change Color Palette
Update the CSS variables in `css/styles.css`:
```css
:root {
    --color-darkest: #1a1a2e;      /* Main dark color */
    --color-primary: #0f3460;       /* Primary blue */
    --color-secondary: #e94560;     /* Accent red/pink */
    --color-accent: #ffd700;        /* Gold highlight */
    --color-light: #eaeaea;         /* Light gray */
    --color-white: #ffffff;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: Full layout (1200px+)
- **Tablet**: 769px - 1199px
- **Mobile**: 480px - 768px
- **Small Mobile**: Below 480px

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vue.js 3** - Reactive JavaScript framework (via CDN)
- **Anime.js** - Advanced animation library (optional)

## ✨ Key Features Explained

### Service Carousel
- Auto-rotates every 6 seconds
- Manual navigation with previous/next buttons
- Smooth transitions with multiple animation effects
- Responsive to clicks and keyboard navigation

### Scroll Animations
- Elements fade in and slide up as they enter viewport
- Staggered animation for multiple elements
- Smooth scroll behavior on link clicks

### Interactive Partner Cards
- Hover effects with smooth transitions
- Click to select and highlight partners
- Social media and website links

### Parallax Hero Section
- Background moves slower than scroll
- Creates depth and visual interest
- Works smoothly on all devices

## 📊 Performance Optimizations

- Minimal external dependencies
- CSS3 animations (hardware-accelerated)
- Lazy loading of images
- Semantic HTML for better SEO
- Mobile-first design approach

## 🌐 Deployment

### Deploy to GitHub Pages
1. Create a GitHub repository
2. Push the project files
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command to: (leave empty)
3. Set publish directory to: (root folder)
4. Deploy!

### Deploy to Other Hosting
Simply upload all files to your hosting provider via FTP or control panel.

## 📞 Contact Information

To add your contact details, update the footer section in `index.html` with your actual:
- Email address
- Phone number
- Business address
- Social media links

## 🔐 Best Practices

- Keep your contact information up to date
- Regularly update your portfolio with new projects
- Test on multiple devices and browsers
- Monitor analytics for visitor insights
- Maintain security of any backend services

## 📝 License

This template is free to use and modify for your portfolio.

## 🤝 Support

For questions or customization assistance, refer to the inline comments in:
- `index.html` - Structure and content
- `css/styles.css` - Styling and layout
- `js/app.js` - Interactions and animations

---

**Built with passion for web developers who want to showcase their work beautifully.**
