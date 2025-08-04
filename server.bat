@echo off
echo Starting servers...

start "" /b cmd /c "node server.js"


echo Both servers started:
echo - Node.js proxy: http://localhost:3001
echo - Python HTTP server: http://localhost:8000
echo Press Ctrl+C to stop both.
pause >nul
