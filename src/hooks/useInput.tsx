import { ChangeEvent, useState } from 'react'

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    setValue,
    resetField: () => setValue('')
  }
}
