import { useEffect } from "react";
import Router from "next/router";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";

import { isAuthVar, meLoadingVar, meVar } from "apollo/variables/user";
import { ME } from "apollo/queries/user";
import { UPDATE_USER } from "apollo/mutations/user";

export const AuthGuard = ({
  children,
  requiredAuth,
}: {
  children: JSX.Element;
  requiredAuth?: boolean;
}) => {
  const [_getMe, { data, loading, error }] = useLazyQuery(ME);
  const [_updateUserMutation] = useMutation(UPDATE_USER);
  const isAuth = useReactiveVar(isAuthVar);

  const handleChangeIsOnline = (payload: boolean) => () => {
    _updateUserMutation({ variables: { id: data?.me.id, is_online: payload } });
  };

  useEffect(() => {
    _getMe();

    if (data?.me) {
      meVar(data?.me);
      meLoadingVar(loading);
    }
    window.addEventListener("offline", handleChangeIsOnline(false));
    window.addEventListener("online", handleChangeIsOnline(true));
    // return () => {
    //   window.addEventListener("offline", () => handleChangeIsOnline(false));
    //   window.addEventListener("online", () => handleChangeIsOnline(true));
    // };
  }, [data, isAuth]);

  if (requiredAuth && error) {
    Router.push("/login");
  }

  if (loading) {
    return <>Loading...</>;
  }

  return children;
};
