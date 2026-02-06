const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lead',
        required: false // Might be created directly without a lead
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    notes: {
        type: String
    },
    tags: [String],
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
