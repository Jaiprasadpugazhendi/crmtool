const Customer = require('../models/customer.model');

exports.createCustomer = async (data) => {
    return await Customer.create(data);
};

exports.getCustomers = async (query) => {
    return await Customer.find(query);
};

exports.getCustomerById = async (id) => {
    return await Customer.findById(id).populate('assignedTo', 'name email');
};

exports.updateCustomer = async (id, data) => {
    return await Customer.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.deleteCustomer = async (id) => {
    return await Customer.findByIdAndDelete(id);
};
