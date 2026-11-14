# Backend Setup Guide - Dean by D'Zyne

## Overview

The backend service handles contact form submissions, sends emails, and stores submissions for later retrieval.

### Features
- ✅ Express.js REST API
- ✅ Contact form validation
- ✅ Email notifications (using Nodemailer)
- ✅ JSON-based submission storage
- ✅ CORS support
- ✅ Error handling

---

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Email Service** (Gmail or other SMTP service)

---

## Installation

### 1. Navigate to Backend Directory
```bash
cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE\backend"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=hello@deanby-dzyne.com
EMAIL_TO=your-email@gmail.com
```

---

## Email Configuration

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** in your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this password to `EMAIL_PASSWORD` in `.env`

3. **Update .env**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Option 2: Other Email Services

For services like Outlook, SendGrid, etc., update the `.env`:

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Option 3: Disable Email (Development)

Leave email credentials blank to test without sending actual emails:

```env
EMAIL_USER=
EMAIL_PASSWORD=
```

Form submissions will still be saved and logged to console.

---

## Running the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Dean by D'Zyne Backend API           ║
║  Server running on port 5000           ║
║  Environment: development              ║
║  CORS Origin: http://localhost:3000    ║
╚════════════════════════════════════════╝
```

---

## API Endpoints

### POST /api/contact
Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Website Inquiry",
  "message": "I'm interested in your web development services..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been received.",
  "submissionId": "1703123456789",
  "emailSent": true
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Name must be between 2 and 100 characters",
      "param": "name"
    }
  ]
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "success": true,
  "message": "Backend service is running",
  "timestamp": "2025-12-24T10:30:00.000Z"
}
```

### GET /api/submissions
Get all contact form submissions

**Response:**
```json
{
  "success": true,
  "count": 5,
  "submissions": [
    {
      "id": "1703123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Website Inquiry",
      "message": "...",
      "timestamp": "2025-12-24T10:30:00.000Z",
      "read": false
    }
  ]
}
```

### GET /api/submissions/:id
Get a single submission by ID

### PATCH /api/submissions/:id/read
Mark a submission as read

### DELETE /api/submissions/:id
Delete a submission

---

## File Structure

```
backend/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── .env                     # Actual environment variables (create this)
├── routes/
│   └── api.js              # API endpoint definitions
├── middleware/
│   └── validation.js        # Form validation middleware
├── utils/
│   ├── emailService.js      # Email sending logic
│   └── submissionStorage.js # JSON file storage
└── data/
    └── submissions.json     # Stored submissions (created automatically)
```

---

## Frontend Integration

The frontend sends form submissions to the backend:

```javascript
fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

To change the API URL, update in `js/app.js`:
```javascript
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';
```

Or set environment variable:
```bash
set VUE_APP_API_URL=http://your-backend-url.com/api
```

---

## Deployment

### Deploy to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**:
   ```bash
   cd backend
   heroku create dean-by-dzyne-api
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set CORS_ORIGIN=https://your-domain.com
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Deploy to Other Platforms

- **Vercel**: Good for serverless functions
- **Render**: Easy Node.js deployment
- **DigitalOcean**: Full control with VPS
- **AWS EC2/Lambda**: Scalable solutions

---

## Troubleshooting

### Email not sending?

1. Check email credentials in `.env`
2. Enable "Less secure app access" if using Gmail
3. Check spam folder for test emails
4. Check server logs for errors:
   ```bash
   npm run dev
   ```

### CORS errors?

Update `CORS_ORIGIN` in `.env` to match your frontend URL:
```env
CORS_ORIGIN=http://localhost:3000
```

### Port already in use?

Change the port in `.env`:
```env
PORT=5001
```

### Submissions not saving?

Check directory permissions and ensure `data/` folder can be created.

---

## Security Notes

⚠️ **For Production:**

1. **Add Authentication**:
   - Require API key for submissions endpoint
   - Add JWT authentication for admin endpoints

2. **Rate Limiting**:
   - Install `express-rate-limit`
   - Prevent spam submissions

3. **Input Sanitization**:
   - Already using express-validator
   - Consider additional HTML sanitization

4. **HTTPS**:
   - Always use HTTPS in production
   - Get SSL certificate from Let's Encrypt

5. **Environment Variables**:
   - Never commit `.env` to git
   - Use `.env.example` as template

6. **Database**:
   - Current solution uses JSON files
   - For production, use MongoDB or PostgreSQL

---

## Support

For issues or questions, contact: hello@deanby-dzyne.com

Version: 1.0.0
Last Updated: December 24, 2025
