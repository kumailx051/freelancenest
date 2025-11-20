from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)
CORS(app)

# Gmail configuration
GMAIL_EMAIL = "freelancenest1@gmail.com"
GMAIL_PASSWORD = "kltypjeycxfdwvfy"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# In-memory storage for OTPs (in production, use Redis or database)
otp_storage = {}

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def create_email_template(user_name, otp_code):
    """Create a beautiful HTML email template"""
    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - FreelanceNest</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF6B00 0%, #FF9F45 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                    Freelance<span style="color: #FFE4CC;">Nest</span>
                </h1>
                <p style="color: #FFE4CC; margin: 10px 0 0 0; font-size: 16px;">Your gateway to freelancing success</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #2E2E2E; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                    Welcome to FreelanceNest, {user_name}! 🎉
                </h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                    Thank you for joining our community of talented freelancers and innovative clients. To complete your account setup and ensure the security of your account, please verify your email address.
                </p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <p style="color: #2E2E2E; font-size: 16px; margin: 0 0 15px 0; font-weight: 500;">
                        Your verification code is:
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="display: inline-block; background: linear-gradient(135deg, #FF6B00 0%, #FF9F45 100%); padding: 20px 40px; border-radius: 12px; margin: 20px 0;">
                        <span style="color: white; font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                            {otp_code}
                        </span>
                    </div>
                    
                    <p style="color: #999; font-size: 14px; margin: 15px 0 0 0;">
                        This code will expire in 10 minutes
                    </p>
                </div>
                
                <div style="background-color: #f8f9fa; border-left: 4px solid #FF6B00; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <p style="color: #2E2E2E; font-size: 14px; margin: 0; font-weight: 500;">
                        🔒 Security Tip: Never share this code with anyone. FreelanceNest will never ask for your verification code via phone or email.
                    </p>
                </div>
                
                <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 25px 0;">
                    If you didn't create an account with FreelanceNest, please ignore this email. The verification code will expire automatically.
                </p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <p style="color: #666; font-size: 14px; margin: 0;">
                        Need help? Contact our support team at 
                        <a href="mailto:support@freelancenest.com" style="color: #FF6B00; text-decoration: none;">support@freelancenest.com</a>
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2E2E2E; padding: 30px 20px; text-align: center;">
                <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                    © 2025 FreelanceNest. All rights reserved.
                </p>
                <p style="color: #666; font-size: 12px; margin: 0;">
                    This email was sent to verify your account. If you have any questions, please contact our support team.
                </p>
                
                <div style="margin-top: 20px;">
                    <a href="#" style="color: #FF6B00; text-decoration: none; margin: 0 10px; font-size: 12px;">Privacy Policy</a> |
                    <a href="#" style="color: #FF6B00; text-decoration: none; margin: 0 10px; font-size: 12px;">Terms of Service</a> |
                    <a href="#" style="color: #FF6B00; text-decoration: none; margin: 0 10px; font-size: 12px;">Unsubscribe</a>
                </div>
            </div>
        </div>
        
        <!-- Footer spacer -->
        <div style="height: 40px;"></div>
    </body>
    </html>
    """
    return html_template

def send_email(to_email, subject, html_content):
    """Send email using Gmail SMTP"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = GMAIL_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Create HTML part
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Connect to Gmail SMTP server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(GMAIL_EMAIL, to_email, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    """Send OTP to user's email"""
    try:
        data = request.json
        email = data.get('email')
        user_name = data.get('user_name', 'User')
        
        if not email:
            return jsonify({'success': False, 'message': 'Email is required'}), 400
        
        # Generate OTP
        otp_code = generate_otp()
        
        # Store OTP with expiration time (10 minutes)
        expiration_time = datetime.now() + timedelta(minutes=10)
        otp_storage[email] = {
            'otp': otp_code,
            'expires_at': expiration_time.isoformat(),
            'attempts': 0
        }
        
        # Create email content
        subject = "Verify Your Email - FreelanceNest Account"
        html_content = create_email_template(user_name, otp_code)
        
        # Send email
        if send_email(email, subject, html_content):
            return jsonify({
                'success': True, 
                'message': 'OTP sent successfully to your email',
                'expires_in': 600  # 10 minutes in seconds
            })
        else:
            return jsonify({'success': False, 'message': 'Failed to send email'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP code"""
    try:
        data = request.json
        email = data.get('email')
        otp_code = data.get('otp')
        
        if not email or not otp_code:
            return jsonify({'success': False, 'message': 'Email and OTP are required'}), 400
        
        # Check if OTP exists for this email
        if email not in otp_storage:
            return jsonify({'success': False, 'message': 'No OTP found for this email'}), 400
        
        stored_data = otp_storage[email]
        
        # Check if OTP has expired
        expiration_time = datetime.fromisoformat(stored_data['expires_at'])
        if datetime.now() > expiration_time:
            del otp_storage[email]
            return jsonify({'success': False, 'message': 'OTP has expired'}), 400
        
        # Check attempt limit (max 5 attempts)
        if stored_data['attempts'] >= 5:
            del otp_storage[email]
            return jsonify({'success': False, 'message': 'Too many failed attempts. Please request a new OTP'}), 400
        
        # Verify OTP
        if stored_data['otp'] == otp_code:
            # OTP is correct, remove from storage
            del otp_storage[email]
            return jsonify({
                'success': True, 
                'message': 'Email verified successfully!'
            })
        else:
            # Increment attempt count
            stored_data['attempts'] += 1
            return jsonify({
                'success': False, 
                'message': f'Invalid OTP. {5 - stored_data["attempts"]} attempts remaining'
            }), 400
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500

@app.route('/api/resend-otp', methods=['POST'])
def resend_otp():
    """Resend OTP to user's email"""
    try:
        data = request.json
        email = data.get('email')
        user_name = data.get('user_name', 'User')
        
        if not email:
            return jsonify({'success': False, 'message': 'Email is required'}), 400
        
        # Check if there's an existing OTP (optional rate limiting)
        if email in otp_storage:
            stored_data = otp_storage[email]
            expiration_time = datetime.fromisoformat(stored_data['expires_at'])
            # If OTP was sent less than 1 minute ago, don't allow resend
            if datetime.now() < expiration_time - timedelta(minutes=9):
                return jsonify({
                    'success': False, 
                    'message': 'Please wait before requesting a new OTP'
                }), 429
        
        # Generate new OTP
        otp_code = generate_otp()
        
        # Store OTP with expiration time
        expiration_time = datetime.now() + timedelta(minutes=10)
        otp_storage[email] = {
            'otp': otp_code,
            'expires_at': expiration_time.isoformat(),
            'attempts': 0
        }
        
        # Create email content
        subject = "New Verification Code - FreelanceNest"
        html_content = create_email_template(user_name, otp_code)
        
        # Send email
        if send_email(email, subject, html_content):
            return jsonify({
                'success': True, 
                'message': 'New OTP sent successfully to your email',
                'expires_in': 600
            })
        else:
            return jsonify({'success': False, 'message': 'Failed to send email'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    print("🚀 FreelanceNest OTP API Server starting...")
    print(f"📧 Gmail account: {GMAIL_EMAIL}")
    print("🔧 CORS enabled for all origins")
    print("💾 Using in-memory storage (use Redis for production)")
    print("\n📋 Available endpoints:")
    print("  POST /api/send-otp - Send OTP to email")
    print("  POST /api/verify-otp - Verify OTP code")
    print("  POST /api/resend-otp - Resend OTP")
    print("  GET /api/health - Health check")
    print("\n🌐 Server running on: http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
