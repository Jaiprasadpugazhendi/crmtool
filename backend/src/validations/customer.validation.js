const { z } = require('zod');

const createCustomerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        address: z.object({
            street: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            zip: z.string().optional(),
            country: z.string().optional(),
        }).optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const updateCustomerSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        notes: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
};
