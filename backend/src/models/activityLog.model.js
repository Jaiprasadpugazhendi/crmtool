const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true // e.g., 'CREATED_LEAD', 'UPDATED_DEAL', 'LOGIN'
    },
    entityType: {
        type: String,
        enum: ['Lead', 'Customer', 'Deal', 'Task', 'User'],
        required: false
    },
    entityId: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    details: {
        type: Object // JSON object for extra details
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
