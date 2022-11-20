import { useState } from "react";

export const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => {
    setValue(!value);
  };

  const set = () => {
    setValue(true);
  };

  const unset = () => {
    setValue(false);
  };

  return {
    value,
    toggle,
    set,
    unset,
  };
};
