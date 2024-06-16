const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    startingplace: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    familynumber: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        enum: ['Batch1', 'Batch2', 'Batch3'],
        required: true,
    },

    terms: {
        type: Boolean,
        required: true,
    },
    
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
