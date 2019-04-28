const fs = require("fs-extra");

const updateBackgroundFile = buildPath => {
    const backgroundJS = `${buildPath}/background.js`;
    const backgroundJS_original = './src/background.js';
    const contentscriptJS = `${buildPath}/content-script.js`;
    const contentscriptJS_original = './src/content-script.js';
    const pdfscriptJS = `${buildPath}/pdf-button-script.js`;
    const pdfscriptJS_original = './src/pdf-button-script.js';


    let contentscriptContents = fs.readFileSync(contentscriptJS_original,"utf8");
    let backgroundContents = fs.readFileSync(backgroundJS_original, "utf8");
    let pdfscriptContents = fs.readFileSync(pdfscriptJS_original,"utf8");
    // Write back the corrected background script
    fs.writeFile(backgroundJS, backgroundContents, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("background.js updated.");
    });
    // Write back the corrected content-script
    fs.writeFile(contentscriptJS, contentscriptContents, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("content-script.js updated.");
    });
    fs.writeFile(pdfscriptJS, pdfscriptContents, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("pdf-button-script.js updated.");
    });

};

module.exports = {
    updateBackgroundFile: updateBackgroundFile
};

if (require.main === module) {
    const buildPath = "./build";
    updateBackgroundFile(buildPath);
}