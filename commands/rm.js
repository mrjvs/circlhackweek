const db = require("../db.js");
const utils = require("../utils.js");
const constants = require("../constants.js");
const quests = require('../quests.js');
const randomString = require("randomstring");

module.exports = {
    name: "rm",
    aliases: ["remove"],
    dmOnly: true,
    signUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        // no
    }
}