import z from 'zod';

export const policySchema = z.object({
  servicePolicy: z.boolean().refine((value) => value === true),
  privacyPolicy: z.boolean().refine((value) => value === true),
  marketingPolicy: z.boolean(),
});

export type PolicySchema = z.infer<typeof policySchema>;
