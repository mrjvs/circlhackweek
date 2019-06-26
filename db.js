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

const serverSchema = new Mongoose.Schema({
    ip: {
        unique: true,
        type: String
    },
    name: String,
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
    files: Array,
    credentials: {
        user: String,
        pass: String // passwords in-game, not real passwords, not encrypted. doesn't protect any actual data.
    }
});

const serverModel = Mongoose.model("server", serverSchema);

serverSchema.statics.blacklistedIps = [
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

serverSchema.statics.generateUniqueIp = generateUniqueIp;

const userSchema = new Mongoose.Schema({
    userId: {
        unique: true,
        type: String
    },
    serverList: Array,
    serverIp: String,
    questServerList: Object,
    activeQuest: Number,
    keychain: Array
    /*
        Keychain object
        {
            ip:
            user:
            pass:
        }
    */
});

const userModel = Mongoose.model("user", userSchema);

module.exports = {
    init,
    connection,
    serverSchema,
    serverModel,
    userSchema,
    userModel
}