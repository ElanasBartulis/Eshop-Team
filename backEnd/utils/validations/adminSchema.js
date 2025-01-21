import { z } from "zod";

export const adminRegistrationSchema = z.object({
  email: z
    .string({ message: "Email should be a string" })
    .email({ message: "Email should be valid format" })
    .min(7, { message: "Email should contain atleast 7 simbols" })
    .max(120, { message: "Email should not be longer then 120 symbols" }),
  password: z
    .string({ message: "Password should be a string" })
    .min(8, { message: "Password should contain at least 8 symbols" })
    .max(60, { message: "Password should not be longer than 60 symbols" })
    .regex(/[A-Z]/, {
      message: "Password should contain at least one Uppercase character",
    })
    .regex(/[0-9]/, {
      message: "Password should contain at least one number symbol",
    })
    .regex(/[a-z]/, {
      message: "Password should contain at least one Lowercase character",
    }),
});
