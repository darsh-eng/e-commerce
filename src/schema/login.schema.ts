import * as z from 'zod';

export const loginSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  })


export type loginSchemaType = z.infer<typeof loginSchema>;
