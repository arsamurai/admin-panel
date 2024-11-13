import { useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (value?: typeof storedValue | ((prev: typeof storedValue) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    if (valueToStore === undefined) {
      localStorage.removeItem(key)
      setValue(undefined)
    } else {
      localStorage.setItem(key, JSON.stringify(valueToStore))
      setValue(valueToStore)
    }
  }

  return [storedValue, setStoredValue] as const
}
