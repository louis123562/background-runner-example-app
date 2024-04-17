var fs = require('fs');
var xml2js = require('xml2js');

// Dateipfad zur XML-Datei
var path = require('path');
var xmlFilePath = path.join(__dirname, '../ios/App/App', 'config.xml');

// colors
var reset = "\x1b[0m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var blue = "\x1b[34m";
var yellow = "\x1b[33m";

// variablen
var removeParam = "onload";
var removeParamFeature = "LottieSplashScreen";

function updateConfigXML() {
  // Funktion zum Lesen und Verarbeiten der XML-Datei
  fs.readFile(xmlFilePath, 'utf8', (err, data) => {

    if (err) {
      console.log(`${yellow}The XML file could not be read (only for IOS important): ${err}${reset}`);
      return;
    }

    // XML in JavaScript-Objekt konvertieren
    xml2js.parseString(data, (parseErr, result) => {

      if (parseErr) {
        console.log(`Error parsing the XML: ${red}${parseErr}${reset}`);
        return;
      }

      // Funktion zum Durchlaufen aller Elemente und Entfernen des gewünschten params
      function removeOnloadParam(node) {

        if (node.feature) {

          node.feature.forEach(feature => {
            if (feature.$.name === removeParamFeature && feature.param) {
              feature.param = feature.param.filter(param => !(param.$.name === removeParam));
            }

            removeOnloadParam(feature);
          });
        }

        if (node.widget) {
          node.widget.forEach(widget => removeOnloadParam(widget));
        }
      }

      // Das oberste Widget-Element ist das Wurzelelement
      removeOnloadParam(result.widget);

      // JavaScript-Objekt zurück in XML konvertieren
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(result);

      // XML in die Datei schreiben und speichern
      fs.writeFile(xmlFilePath, xml, (writeErr) => {

        if (writeErr) {
          console.log(`Error saving the updated XML file: ${red}${writeErr}${reset}`);
          return;
        }

        console.log(`The param "${green}${removeParam}${reset}" from the feature "${blue}${removeParamFeature}${reset}" has been removed`);
      });
    });
  });
}

module.exports.updateConfigXML = updateConfigXML;
