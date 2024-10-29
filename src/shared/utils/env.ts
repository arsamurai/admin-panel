import { removeTrailingSlash } from "./helpers"

const unwrap = (value: string | undefined, errorMessage: string) => {
  if (value === undefined || value === null) {
    throw new Error(errorMessage)
  }
  return value
}

export function requiredGet(variableName: string): string {
  return unwrap(
    import.meta.env[variableName],
    `No variable ${variableName} found in the environment.`,
  )
}

export function getWithDefault(variableName: string, defaultValue: string): string {
  return import.meta.env[variableName] ?? defaultValue
}

export const isProduction = () => import.meta.env.PROD

export const isDevelopment = () => import.meta.env.DEV

export const withBackendHost = (path: string) =>
  removeTrailingSlash(requiredGet("VITE_BACKEND_HOST")) + path
