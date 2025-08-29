import { apiRequest } from "./queryClient";
import type { BfhlRequest, BfhlResponse } from "@shared/schema";

export async function callBfhlApi(data: BfhlRequest): Promise<BfhlResponse> {
  const response = await apiRequest("POST", "/api/bfhl", data);
  return response.json();
}
