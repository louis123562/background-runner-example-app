var fs = require('fs');

// Dateipfad zur XML-Datei
var path = require('path');
var infoPlistPath = path.join(__dirname, '../info.plist');
var infoPlistIOSPath = path.join(__dirname, '../ios/App/App', 'info.plist');

// colors
var reset = "\x1b[0m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var yellow = "\x1b[33m";

function updateInfoPlist() {
  // Auslesen der info.plist
  fs.readFile(infoPlistPath, 'utf8', (err, data) => {

    if (err) {
      console.log(`${yellow}The info plist file could not be read (only for IOS important): ${err}${reset}`);
      return;
    }

    // Überschreibe die info.plist in dem ios Ordner
    fs.writeFile(infoPlistIOSPath, data, (writeErr) => {

      if (writeErr) {
        console.log(`Error saving the updated info.plist file: ${red}${writeErr}${reset}`);
        return;
      }

      console.log(`The "${green}info.plist${reset}" is updated successfully`);
    });

  });
}

module.exports.updateInfoPlist = updateInfoPlist;
