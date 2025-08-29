import type { Express } from "express";
import { createServer, type Server } from "http";
import { bfhlRequestSchema, type BfhlResponse } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // BFHL API endpoint
  app.post("/api/bfhl", (req, res) => {
    try {
      // Validate request body
      const validatedData = bfhlRequestSchema.parse(req.body);
      
      // Process the data array
      const response = processArrayData(validatedData.data);
      
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid request format",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function processArrayData(data: string[]): BfhlResponse {
  const oddNumbers: string[] = [];
  const evenNumbers: string[] = [];
  const alphabets: string[] = [];
  const specialCharacters: string[] = [];
  let sum = 0;
  const alphabetChars: string[] = [];

  // Process each element in the data array
  data.forEach(item => {
    // Check if it's a number
    if (/^\d+$/.test(item)) {
      const num = parseInt(item, 10);
      sum += num;
      
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    }
    // Check if it's alphabetic (single character or string)
    else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      // Store individual characters for concatenation
      for (const char of item) {
        alphabetChars.push(char);
      }
    }
    // Everything else is a special character
    else {
      specialCharacters.push(item);
    }
  });

  // Create concatenation string with reverse order and alternating caps
  let concatString = "";
  if (alphabetChars.length > 0) {
    const reversedChars = alphabetChars.reverse();
    for (let i = 0; i < reversedChars.length; i++) {
      if (i % 2 === 0) {
        concatString += reversedChars[i].toUpperCase();
      } else {
        concatString += reversedChars[i].toLowerCase();
      }
    }
  }

  return {
    is_success: true,
    user_id: "g_chaitanya_9896",
    email: "chaitanya.22bce9896@vitapstudent.ac.in",
    roll_number: "22BCE9896",
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets: alphabets,
    special_characters: specialCharacters,
    sum: sum.toString(),
    concat_string: concatString
  };
}
