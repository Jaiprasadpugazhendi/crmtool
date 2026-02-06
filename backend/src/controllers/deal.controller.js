const DealService = require('../services/deal.service');
const ActivityLogService = require('../services/activityLog.service');

exports.createDeal = async (req, res, next) => {
    try {
        const deal = await DealService.createDeal({
            ...req.body,
            assignedTo: req.user.id
        });

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'CREATED_DEAL',
            entityType: 'Deal',
            entityId: deal._id,
            details: { value: deal.value }
        });

        res.status(201).json({ success: true, data: deal });
    } catch (err) {
        next(err);
    }
};

exports.getDeals = async (req, res, next) => {
    try {
        const deals = await DealService.getDeals();
        res.status(200).json({ success: true, count: deals.length, data: deals });
    } catch (err) {
        next(err);
    }
};

exports.getDeal = async (req, res, next) => {
    try {
        const deal = await DealService.getDealById(req.params.id);
        if (!deal) {
            return res.status(404).json({ success: false, message: 'Deal not found' });
        }
        res.status(200).json({ success: true, data: deal });
    } catch (err) {
        next(err);
    }
};

exports.updateDeal = async (req, res, next) => {
    try {
        const deal = await DealService.updateDeal(req.params.id, req.body);
        if (!deal) {
            return res.status(404).json({ success: false, message: 'Deal not found' });
        }

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'UPDATED_DEAL',
            entityType: 'Deal',
            entityId: deal._id,
            details: { stage: deal.stage }
        });

        res.status(200).json({ success: true, data: deal });
    } catch (err) {
        next(err);
    }
};

exports.deleteDeal = async (req, res, next) => {
    try {
        const deal = await DealService.deleteDeal(req.params.id);
        if (!deal) {
            return res.status(404).json({ success: false, message: 'Deal not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
