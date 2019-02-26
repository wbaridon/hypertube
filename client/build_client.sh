#!/bin/zsh
npm install
npm run build
rm -rf ../api/distribution
cp -rf ./distribution ../api/