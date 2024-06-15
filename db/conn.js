const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/TrekDB';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to mongodb server");
});

db.on('error', (err) => {
    console.log("mongodb connection error", err);
});

db.on('disconnected', () => {
    console.log("mongodb disconnected");
});

module.exports = db;
