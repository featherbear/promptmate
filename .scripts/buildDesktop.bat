@echo off

set BASE_DIR=.neutralino
set BUILD_DIR=%BASE_DIR%\app

call npm run build

rmdir /s /q %BUILD_DIR% > nul 2>&1
mkdir %BUILD_DIR% > nul

xcopy public %BUILD_DIR% /E /H /C /I > nul
copy %BASE_DIR%\settings.json %BUILD_DIR% > nul

pushd %BASE_DIR%
call npx neu release
popd