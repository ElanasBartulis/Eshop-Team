import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string({ message: "Email should be a string" })
    .email({ message: "Email should be valid format" })
    .min(7, { message: "Email should contain atleast 7 simbols" })
    .max(120, { message: "Email should not be longer then 120 symbols" }),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 symbols" })
    .max(50, { message: "First name must be less than 50 symbols" })
    .regex(/^[a-zA-Z]+$/, { message: "First name can only contain letters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 symbols" })
    .max(50, { message: "Last name must be less than 50 symbols" })
    .regex(/^[a-zA-Z]+$/, { message: "Last name can only contain letters" }),

    postCode: z
    .string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val)
    .refine(val => val === null || /^\d{5}$/.test(val), {
      message: "Postal code should contain only digits"
    }),

  phoneNumber: z
    .string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val)
    .refine(val => val === null || /^\+?370\d{8}$/.test(val), {
      message: "Phone number must be valid"
    }),

  address: z.string().optional().nullable().transform(val => val === '' ? null : val),
});

export const updateSchema = registrationSchema
  .omit({
    firstName: true,
    lastName: true,
    postCode: true,
    phoneNumber: true,
    address: true,
  })
  .partial();
