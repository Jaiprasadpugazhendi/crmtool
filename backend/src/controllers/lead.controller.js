const LeadService = require('../services/lead.service');
const ActivityLogService = require('../services/activityLog.service');

exports.createLead = async (req, res, next) => {
    try {
        const lead = await LeadService.createLead({
            ...req.body,
            assignedTo: req.user.id
        });

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'CREATED_LEAD',
            entityType: 'Lead',
            entityId: lead._id
        });

        res.status(201).json({ success: true, data: lead });
    } catch (err) {
        next(err);
    }
};

exports.getLeads = async (req, res, next) => {
    try {
        const leads = await LeadService.getLeads();
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (err) {
        next(err);
    }
};

exports.getLead = async (req, res, next) => {
    try {
        const lead = await LeadService.getLeadById(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        next(err);
    }
};

exports.updateLead = async (req, res, next) => {
    try {
        const lead = await LeadService.updateLead(req.params.id, req.body);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'UPDATED_LEAD',
            entityType: 'Lead',
            entityId: lead._id
        });

        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        next(err);
    }
};

exports.deleteLead = async (req, res, next) => {
    try {
        const lead = await LeadService.deleteLead(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

exports.convertLead = async (req, res, next) => {
    try {
        const customer = await LeadService.convertLeadToCustomer(req.params.id, req.user.id);

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'CONVERTED_LEAD',
            entityType: 'Lead',
            entityId: req.params.id,
            details: { newCustomerId: customer._id }
        });

        res.status(200).json({ success: true, message: 'Lead converted successfully', data: customer });
    } catch (err) {
        if (err.message === 'Lead not found') {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
};
