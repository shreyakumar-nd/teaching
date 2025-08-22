#!/bin/bash 
echo "Attempting to push changes.."
echo "Trying git add ."
git add .
echo "Trying git status"
git status
echo "Trying to commit changes"
git commit -m "changed small"
echo "Trying to push changes"
git push origin main 
echo "Done attempting to push"
echo "------------------------"    
