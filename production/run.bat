@echo off

set LOGFILE=%~dp0log.txt
echo Starting batch process... > "%LOGFILE%"
@REM :: Check if Node.js version 20 is installed
@REM node -v | find "v20." > nul
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Installing Node.js version 20...
@REM     :: Add the command to install Node.js version 20 here. This placeholder might need replacing with a specific installer command.
@REM     curl -o node-v20-setup.exe https://nodejs.org/dist/latest-v20.x/node-v20.x.x-x64.msi
@REM     start /wait node-v20-setup.exe
@REM ) ELSE (
@REM     echo Node.js version 20 is already installed.
@REM )





:: -----------------------------------------------
:: 1) CHECK FOR PYTHON INSTALLATION
:: -----------------------------------------------
echo Checking for Python... >> "%LOGFILE%"
where python.exe >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python not found. Downloading installer... >> "%LOGFILE%"
    curl -L -o "%~dp0python-installer.exe" ^
        https://www.python.org/ftp/python/3.12.0/python-3.12.0-amd64.exe
    echo Installing Python silently... >> "%LOGFILE%"
    start /wait "" "%~dp0python-installer.exe" ^
        /quiet InstallAllUsers=1 PrependPath=1 Include_pip=1
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Python installation failed! >> "%LOGFILE%"
        goto end
    ) else (
        echo Python installed successfully. >> "%LOGFILE%"
    )
    del "%~dp0python-installer.exe"
) else (
    echo Python is already installed: >> "%LOGFILE%"
    python --version >> "%LOGFILE%"
)


:: -----------------------------------------------
::  INSTALL PYTHON LIBRARIES
:: -----------------------------------------------
echo Installing Python libraries... >> "%LOGFILE%"
python -m pip install --upgrade pip >> "%LOGFILE%" 2>&1
python -m pip install -r "%~dp0requirements.txt" >> "%LOGFILE%" 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Python libraries! >> "%LOGFILE%"
    goto end
) else (
    echo Python libraries installed. >> "%LOGFILE%"
)

:: Install project dependencies
echo Installing npm dependencies... > "%LOGFILE%"
call npm install --force


echo Checking for pm2 >> "%LOGFILE%"
call npm list -g pm2 > nul 2>&1

REM Check the error level of the last command
if %ERRORLEVEL% NEQ 0 (
    echo pm2 is not installed, installing... >> "%LOGFILE%"
    call npm install -g pm2
) else (
    echo pm2 is already installed. >> "%LOGFILE%"
)


echo deleting previous project >> "%LOGFILE%"
REM Install npm packages
call pm2 stop realtime.config.js
call pm2 delete realtime.config.js
if ERRORLEVEL 1 (
    echo Error delete pm2! >> "%LOGFILE%"
    goto end
) else (
    echo pm2 delete >> "%LOGFILE%"
)




echo starting project >> "%LOGFILE%"
REM Install npm packages
call pm2 start realtime.config.js --env production
if ERRORLEVEL 1 (
    echo Error start pm2! >> "%LOGFILE%"
    goto end
) else (
    echo pm2 started >> "%LOGFILE%"
)



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






powershell -ExecutionPolicy Bypass -Command "Start-Process python -ArgumentList '-m','hypercorn','--config','search/hypercorn_config.py','search/search:app' -WindowStyle Hidden -RedirectStandardOutput 'server.log' -RedirectStandardError 'error.log'"
echo Server started in background. Check server.log and error.log for output.


echo List >> "%LOGFILE%"
REM Install npm packages
call pm2 monit




echo Operations completed successfully. >> "%LOGFILE%"

:end




pause
