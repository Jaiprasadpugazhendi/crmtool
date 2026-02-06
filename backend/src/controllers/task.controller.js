const TaskService = require('../services/task.service');
const ActivityLogService = require('../services/activityLog.service');

exports.createTask = async (req, res, next) => {
    try {
        const taskData = {
            ...req.body,
            createdBy: req.user.id,
            assignedTo: req.body.assignedTo || req.user.id
        };

        const task = await TaskService.createTask(taskData);

        await ActivityLogService.logActivity({
            userId: req.user.id,
            action: 'CREATED_TASK',
            entityType: 'Task',
            entityId: task._id
        });

        res.status(201).json({ success: true, data: task });
    } catch (err) {
        next(err);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        // If agent, only show assigned tasks. If admin/manager, show all or filter.
        // For simplicity, showing all but we could add filter logic here.
        const query = {};
        if (req.user.role === 'agent') {
            query.assignedTo = req.user.id;
        }
        const tasks = await TaskService.getTasks(query);
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        next(err);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await TaskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await TaskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (req.body.status === 'completed') {
            await ActivityLogService.logActivity({
                userId: req.user.id,
                action: 'COMPLETED_TASK',
                entityType: 'Task',
                entityId: task._id
            });
        }

        res.status(200).json({ success: true, data: task });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await TaskService.deleteTask(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
