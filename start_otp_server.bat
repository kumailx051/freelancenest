@echo off
echo.
echo ========================================
echo   FreelanceNest OTP API Server
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.7+ and try again
    pause
    exit /b 1
)

echo Installing Python dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo.
    echo Error: Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo Starting OTP API server...
echo The server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python otp_api.py

pause
