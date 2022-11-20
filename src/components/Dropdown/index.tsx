import { FC, ReactNode } from "react";
import Tippy from "@tippyjs/react/headless";

import s from "./index.module.sass";

export interface IDropdownChildrenItems {
  onClick: () => void;
  text: string;
}
export interface IDropdown {
  children: ReactNode;
  dropdownChildren?: ReactNode;
  visible?: boolean;
  childrenItems?: IDropdownChildrenItems[];
  onOpen: () => void;
  onClose: () => void;
}
export const Dropdown: FC<IDropdown> = ({
  children,
  dropdownChildren,
  visible,
  childrenItems,
  onOpen,
  onClose,
}) => {
  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Tippy
        render={() => (
          <div onMouseEnter={onOpen} className={s.dropdown__children}>
            {childrenItems
              ? childrenItems.map((c) => (
                  <div
                    onClick={c.onClick}
                    className={s.dropdown__childrenItem}
                    key={c.text}
                  >
                    {c.text}
                  </div>
                ))
              : dropdownChildren}
          </div>
        )}
        visible={visible}
        onClickOutside={onClose}
        interactive
        placement="bottom-end"
        offset={[0, 0]}
      >
        <div>{children}</div>
      </Tippy>
    </div>
  );
};
