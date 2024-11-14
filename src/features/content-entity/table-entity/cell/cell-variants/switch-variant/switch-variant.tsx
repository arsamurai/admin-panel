import { FC, useState } from "react"

import { Switch } from "@shared/ui/fields"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

import { SwitchVariantProps } from "./switch-variant.types"

const SwitchVariant: FC<SwitchVariantProps> = ({ id, api_route, api_object_key, data }) => {
  const [value, setValue] = useState(data)

  const toggle = async () => {
    try {
      const response = await fetch(withBackendHost(`${api_route}${id}`), {
        method: "POST",
        body: JSON.stringify({ id, [api_object_key]: !value }),
      })

      if (!response.ok) {
        showToast("Щось пішло не так!", { type: "error" })
      }
    } catch {
      showToast("Щось пішло не так!", { type: "error" })
    }
    setValue(prev => !prev)
  }

  return (
    <Switch>
      <Switch.Input id={`switch-${id}`} type="checkbox" onChange={toggle} checked={value} />
    </Switch>
  )
}
export default SwitchVariant
