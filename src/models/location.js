const mongoose = require('mongoose');
// Create a schema for the location data
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    email: String,
    timestamp: { type: Date, default: Date.now }
});


// Create a model based on the schema
const LocationPoint = mongoose.model('LocationPoint', locationSchema);
module.exports = LocationPoint;