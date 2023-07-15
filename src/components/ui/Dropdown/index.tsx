import { ReactNode } from 'react'
import Tippy from '@tippyjs/react/headless'

import s from './index.module.sass'

export interface IDropdownChildrenItems {
  onClick: () => void
  children: ReactNode
}
export interface IDropdown {
  children: ReactNode
  dropdownChildren?: ReactNode
  visible?: boolean
  childrenItems?: IDropdownChildrenItems[]
  onOpen: () => void
  onClose: () => void
}
export const Dropdown = ({ children, dropdownChildren, visible, childrenItems, onOpen, onClose }: IDropdown) => {
  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Tippy
        render={() => (
          <div onMouseEnter={onOpen} className={s.dropdown__children}>
            {childrenItems
              ? childrenItems.map((c, index) => (
                  <div onClick={c.onClick} className={s.dropdown__childrenItem} key={index}>
                    {c.children}
                  </div>
                ))
              : dropdownChildren}
          </div>
        )}
        visible={visible}
        onClickOutside={onClose}
        interactive
        placement='bottom-end'
        offset={[0, 0]}
      >
        <div>{children}</div>
      </Tippy>
    </div>
  )
}
