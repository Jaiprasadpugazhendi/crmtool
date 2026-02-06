const ActivityLog = require('../models/activityLog.model');

exports.getLogs = async (req, res, next) => {
    try {
        const logs = await ActivityLog.find()
            .populate('user', 'name email')
            .sort({ timestamp: -1 })
            .limit(100);

        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        next(err);
    }
};
