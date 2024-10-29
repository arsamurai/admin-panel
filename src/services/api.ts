import axios, { CreateAxiosDefaults } from "axios"

import { requiredGet } from "@shared/utils/env"
import { removeTrailingSlash } from "@shared/utils/helpers"

const defaultInstanceSettings: CreateAxiosDefaults = {
  baseURL: removeTrailingSlash(requiredGet("VITE_API_URL")),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    //"Access-Control-Allow-Credentials": true,
    //"Access-Control-Allow-Origin": requiredGet("VITE_BACKEND_HOST"),
  },
}

export const api = axios.create(defaultInstanceSettings)
