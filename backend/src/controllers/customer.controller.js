const CustomerService = require('../services/customer.service');
const ActivityLogService = require('../services/activityLog.service');

exports.createCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerService.createCustomer({
            ...req.body,
            assignedTo: req.user.id
        });

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'CREATED_CUSTOMER',
            entityType: 'Customer',
            entityId: customer._id,
            details: { name: customer.name }
        });

        res.status(201).json({ success: true, data: customer });
    } catch (err) {
        next(err);
    }
};

exports.getCustomers = async (req, res, next) => {
    try {
        const customers = await CustomerService.getCustomers();
        res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (err) {
        next(err);
    }
};

exports.getCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerService.getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (err) {
        next(err);
    }
};

exports.updateCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerService.updateCustomer(req.params.id, req.body);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'UPDATED_CUSTOMER',
            entityType: 'Customer',
            entityId: customer._id
        });

        res.status(200).json({ success: true, data: customer });
    } catch (err) {
        next(err);
    }
};

exports.deleteCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerService.deleteCustomer(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
