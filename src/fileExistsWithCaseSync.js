var fs = require('fs');
var path = require('path');

// Based on https://stackoverflow.com/questions/27367261/check-if-file-exists-case-sensitive
export default function fileExistsWithCaseSync(filepath) {
    var dir = path.dirname(filepath);
    if (dir === '/' || dir === '.') return true;
    var filenames = fs.readdirSync(dir);
    return filenames.indexOf(path.basename(filepath)) !== -1;
}