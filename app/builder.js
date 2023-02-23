const JSZip = require('jszip');
const fs = require('fs');
const { name, version } = require('../package.json');

const _files = ['.env.prod', 'package.json', 'package-lock.json'];
const _src = 'src/';
const _buildDir = 'build/';

(async () => {

    // make a build directory
    if (!fs.existsSync(_buildDir))
        fs.mkdirSync(_buildDir);

    const buildName = `${_buildDir}${name}_${version}_build.zip`;

    if (fs.existsSync(buildName)) {
        console.log('🔁 Rebuilding...');
        fs.unlinkSync(buildName);
    }

    // time to zip
    const zip = new JSZip();
    
    // zip all mentioned files
    zipFiles(_files, zip);

    // zip the source/src folder
    zip.folder(_src);
    zipFolder(_src, zip.folder(_src))
    
    // zip all files
    const content = await zip.generateAsync( { type: "nodebuffer" } );
    fs.writeFileSync(buildName, content);

    console.log('✅ Build success!')
})();

function zipFiles(filePaths = [], zip) {
    for (const file of filePaths) {
        zip.file(file, fs.readFileSync(file))
    }
    return zip;
}

function zipFolder(folderPath, zip) {
    var files = fs.readdirSync(folderPath);
    files.forEach(function (file) {
        var filePath = folderPath + "/" + file;
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            zip.folder(file);
            zipFolder(filePath, zip.folder(file));
        } else if (stat.isFile()) {
            zip.file(file, fs.readFileSync(filePath));
        }
    });
}