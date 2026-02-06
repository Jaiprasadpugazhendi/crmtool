const express = require('express');
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validations/task.validation');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getTasks)
    .post(validate(createTaskSchema), createTask);

router
    .route('/:id')
    .get(getTask)
    .put(validate(updateTaskSchema), updateTask)
    .delete(deleteTask);

module.exports = router;
