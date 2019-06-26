const constants = require("./constants.js");
const db = require("./db.js");
const Path = require('path');
const _ = require('lodash');
const scripts = require("./scripts");
const stateMachine = require('./statemachine.js');
const randomString = require("randomstring");

function sendError(errorText) {
    return {
        embed: {
            color: constants.embed_colors.error,
            description: errorText
        }
    }
}

function sendInfo(infoText) {
    return {
        embed: {
            color: constants.embed_colors.info,
            description: infoText
        }
    }
}

function sendSuccess(successText) {
    return {
        embed: {
            color: constants.embed_colors.success,
            description: successText
        }
    }
}

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
            finalSys.push(createFileSysObject(key));
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

async function createQuestServer(questServer) {
    const ip = await db.serverSchema.statics.generateUniqueIp();
    return {
        ip,
        name: questServer.name,
        files: parseShortenedFileSystem(questServer.fileSystem),
        ports: questServer.ports,
        linked: questServer.linked ? questServer.linked : [], // <-- ip
        credentials: {
            user: questServer.user ? questServer.user : "root",
            pass: randomString.generate({
                length: 7,
                charset: "alphanumeric"
            })
        }
    }
}

function filterPath(pathParts) {
    return pathParts.filter(val => val !== "");
}

function splitPath(path) {
    return filterPath(path.split(Path.sep));
}

async function isSignedUp(userId) {
    const foundUsers = await db.userModel.find({ userId });
    return foundUsers.length === 1;
}

function hasAdminAccess(userId) {
    const serverIp = stateMachine.getState(userId, "connectedServer");
    if (!serverIp) return false;
    const loginState = stateMachine.getState(userId, "loginState");
    return loginState && loginState.serverIp === serverIp;
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
    sendError,
    sendInfo,
    sendSuccess,
    explorePath,
    filterPath,
    isSignedUp,
    splitPath,
    getFileExecutable,
    hasAdminAccess,
    parseShortenedFileSystem,
    createQuestServer,
    createFileSysObject,
    convertTreeToFs
}