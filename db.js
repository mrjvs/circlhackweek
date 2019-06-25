const Mongoose = require('mongoose');
let connection;

async function init(connectionString) {
    Mongoose.connect(connectionString, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
    connection = Mongoose.connection;
    connection.on('error', function (err) {
        console.log("connnection error:" + err);
    });
    connection.once('open', function () {
        // yay?
    });
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
    files: [
        Object
    ],
    credentials: {
        user: String,
        pass: String // passwords in-game, not real passwords, not encrypted.
    }
});

const serverModel = Mongoose.model("server", ServerSchema);

ServerSchema.statics.blacklistedIps = [
    "127.0.0.1",
    "0.0.0.0",
    "255.255.255.0",
    "192.168.1.1",
    "192.168.1.255"
];

async function generateUniqueIp() {
    let isUnique = false;
    let newIp;
    while (!isUnique) {
        // generate new ip
        newIp = (Math.floor(Math.random() * 255) + 1) + "." + 
            (Math.floor(Math.random() * 255) + 0) + "." + 
            (Math.floor(Math.random() * 255) + 0) + "." + 
            (Math.floor(Math.random() * 255) + 0);

        
        // check if unique
        const doc = await serverModel.find({ip: newIp});
        isUnique = !doc || !this.blacklistedIps.includes(newIp);
    }
    return newIp;
}

ServerSchema.statics.generateUniqueIp = generateUniqueIp;

const userSchema = new Mongoose.Schema({
    userId: {
        unique: true,
        type: String
    },
    serverIp: String,
    keychain: Object
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