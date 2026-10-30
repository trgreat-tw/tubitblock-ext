@echo off
setlocal
call "C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\VC\Auxiliary\Build\vcvars64.bat" >nul
if errorlevel 1 exit /b 1
pushd "%~dp0"
if not exist .build mkdir .build
cl /nologo /EHsc /W4 /WX /I fake_arduino /I ..\lib\TuKitHeartbeat\src /I ..\..\kitTemperature\lib\TuKitTemperature\src analog_test.cpp /Fo.build\analog_test.obj /Fe.build\analog_test.exe
if errorlevel 1 exit /b 1
.build\analog_test.exe
set result=%errorlevel%
popd
exit /b %result%
