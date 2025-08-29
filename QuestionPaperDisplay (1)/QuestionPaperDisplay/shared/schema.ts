import { z } from "zod";

// Input schema for the BFHL API
export const bfhlRequestSchema = z.object({
  data: z.array(z.string()).min(1, "Data array must contain at least one element")
});

export type BfhlRequest = z.infer<typeof bfhlRequestSchema>;

// Response schema for the BFHL API
export const bfhlResponseSchema = z.object({
  is_success: z.boolean(),
  user_id: z.string(),
  email: z.string(),
  roll_number: z.string(),
  odd_numbers: z.array(z.string()),
  even_numbers: z.array(z.string()),
  alphabets: z.array(z.string()),
  special_characters: z.array(z.string()),
  sum: z.string(),
  concat_string: z.string()
});

export type BfhlResponse = z.infer<typeof bfhlResponseSchema>;
