const fs = require('fs');
const path = require('path');

const BASE_PATH = "C:\\Projects\\tmswebreact\\src";
const REPLACE_FROM = ".jsx";
const REPLACE_TO = ".js";
const RECURSIVELY = true;

function getAllFilesSubDirectory(_path) {
    const files = [];

    function getFiles(base) {
        const dirs = fs.readdirSync(base);

        dirs.forEach(item => {
            const currentPath = path.resolve(base, item);

            const directory = isDirectory(currentPath);

            if (directory && RECURSIVELY)
                getFiles(currentPath);
            else
                files.push(currentPath);
        });
    }
    getFiles(_path);
    return files;
}

function isJsxFile(path) {
    return path.endsWith('.jsx');
}

function replaceJsxToJs(path) {
    fs.renameSync(path, path.replace(REPLACE_FROM, REPLACE_TO));
    console.log(`Replaced file ${path}`);
}

function isDirectory(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

const files = getAllFilesSubDirectory(basePath);

files.forEach(item => isJsxFile(item) ? replaceJsxToJs(item) : null);