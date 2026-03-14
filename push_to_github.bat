@echo off
set /p msg="Enter commit message: "
if "%msg%"=="" set msg="Update publications and links"

echo Adding changes...
git add .

echo Committing changes with message: %msg%
git commit -m "%msg%"

echo Pushing to GitHub...
git push

npm run deploy
echo Done!
pause
