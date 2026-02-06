const Lead = require('../models/lead.model');
const CustomerService = require('../services/customer.service');

exports.createLead = async (data) => {
    return await Lead.create(data);
};

exports.getLeads = async (query) => {
    return await Lead.find({ ...query, isDeleted: false });
};

exports.getLeadById = async (id) => {
    return await Lead.findById(id).populate('assignedTo', 'name email');
};

exports.updateLead = async (id, data) => {
    return await Lead.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.deleteLead = async (id) => {
    // Soft delete
    return await Lead.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

exports.convertLeadToCustomer = async (leadId, userId) => {
    const lead = await Lead.findById(leadId);
    if (!lead) {
        throw new Error('Lead not found');
    }
    if (lead.status === 'converted') {
        throw new Error('Lead already converted');
    }

    // Create Customer
    const customerData = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        leadId: lead._id,
        assignedTo: lead.assignedTo || userId
    };

    const customer = await CustomerService.createCustomer(customerData);

    // Update Lead
    lead.status = 'converted';
    await lead.save();

    return customer;
};
