rm ./IRCCloud.dmg
rm -rf ./IRCCloud-darwin-x64
electron-packager ./ IRCCloud --platform=darwin --arch=x64 --overwrite --icon=./appicon.icns --prune
electron-installer-dmg ./IRCCloud-darwin-x64 IRCCloud --out=./ --overwrite
