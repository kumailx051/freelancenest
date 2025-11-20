# FreelanceNest OTP Email Verification System

This system provides email verification using OTP (One-Time Password) sent via Gmail SMTP.

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- Gmail account with App Password enabled
- Node.js and npm (for the React frontend)

### 1. Start the OTP API Server

#### Option A: Using the provided scripts (Windows)
```bash
# For Command Prompt
start_otp_server.bat

# For PowerShell
.\start_otp_server.ps1
```

#### Option B: Manual setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the server
python otp_api.py
```

The API server will run on `http://localhost:5000`

### 2. Start the React Frontend
```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📧 Gmail Configuration

The system uses the following Gmail credentials:
- **Email**: freelancenest1@gmail.com
- **App Password**: kltypjeycxfdwvfy

### How to Generate Gmail App Password (for your own Gmail):
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Replace the credentials in `otp_api.py`

## 🔗 API Endpoints

### POST /api/send-otp
Send OTP to user's email
```json
{
  "email": "user@example.com",
  "user_name": "John Doe"
}
```

### POST /api/verify-otp
Verify the OTP code
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### POST /api/resend-otp
Resend OTP to user's email
```json
{
  "email": "user@example.com",
  "user_name": "John Doe"
}
```

### GET /api/health
Health check endpoint

## 🎨 Email Template Features

- **Beautiful HTML Design**: Professional gradient design matching FreelanceNest branding
- **Responsive Layout**: Works on desktop and mobile email clients
- **Security Tips**: Includes security warnings and best practices
- **Brand Consistency**: Uses FreelanceNest colors and typography
- **Clear CTA**: Prominent OTP display with expiration timer

## 🔒 Security Features

- **OTP Expiration**: Codes expire after 10 minutes
- **Attempt Limiting**: Maximum 5 verification attempts per OTP
- **Rate Limiting**: Prevents spam by limiting resend requests
- **Secure Storage**: OTPs are stored temporarily in memory (use Redis for production)

## 📱 Frontend Integration

The React frontend includes:
- **OTP Input Component**: 6-digit code input with auto-focus
- **Real-time Timer**: Shows remaining time for OTP validity
- **Error Handling**: User-friendly error messages
- **Resend Functionality**: Easy resend with cooldown timer
- **Beautiful UI**: Consistent with FreelanceNest design system

## 🛠️ Development Notes

### File Structure
```
├── otp_api.py                 # Python Flask API server
├── requirements.txt           # Python dependencies
├── start_otp_server.bat      # Windows batch script
├── start_otp_server.ps1      # PowerShell script
├── src/
│   ├── pages/
│   │   ├── SignupPage.tsx    # Updated with OTP integration
│   │   └── onboarding/
│   │       └── steps/
│   │           └── OTPVerificationStep.tsx  # OTP verification UI
│   └── lib/
│       ├── firebase.ts       # Firebase configuration
│       ├── authService.ts    # Firebase auth service
│       └── firestoreService.ts # Firestore database service
```

### Environment Variables (for production)
```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

### CORS Configuration
The API is configured to accept requests from all origins during development. For production, update the CORS settings to only allow your frontend domain.

## 🚀 Production Deployment

For production deployment:

1. **Use Redis**: Replace in-memory OTP storage with Redis
2. **Environment Variables**: Use environment variables for credentials
3. **HTTPS**: Ensure API runs on HTTPS
4. **Rate Limiting**: Implement proper rate limiting middleware
5. **Logging**: Add comprehensive logging for monitoring
6. **Database**: Store user verification status in your database

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to send email"**
   - Check Gmail credentials
   - Ensure App Password is correctly set
   - Verify internet connection

2. **"Network error"**
   - Ensure OTP API server is running on port 5000
   - Check if port 5000 is available
   - Verify API endpoint URLs in frontend

3. **"OTP has expired"**
   - OTPs expire after 10 minutes
   - Use the resend functionality to get a new code

4. **Email not received**
   - Check spam/junk folder
   - Verify email address is correct
   - Try resending the OTP

## 📞 Support

For issues or questions:
- Check the browser console for detailed error messages
- Verify all services are running
- Check network connectivity
- Review the API server logs

## 🎯 Testing the System

1. Start both servers (API and React)
2. Go to `http://localhost:5173/signup`
3. Fill out the signup form
4. Check the provided Gmail account for the OTP email
5. Enter the OTP on the verification screen
6. Verify successful authentication

The system is now ready for use! 🎉
