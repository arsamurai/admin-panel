import axios, { AxiosError } from "axios"

export const isAxiosError = (error: unknown): error is AxiosError<{ [key: string]: string }> =>
  axios.isAxiosError(error) && !!error.response
