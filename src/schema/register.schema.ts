import * as z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long'),

    email: z.string().nonempty('Email is required').email('Invalid email address'),

    password: z
      .string()
      .nonempty('Password is required')
      .min(6, 'Password must be at least 6 characters long'),

    rePassword: z
      .string()
      .nonempty('Confirm Password is required')
      .min(6, 'Confirm Password must be at least 6 characters long'),

    phone: z
      .string()
      .nonempty('Phone number is required')
      .regex(/^01[0125][0-9]{8}$/, 'Phone number must be a valid Egyptian number (11 digits)'),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    message: 'Passwords do not match',
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
