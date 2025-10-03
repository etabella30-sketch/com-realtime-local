@echo off
echo Stopping Hypercorn server...

echo.
echo === Checking current Python processes ===
tasklist /fi "imagename eq python.exe" /fo table 2>nul

echo.
echo === Method 1: Kill by window title ===
taskkill /f /fi "WINDOWTITLE eq Hypercorn Server" 2>nul

echo.
echo === Method 2: Kill Python processes with hypercorn in command line ===
for /f "tokens=2" %%i in ('wmic process where "commandline like '%%hypercorn%%' and name='python.exe'" get ProcessId /format:value ^| findstr "="') do (
    set "pid=%%i"
    if defined pid (
        echo Killing process ID: !pid!
        taskkill /f /pid !pid! 2>nul
    )
)

echo.
echo === Method 3: Kill by port (if using default ports) ===
REM Kill processes using common hypercorn ports
for /f "tokens=5" %%i in ('netstat -ano ^| findstr ":8000 "') do (
    echo Killing process using port 8000: %%i
    taskkill /f /pid %%i 2>nul
)

echo.
echo === Method 4: Force kill all Python processes (aggressive) ===
echo Killing ALL Python processes...
taskkill /f /im python.exe 2>nul
echo All Python processes terminated.

echo.
echo === Checking remaining Python processes ===
tasklist /fi "imagename eq python.exe" /fo table 2>nul
if %errorlevel% equ 0 (
    echo Python processes still running above.
) else (
    echo No Python processes found.
)

echo.
echo Stop operation completed.
pause