const constants = require("../constants.js");

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

module.exports = {
    sendError,
    sendInfo,
    sendSuccess
}