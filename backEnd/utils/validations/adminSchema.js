import { z } from "zod";

export const adminRegistrationSchema = z.object({
  userName: z
    .string({ message: "Username should be a string" })
    .min(3, { message: "Username should contain at least 3 symbols" })
    .max(60, { message: "Username should be shorter than 60 symbols" }),
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
