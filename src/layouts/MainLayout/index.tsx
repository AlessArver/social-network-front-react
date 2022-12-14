import { FC, ReactNode } from "react";
import Cookie from "js-cookie";
import Router from "next/router";

import { isAuthVar, meVar } from "apollo/variables/user";

import { Navbar } from "components/app/Navbar";

import s from "./index.module.sass";

export interface IMainLayout {
  children: ReactNode;
  asideChildren?: ReactNode;
}
export const MainLayout: FC<IMainLayout> = ({ children, asideChildren }) => {
  const NAV_ITEMS = [
    {
      url: "/profile",
      text: "profile",
    },
    {
      url: "/messages",
      text: "messages",
    },
    {
      url: "/settings",
      text: "settings",
    },
    {
      onClick: () => {
        Cookie.remove("userToken");
        meVar(null);
        isAuthVar(false);
        Router.push("/login");
      },
      text: "exit",
    },
  ];

  return (
    <div className={s.mainLayout}>
      <div className={s.mainLayout__card}>
        <Navbar items={NAV_ITEMS} className={s.mainLayout__navbar} />
        <div className={s.mainLayout__children}>{children}</div>
        {!!asideChildren && (
          <div className={s.mainLayout__aside}>{asideChildren}</div>
        )}
      </div>
    </div>
  );
};
