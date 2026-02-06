const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'lost', 'converted'],
        default: 'new'
    },
    source: {
        type: String,
        enum: ['website', 'referral', 'linkedin', 'other'],
        default: 'website'
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
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

// Create index for soft delete
LeadSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

module.exports = mongoose.model('Lead', LeadSchema);
