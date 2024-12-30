import z from "zod";

export const productCreateSchema = z.object({
  name: z.string({ message: "Product name should be a string" }),
  price: z.number({ message: "Product price should be a number" }),
});

export const productUpdatedSchema = productCreateSchema.extend({
  discount: z.number({ message: "Product discount need to be a number" }),
  description: z.string({ message: "Product description should be a string" }),
  rating: z.number({ message: "Product rating should be a number" }),
});
