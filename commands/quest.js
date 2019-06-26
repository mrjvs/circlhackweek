const questUtils = require('../questUtils.js');

module.exports = {
    name: "quest",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        // check for sub command ($quest submit)
        // check if quest completed.
        if (args[0] === "") {}
    }
}

