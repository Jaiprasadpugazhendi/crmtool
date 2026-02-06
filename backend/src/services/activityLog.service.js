const ActivityLog = require('../models/activityLog.model');

/**
 * Log a user activity
 * @param {Object} data
 * @param {string} data.userId
 * @param {string} data.action
 * @param {string} [data.entityType]
 * @param {string} [data.entityId]
 * @param {Object} [data.details]
 */
exports.logActivity = async (data) => {
    try {
        await ActivityLog.create({
            user: data.userId,
            action: data.action,
            entityType: data.entityType,
            entityId: data.entityId,
            details: data.details
        });
    } catch (err) {
        console.error('Failed to log activity:', err);
    }
};
