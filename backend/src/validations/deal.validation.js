const { z } = require('zod');

const createDealSchema = z.object({
    body: z.object({
        title: z.string().min(2),
        value: z.number().positive(),
        stage: z.enum(['proposal', 'negotiation', 'closed-won', 'closed-lost']).optional(),
        customerId: z.string(), // ObjectId validation could be tighter
        closingDate: z.string().datetime().optional()
    }),
});

const updateDealSchema = z.object({
    body: z.object({
        title: z.string().min(2).optional(),
        value: z.number().positive().optional(),
        stage: z.enum(['proposal', 'negotiation', 'closed-won', 'closed-lost']).optional(),
        probability: z.number().min(0).max(100).optional()
    }),
});

module.exports = {
    createDealSchema,
    updateDealSchema,
};
