const mongoose = require('mongoose');
let connection;

async function init(connectionString) {
    connection = mongoose.connect(connectionString, {useNewUrlParser: true});
    connection.on('error', console.error.bind(console, 'connection error:'));
    await connection.once('open');
    return true;
}





module.exports = {
    init,
    connection,

}