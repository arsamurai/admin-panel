import { api } from "@services/api"

import { GeneralResponse } from "./general-service.types"

export class GeneralService {
  static getGeneral = () => {
    return api.get<GeneralResponse>("store?entityType=general&action=getAll")
  }
}
