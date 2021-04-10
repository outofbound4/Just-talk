//code init
const mongoose = require('mongoose');
require('dotenv').config();

// mongoDB_URL = 'mongodb://127.0.0.1:27017/chatapp', 'JustTalk' is database name
var mongoDB_URL = process.env.MongoDB_URL + process.env.DATABASE_NAME;

//  Connecting to the database
const connect = async function () {
    console.log('Connecting to DB - uri: ' + mongoDB_URL);
    return mongoose.connect(
        mongoDB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    );
};

connect().then(() => {
    console.log('Database connection successful');
}).catch((e) => {
    console.log('handle error here: ', e.message)
});