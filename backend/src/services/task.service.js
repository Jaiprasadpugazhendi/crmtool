const Task = require('../models/task.model');

exports.createTask = async (data) => {
    return await Task.create(data);
};

exports.getTasks = async (query) => {
    return await Task.find(query)
        .populate('assignedTo', 'name')
        .populate('createdBy', 'name')
        .sort({ dueDate: 1 });
};

exports.getTaskById = async (id) => {
    return await Task.findById(id)
        .populate('assignedTo', 'name')
        .populate('relatedTo.item'); // Dynamic population
};

exports.updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};
