const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a deal title']
    },
    value: {
        type: Number,
        required: [true, 'Please add a deal value']
    },
    currency: {
        type: String,
        default: 'USD'
    },
    stage: {
        type: String,
        enum: ['proposal', 'negotiation', 'closed-won', 'closed-lost'],
        default: 'proposal'
    },
    probability: {
        type: Number, // Percentage 0-100
        default: 50
    },
    closingDate: {
        type: Date
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
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

module.exports = mongoose.model('Deal', DealSchema);
