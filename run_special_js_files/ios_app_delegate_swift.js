const fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../ios/App/App', 'AppDelegate.swift');

// colors
var reset = "\x1b[0m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var yellow = "\x1b[33m";
var blue = "\x1b[34m";

function updateAppDelegateSwift() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`${yellow}AppDelegate could not be read (only for IOS important): ${err}${reset}`);
      return;
    }
    // Überprüfe, ob der Import und die Background-Plugin-Aufrufe bereits vorhanden sind
    const importStatement = 'import CapacitorBackgroundRunner';
    const backgroundPluginCall = 'BackgroundRunnerPlugin.registerBackgroundTask()';
    const backgroundPluginHandleCall = 'BackgroundRunnerPlugin.handleApplicationDidFinishLaunching(launchOptions: launchOptions)';
    if (!data.includes(importStatement) || !data.includes(backgroundPluginCall) || !data.includes(backgroundPluginHandleCall)) {
      // Füge den Import hinzu, wenn er fehlt
      if (!data.includes(importStatement)) {
        data = importStatement + '\n' + data;
      }

      // Finde den Index des Kommentars
      const commentIndex = data.indexOf('return true;');
      if (commentIndex !== -1) {
        // Neuer Code, der eingefügt werden soll
        const newCode = `BackgroundRunnerPlugin.registerBackgroundTask()
        BackgroundRunnerPlugin.handleApplicationDidFinishLaunching(launchOptions: launchOptions)
        `;
        // Ersetze den Inhalt der Funktion mit dem neuen Code
        data = data.substring(0, commentIndex) + newCode + data.substring(commentIndex);
        // Schreibe die aktualisierten Daten zurück in die Datei
        fs.writeFile(filePath, data, 'utf8', (writeErr) => {
          if (writeErr) {
            console.log(`Error saving the updated AppDelegate.swift file: ${red}${writeErr}${reset}`);
            return;
          }
          console.log(`The "${green}AppDelegate.swift${reset}" is updated successfully`);
        });
      } else {
        console.log(`${yellow}The Comment could not be found: ${err}${reset}`);
      }
    } else {
      console.log(`${blue}The file has already been updated${reset}`);
    }
  });
}

module.exports.updateAppDelegateSwift = updateAppDelegateSwift;
