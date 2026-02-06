const { z } = require('zod');

const createLeadSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        source: z.enum(['website', 'referral', 'linkedin', 'other']).optional(),
        status: z.enum(['new', 'contacted', 'qualified', 'lost', 'converted']).optional(),
    }),
});

const updateLeadSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        status: z.enum(['new', 'contacted', 'qualified', 'lost', 'converted']).optional(),
    }),
});

module.exports = {
    createLeadSchema,
    updateLeadSchema,
};
