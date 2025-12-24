# Dean by D'Zyne - Complete Setup Guide

## Project Structure

```
DEAN BY D'ZYNE/
├── index.html              # Frontend (Vue.js)
├── css/
│   └── styles.css         # Styling
├── js/
│   └── app.js             # Vue.js Application
├── assets/                # Images, logos, etc.
├── backend/               # Node.js/Express API
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── BACKEND_SETUP.md
└── README.md
```

---

## Quick Start (5 minutes)

### 1. Start Backend Service

**Windows:**
```bash
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE\backend"
START.bat
```

**Mac/Linux:**
```bash
cd "DEAN BY D'ZYNE/backend"
npm install
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Dean by D'Zyne Backend API           ║
║  Server running on port 5000           ║
╚════════════════════════════════════════╝
```

### 2. Open Frontend

**Option A - Direct File (Simple)**
```bash
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE"
start index.html
```

**Option B - Local Server (Recommended)**
```bash
# Using Python (Windows/Mac/Linux)
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE"
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option C - VS Code Live Server**
- Open `index.html` in VS Code
- Right-click → "Open with Live Server"

### 3. Test Contact Form

1. Visit the website
2. Scroll to "Get In Touch" section
3. Fill out the form
4. Submit

✅ You should receive a success message!

---

## Backend Setup (Detailed)

See [backend/BACKEND_SETUP.md](backend/BACKEND_SETUP.md) for:
- Email configuration (Gmail, Outlook, etc.)
- Environment variables setup
- API endpoint documentation
- Deployment instructions

---

## Features

### Frontend ✅
- ✅ Responsive design
- ✅ Service carousel
- ✅ Portfolio section with 6 projects
- ✅ Contact form with validation
- ✅ Smooth animations
- ✅ Mobile-friendly

### Backend ✅
- ✅ Express.js REST API
- ✅ Form validation
- ✅ Email notifications
- ✅ Submission storage
- ✅ CORS support
- ✅ Error handling

---

## Customization

### Update Company Info

Edit `index.html` footer:
```html
<a href="mailto:hello@deanby-dzyne.com">hello@deanby-dzyne.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

### Update Partners

Edit `js/app.js` in the `partners` array:
```javascript
partners: [
    {
        name: 'Your Partner Name',
        initials: 'YP',
        description: 'What they do',
        website: 'https://their-website.com',
        linkedin: 'https://linkedin.com/company/partner'
    }
]
```

### Update Portfolio Projects

Edit `js/app.js` in the `portfolioProjects` array:
```javascript
portfolioProjects: [
    {
        id: 1,
        name: 'Project Name',
        description: 'Project description',
        icon: '🎨',
        color: '#E8F5E9',
        tags: ['Vue.js', 'Node.js'],
        link: 'https://github.com/your-project'
    }
]
```

### Change Colors

Edit `css/styles.css`:
```css
:root {
    --color-primary-dark: #224560;     /* Main color */
    --color-accent-purple: #764DF6;    /* Accent color */
    --color-light-bg: #F0F5F7;         /* Background */
}
```

### Change Logo

Replace placeholder in `index.html`:
```html
<!-- Option 1: Text -->
<div class="logo-placeholder">YL</div>

<!-- Option 2: Image -->
<img src="assets/logo.png" alt="Logo" class="logo-image">
```

---

## Deployment

### Frontend (Choose One)

**1. Netlify (Recommended)**
- Drag and drop your project folder
- Auto-deploys from Git
- Free HTTPS

**2. Vercel**
- Great for static sites
- Free tier available
- Easy domain setup

**3. GitHub Pages**
- Free hosting
- Simple setup
- No backend support

### Backend (Choose One)

**1. Heroku**
```bash
cd backend
heroku create dean-by-dzyne-api
git push heroku main
```

**2. Render**
- Simple Node.js deployment
- Free tier available
- Auto-deploys from Git

**3. DigitalOcean**
- Full control with VPS
- $4-6/month starter plan
- Best for production

**4. Railway**
- Easy deployment
- Good free tier
- Pay-as-you-go pricing

---

## API Endpoints

### Public Endpoints

**POST /api/contact**
- Submit contact form
- Returns: success message + submission ID

**GET /api/health**
- Health check
- Returns: server status

### Admin Endpoints (Protected)

**GET /api/submissions**
- Get all contact submissions
- Returns: array of submissions

**GET /api/submissions/:id**
- Get single submission
- Returns: submission details

**PATCH /api/submissions/:id/read**
- Mark submission as read

**DELETE /api/submissions/:id**
- Delete submission

---

## Troubleshooting

### Backend won't start?

1. Check Node.js is installed:
   ```bash
   node --version
   npm --version
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Check port 5000 is available:
   ```bash
   netstat -ano | findstr :5000
   ```

### Form not submitting?

1. Check backend is running:
   ```
   http://localhost:5000/api/health
   ```

2. Check browser console for errors (F12)

3. Check CORS_ORIGIN in `.env` matches your frontend URL

### Emails not sending?

1. Check `.env` has correct email credentials
2. For Gmail, use 16-character app password
3. Check spam folder
4. Review server logs for errors

### Want to use database instead of JSON files?

Update `utils/submissionStorage.js` to use MongoDB or PostgreSQL:

```javascript
// Example MongoDB integration
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);
```

---

## Environment Variables

### Frontend

Add to root `.env` file:
```env
VUE_APP_API_URL=http://localhost:5000/api
```

### Backend

See `backend/.env.example` for all options:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## Support & Contact

- **Email**: hello@deanby-dzyne.com
- **GitHub**: [Your GitHub Profile]
- **Website**: [Your Website]

---

## License

MIT License - Feel free to use and modify!

---

## Changelog

### v1.0.0 (December 24, 2025)
- ✅ Initial release
- ✅ Frontend with 6 sections
- ✅ Backend API with email support
- ✅ Contact form with validation
- ✅ Portfolio showcase
- ✅ Responsive design

---

**Happy coding! 🚀**
