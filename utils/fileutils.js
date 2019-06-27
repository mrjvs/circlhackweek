const Path = require('path');
const _ = require('lodash');
const scripts = require("../scripts.js");

function explorePath(array, pathParts, parentPath) {
    // root, doesnt have a dir object
    if (pathParts.length === 0) {
        return {
            type: "dir",
            contents: array,
            path: parentPath
        };
    }

    // filter array by correct name
    const filteredFiles = array.filter(val => (val.name === pathParts[0]) && !(val.type === "file" && pathParts.length > 1));

    if (filteredFiles.length === 0) {
        // no files/dirs with name, invalid path
        return false;
    } else if (filteredFiles[0].type === "file") {
        let index = array.indexOf(filteredFiles[0]);
        filteredFiles[0].path = parentPath + "." + index;
        return filteredFiles[0];
    } else if (filteredFiles[0].type === "dir") {
        let index = array.indexOf(filteredFiles[0]);
        if (pathParts.length === 1) {
            // dir is final in file tree
            filteredFiles[0].path = parentPath + "." + index;
            return filteredFiles[0];
        }
        return explorePath(filteredFiles[0].contents, pathParts.slice(1), parentPath + "." + index + ".contents");
    } else {
        return false; // what?
    }
}

function hasFileContent(content, obj) {
    for (let i in obj) {
        if (obj[i].type === "file" && obj[i].contents === content) {
            // found file with content
            return true;
        } else if (obj[i].type === "dir") {
            if (hasFileContent(content, obj[i].contents)) return true;
        }
    }
    // no file found
    return false;
}

function parseShortenedFileSystem(fileSysTemplate) {
    let structure = {};
    for (let key in fileSysTemplate) {
        let pathParts = filterPath(key.split("/"));
        if (_.get(structure, pathParts) && !fileSysTemplate[key]) continue;
        _.set(structure, pathParts, fileSysTemplate[key]);
    }
    return convertTreeToFs(structure);
}

function convertTreeToFs(obj) {
    let finalSys = [];

    for (let key in obj) {
        if (!obj[key]) {
            // empty dir
            finalSys.push(createFileSysObject(key, []));
        } else if (typeof obj[key] === "string") {
            // file
            finalSys.push(createFileSysObject(key, obj[key]))
        } else {
            // dir with contents
            let newContents = [];
            newContents = convertTreeToFs(obj[key]);
            finalSys.push(createFileSysObject(key, newContents));
        }
    }
    return finalSys;
}

function createFileSysObject(name, contents) {
    if (!contents || typeof contents === "object") {
        return {
            type: "dir",
            name,
            contents
        }
    } else {
        return {
            type: "file",
            name,
            contents
        }
    }
}

function filterPath(pathParts) {
    return pathParts.filter(val => val !== "");
}

function splitPath(path) {
    return filterPath(path.split(Path.sep));
}

function getFileExecutable(file) {
    const code = file.contents;
    const scriptCode = scripts.filter(val => val.code === code);
    if (scriptCode.length === 0) {
        return;
    }
    return scriptCode[0];
}

module.exports = {
    explorePath,
    filterPath,
    splitPath,
    getFileExecutable,
    parseShortenedFileSystem,
    createFileSysObject,
    convertTreeToFs,
    hasFileContent
}