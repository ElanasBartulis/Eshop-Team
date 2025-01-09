import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string({ message: 'Email should be a string' })
    .email({ message: 'Email should be valid format' })
    .min(7, { message: 'Email should contain atleast 7 simbols' })
    .max(120, { message: 'Email should not be longer then 120 symbols' }),

  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 symbols' })
    .max(50, { message: 'First name must be less than 50 symbols' })
    .regex(/^[a-zA-Z]+$/, { message: 'First name can only contain letters' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 symbols' })
    .max(50, { message: 'Last name must be less than 50 symbols' })
    .regex(/^[a-zA-Z]+$/, { message: 'Last name can only contain letters' }),

  password: z
    .string({ message: 'Password should be a string' })
    .min(8, { message: 'Password should contain at least 8 symbols' })
    .max(60, { message: 'Password should not be longer than 60 symbols' })
    .regex(/[A-Z]/, {
      message: 'Password should contain at least one Uppercase character',
    })
    .regex(/[0-9]/, {
      message: 'Password should contain at least one number symbol',
    })
    .regex(/[a-z]/, {
      message: 'Password should contain at least one Lowercase character',
    }),
  postCode: z
    .string()
    .min(5, { message: 'Post code should be minimum 5 digits' })
    .max(5, { message: 'Post code shoould be maximum 5 digits' })
    .regex(/^\d{5}$/, { message: 'Postal code should contain only digits' }),
  phoneNumber: z.string().regex(/^\+?370\d{8}$/, {
    message: 'Phone number must be a valid phone number',
  }),

  address: z.string(),
});

export const updateSchema = registrationSchema
  .omit({
    firstName: true,
    lastName: true,
  })
  .partial();
