// virtual executable files
module.exports = [
    {
        code: "RUN1", // TODO change to binary text
        name: "porthack",
        execute: (utils, message, args) => {
            return message.channel.send(utils.sendInfo("Running `porthack.exe`"));
        }
    },
    {
        code: "RUN2",
        name: "clock",
        execute: (utils, message, args) => {
            return message.channel.send(utils.sendInfo("Running the almighty `clock.exe`"));
        }
    }
];