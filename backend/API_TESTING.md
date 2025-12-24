# API Testing Guide

Test the Dean by D'Zyne backend API using these methods.

---

## Quick Start

1. **Start the backend**:
   ```bash
   cd backend
   npm start
   # Server running on http://localhost:5000
   ```

2. **Test health check**:
   ```
   http://localhost:5000/api/health
   ```

3. **View submissions**:
   ```
   http://localhost:5000/api/submissions
   ```

4. **Admin Dashboard**:
   ```
   Open: backend/admin-dashboard.html in your browser
   ```

---

## Testing Methods

### Method 1: Browser (Easiest)

Open these URLs directly in your browser:

**Health Check:**
```
http://localhost:5000/api/health
```

**View All Submissions:**
```
http://localhost:5000/api/submissions
```

**View Single Submission:**
```
http://localhost:5000/api/submissions/[submission-id]
```

---

### Method 2: cURL (Command Line)

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Get All Submissions
```bash
curl http://localhost:5000/api/submissions
```

#### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message from cURL"
  }'
```

#### Mark as Read
```bash
curl -X PATCH http://localhost:5000/api/submissions/[submission-id]/read
```

#### Delete Submission
```bash
curl -X DELETE http://localhost:5000/api/submissions/[submission-id]
```

---

### Method 3: Postman (GUI)

1. **Download**: https://www.postman.com/downloads/
2. **Create Collection**: "Dean by D'Zyne API"
3. **Add Requests**:

#### POST - Contact Form
- **URL**: `http://localhost:5000/api/contact`
- **Method**: POST
- **Headers**: Content-Type: application/json
- **Body** (JSON):
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Website Inquiry",
  "message": "I would like to inquire about your web development services."
}
```

#### GET - All Submissions
- **URL**: `http://localhost:5000/api/submissions`
- **Method**: GET

#### GET - Health
- **URL**: `http://localhost:5000/api/health`
- **Method**: GET

---

### Method 4: Visual Studio Code REST Client

Install: [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Create a file `test.http` in the backend folder:

```http
### Health Check
GET http://localhost:5000/api/health

### Get All Submissions
GET http://localhost:5000/api/submissions

### Submit Contact Form
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Subject",
  "message": "This is a test message to verify the backend is working correctly."
}

### Mark as Read
PATCH http://localhost:5000/api/submissions/[submission-id]/read

### Delete Submission
DELETE http://localhost:5000/api/submissions/[submission-id]
```

Then click "Send Request" above each request.

---

### Method 5: JavaScript Fetch

Test in browser console (F12):

```javascript
// Health Check
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log(d));

// Get Submissions
fetch('http://localhost:5000/api/submissions')
  .then(r => r.json())
  .then(d => console.log(d));

// Submit Form
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Your Name',
    email: 'your@email.com',
    subject: 'Test',
    message: 'Test message'
  })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## Response Examples

### Successful Form Submission
```json
{
  "success": true,
  "message": "Thank you! Your message has been received. We'll get back to you soon.",
  "submissionId": "1703123456789",
  "emailSent": true
}
```

### Validation Error
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

### Get Submissions
```json
{
  "success": true,
  "count": 2,
  "submissions": [
    {
      "id": "1703123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Website Inquiry",
      "message": "I'm interested in your services",
      "timestamp": "2025-12-24T10:30:00.000Z",
      "read": false
    }
  ]
}
```

---

## Test Cases

### ✅ Valid Submission
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "I'm interested in your services",
  "message": "Can you tell me more about web development?"
}
```

### ❌ Invalid Name (too short)
```json
{
  "name": "J",
  "email": "john@example.com",
  "subject": "Subject",
  "message": "Message content"
}
```

### ❌ Invalid Email
```json
{
  "name": "John Doe",
  "email": "invalid-email",
  "subject": "Subject",
  "message": "Message"
}
```

### ❌ Invalid Subject (too short)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hi",
  "message": "Message with more content"
}
```

### ❌ Missing Fields
```json
{
  "name": "John Doe"
}
```

---

## Viewing Submissions

### Via Browser
Open: `http://localhost:5000/api/submissions`

### Via Admin Dashboard
Open: `backend/admin-dashboard.html` in your browser
- View all submissions
- Search by name/email
- Mark as read
- Delete submissions
- Export to CSV

---

## Email Testing

### If Emails Are Working:
1. Submit a form
2. Check your email inbox
3. You should receive 2 emails:
   - Business email: Notification of new submission
   - User email: Confirmation message

### If Emails Aren't Working:
1. Check `.env` file has correct credentials
2. Check backend console for email errors
3. Check spam/junk folder
4. For Gmail: use 16-character app password, not regular password

---

## Debugging

### Check Backend Logs
Look at the console output when you run `npm start`:
```
POST /api/contact - 200 OK
✅ Emails sent successfully for submission from John Doe
✅ Submission saved: John Doe
```

### Check Stored Submissions
File: `backend/data/submissions.json`

View the JSON file to see all stored submissions.

### Test Database Connection
Check if `data/` folder and `submissions.json` file are created when you submit a form.

---

## Common Issues

### "Connection refused" on localhost:5000
- Backend is not running
- Solution: Run `npm start` in backend folder

### CORS Error in Console
- Backend and frontend URLs don't match
- Solution: Update `CORS_ORIGIN` in `.env` to match your frontend URL

### 404 on /api/contact
- Wrong endpoint URL
- Solution: Use correct URL: `http://localhost:5000/api/contact`

### Form validation error
- Check field requirements:
  - Name: 2-100 characters, letters only
  - Email: valid email format
  - Subject: 5-200 characters
  - Message: 10-5000 characters

---

## Performance Testing

### Load Testing with Apache Bench
```bash
# Test 100 requests with 10 concurrent
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Load Testing with k6
```bash
npm install -g k6
k6 run load-test.js
```

---

## Deployment Testing

Once deployed, test with actual URL:

```bash
curl https://your-api.herokuapp.com/api/health
```

Update frontend `js/app.js`:
```javascript
const apiUrl = 'https://your-api.herokuapp.com/api';
```

---

## Security Notes

- ⚠️ No authentication on endpoints (add before production)
- ⚠️ No rate limiting (add with express-rate-limit)
- ⚠️ No HTTPS in development (use HTTPS in production)
- ✅ Form validation is implemented
- ✅ Input sanitization is implemented

---

For more help, check `BACKEND_SETUP.md`
