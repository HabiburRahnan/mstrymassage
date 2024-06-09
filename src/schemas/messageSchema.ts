import { z } from "zod";

export const messageSchema = z.object({
  contant: z
  .string()
  .min(10, {message:"Content must be at lest of 10 charaters"})
  .max(300,{message:"Content must be no longer then  300 charaters"})
});
