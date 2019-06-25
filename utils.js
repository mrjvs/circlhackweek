const constants = require("./constants.js");
const db = require("./db.js");
const Path = require('path');

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

function explorePath(array, pathParts) {
    // root, doesnt have a dir object
    if (pathParts.length === 0) {
        return {
            type: "dir",
            contents: array
        };
    }

    // filter array by correct name
    const filteredFiles = array.filter(val => (val.name === pathParts[0]) && !(val.type === "file" && pathParts.length > 1));

    if (filteredFiles.length === 0) {
        // no files/dirs with name, invalid path
        return false;
    } else if (filteredFiles[0].type === "file") {
        return filteredFiles[0];
    } else if (filteredFiles[0].type === "dir") {
        if (pathParts.length === 1) {
            // dir is final in file tree
            return filteredFiles[0];
        }
        return explorePath(filteredFiles[0].contents, pathParts.slice(1));
    } else {
        return false; // what?
    }
}

function filterPath(pathParts) {
    return pathParts.filter(val => val !== "");
}

function splitPath(path) {
    return filterPath(path.split(Path.sep));
}

async function isSignedUp(userId) {
    const foundUsers = await db.userModel.find({userId});
    return foundUsers.length === 1;
}

module.exports = {
    sendError,
    sendInfo,
    explorePath,
    filterPath,
    isSignedUp,
    splitPath
}