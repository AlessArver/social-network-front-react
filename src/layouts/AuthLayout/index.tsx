import { FC, FormEventHandler, ReactNode } from "react";

import { Button } from "components/Button";

import s from "./index.module.sass";

export enum AuthLayoutType {
  register = "register",
  login = "login",
}
export interface IAuthLayout {
  children?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  type: AuthLayoutType.register | AuthLayoutType.login;
  loading?: boolean;
}
export const AuthLayout: FC<IAuthLayout> = ({
  children,
  onSubmit,
  type,
  loading,
}) => {
  return (
    <div className={s.authLayout}>
      <form onSubmit={onSubmit} className={s.authLayout__form}>
        <div className={s.authLayout__title}>
          {type === AuthLayoutType.register ? "Register" : "Login"}
        </div>
        <div className={s.authLayout__inputs}>{children}</div>
        <Button htmlType="submit" disabled={loading}>
          Enter
        </Button>
      </form>
    </div>
  );
};
