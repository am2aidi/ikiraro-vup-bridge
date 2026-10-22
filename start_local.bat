@echo off
echo ======================================================================
echo Starting Isoko Bridge (Ikiraro cya VUP) Local Development Server
echo ======================================================================
echo App URL: http://localhost:8000/app/index.html
echo.
start http://localhost:8000/app/index.html
python -m http.server 8000
pause
