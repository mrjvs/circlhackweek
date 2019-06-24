const stateMachine = require('../statemachine.js');

module.exports = async function (message, args) {
    let userId = message.author.username.replace("[^\w]", "") + message.author.discriminator.replace("0", "");
    let channel = await message.author.createDM();

    let password = randomString.generate({
        length: 7,
        charset: "alphanumeric"
    });
    // Display information about the user: username + password
    // Display information about what to do next
    channel.send({
        embed: {
            title: "Welcome to Circl!",
            description: "Put a description of Circl here.",
            url: "https://",
            color: 2953867, //change this colour please @jvs
            footer: {
                icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
                text: "Circl"
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            author: {
                name: "Circl",
                icon_url: "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [{
                name: "What is Circl?",
                value: "I honestly don't know."
            },
            {
                name: "What happens now?",
                value: "We will send you some user information?"
            }
            ]
        }
    });

}