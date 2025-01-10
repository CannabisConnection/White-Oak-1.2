import { API_ERRORS } from "../config/constants"

export async function handleApiError(error: unknown): Promise<never> {
  console.error("API Error:", error)

  if (error instanceof Error) {
    if (error.message.includes("Failed to fetch")) {
      throw new Error(API_ERRORS.CONNECTION)
    }
    if (error.message.includes("Invalid URL")) {
      throw new Error(API_ERRORS.INVALID_URL)
    }
    throw error
  }

  throw new Error(API_ERRORS.UNKNOWN)
}
