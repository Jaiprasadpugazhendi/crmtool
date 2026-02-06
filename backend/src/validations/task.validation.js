const { z } = require('zod');

const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(2),
        description: z.string().optional(),
        dueDate: z.string().datetime().optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        relatedTo: z.object({
            kind: z.enum(['Lead', 'Customer', 'Deal']),
            item: z.string()
        }).optional(),
        assignedTo: z.string().optional() // Can assign to others if admin/manager
    }),
});

const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        status: z.enum(['pending', 'in-progress', 'completed']).optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
    }),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
