const Mongoose = require('mongoose');
let connection;

async function init(connectionString) {
    connection = Mongoose.connect(connectionString, {useNewUrlParser: true});
    connection.on('error', console.error.bind(console, 'connection error:'));
    await connection.once('open');
    return true;
}

const ServerSchema = new Mongoose.Schema({
    ip: {
        unique: true,
        type: String
    },
    linked: [
        String
    ],
    ports: {
        requiredAmount: Number,
        portList: [{
            portNumber: Number,
            portType: String
        }]
    },
    files: [{
        // stored as js objects, more info in another flowchart
    }],
    credentials: {
        username: String,
        password: String // passwords in-game, not real passwords, not encrypted.
    }
});

const serverModel = Mongoose.model("server", ServerSchema);

const userSchema = new Mongoose.Schema({
    userId: String,
    serverIp: String
});

const userModel = Mongoose.model("user", userSchema);

module.exports = {
    init,
    connection,
    ServerSchema,
    serverModel,
    userSchema,
    userModel
}