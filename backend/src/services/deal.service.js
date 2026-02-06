const Deal = require('../models/deal.model');

exports.createDeal = async (data) => {
    return await Deal.create(data);
};

exports.getDeals = async (query) => {
    return await Deal.find(query).populate('customerId', 'name');
};

exports.getDealById = async (id) => {
    return await Deal.findById(id).populate('customerId', 'name').populate('assignedTo', 'name');
};

exports.updateDeal = async (id, data) => {
    return await Deal.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.deleteDeal = async (id) => {
    return await Deal.findByIdAndDelete(id);
};
