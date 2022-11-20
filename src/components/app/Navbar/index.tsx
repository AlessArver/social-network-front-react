import { FC } from "react";

import { Navlink } from "components/Navlink";

import s from "./index.module.sass";

export interface INavItem {
  url?: string;
  onCloick?: () => void;
  text: string;
}
export interface INavbar {
  items: INavItem[];
}
export const Navbar: FC<INavbar> = ({ items }) => {
  return (
    <div className={s.navbar}>
      {items.map((i) =>
        i?.url ? (
          <Navlink
            key={i.text}
            href={i.url}
            className={s.navbar__item}
            activeClassName={s.navbar__item_active}
          >
            {i.text}
          </Navlink>
        ) : (
          <div key={i.text} className={s.navbar__item}>
            {i.text}
          </div>
        )
      )}
    </div>
  );
};
