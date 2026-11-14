# QUICK START GUIDE - Dean by D'Zyne Website

## ⚡ Get Your Site Running in 30 Seconds

### Step 1: Open the Website
1. Navigate to: `C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE`
2. Double-click `index.html` to open in your browser

That's it! Your website is now live locally.

---

## 🎯 Next Steps: Customize Your Content

### Step 2: Update Your Information (5 minutes)

Open `index.html` in your text editor and find these sections:

**Contact Information** (near the bottom):
```html
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
<p>Your City, Country</p>
```

Replace with your actual contact details.

### Step 3: Update Partners (2 minutes)

Open `js/app.js` and find the `partners:` array around line 42. Replace the example partners with your actual partners:

```javascript
{
    name: 'Your Partner Name',
    initials: 'YP',
    description: 'What they do',
    website: 'https://their-website.com',
    linkedin: 'https://linkedin.com/company/partner'
}
```

### Step 4: Customize Services (Optional)

The services carousel automatically displays services from `js/app.js`. The services are already configured but you can customize them:

```javascript
services: [
    {
        name: 'Your Service Name',
        description: 'What you offer'
    }
]
```

---

## 🎨 Visual Customization

### Change Colors
Edit `css/styles.css` at the top where you see:
```css
:root {
    --color-accent: #ffd700;        /* Change gold color */
    --color-secondary: #e94560;     /* Change red/pink */
}
```

### Add Your Logo
Replace the placeholder "D" in `index.html` hero section with your logo:
```html
<!-- Option 1: Text Logo -->
<div class="logo-placeholder">YL</div>

<!-- Option 2: Image Logo -->
<img src="assets/logo.png" alt="Logo" class="logo-image">
```

---

## 🚀 Advanced: Use a Local Server

For better performance and testing, use a local server:

### Using VS Code (Easiest)
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Your site opens in a browser and auto-refreshes when you save

### Using Python
```bash
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE"
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📱 Test Responsive Design

### In Your Browser
Press `F12` to open Developer Tools:
1. Click the mobile device icon (or Ctrl+Shift+M)
2. Select different devices to test
3. Your site should look great on all screen sizes

---

## 🌐 Deploy Your Site (Get It Online)

### Option 1: GitHub Pages (Recommended - FREE)
1. Create a GitHub account if you don't have one
2. Create a new repository named: `dean-by-dzyne` or similar
3. Upload all files from your project folder
4. Go to Settings → Pages → Select "main" branch
5. Your site will be live at: `https://yourusername.github.io/repo-name`

### Option 2: Netlify (FREE)
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Connect your repository
5. Deploy! (It's automatic)

### Option 3: Web Hosting
1. Purchase hosting (Bluehost, GoDaddy, Hostinger, etc.)
2. Upload files via FTP
3. Point your domain to the hosting

---

## 📋 Customization Checklist

- [ ] Update email address in footer
- [ ] Update phone number in footer
- [ ] Update business address
- [ ] Add your partners' information
- [ ] Update or add your services
- [ ] Add your logo (replace placeholder)
- [ ] Customize colors if desired
- [ ] Add your social media links
- [ ] Test on mobile devices
- [ ] Deploy to GitHub Pages or hosting

---

## 🔧 File Guide

| File | Purpose |
|------|---------|
| `index.html` | Main website content and structure |
| `css/styles.css` | All styling and animations |
| `js/app.js` | Vue.js app, interactivity, and data |
| `assets/` | Folder for your images and logos |

---

## ❓ Troubleshooting

**Q: Website looks plain without styling?**
A: Make sure `css/styles.css` file exists and browser has access to it.

**Q: Carousel not rotating?**
A: Check that `js/app.js` is loaded (check browser console for errors).

**Q: Changes not showing?**
A: Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R on Mac).

**Q: Need help deploying?**
A: See the "Deploy Your Site" section above.

---

## 💡 Pro Tips

1. **Keep it Updated**: Regularly add new projects to your portfolio
2. **SEO**: Add keywords to page titles and descriptions
3. **Analytics**: Add Google Analytics to track visitors
4. **Performance**: Optimize images before uploading
5. **Backups**: Always keep a local backup of your files

---

## 🎉 You're Ready!

Your professional portfolio website is now set up and ready to customize. Start by updating your contact information and deploying it online!

For more detailed customization, see `README.md` in the project folder.

Good luck with your portfolio! 🚀
