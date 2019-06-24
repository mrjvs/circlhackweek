const constants = require("./constants.js");

function sendError(errorText) {
    return {
        embed: {
            color: constants.embed_colors.error,
            title: "Encountered an error!",
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

module.exports = {
    sendError,
    sendInfo
}