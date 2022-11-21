import { useEffect } from "react";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/client";

import { meVar } from "apollo/variables/user";
import { ME } from "apollo/queries/user";
import { UPDATE_USER } from "apollo/mutations/user";

export const AuthGuard = ({
  children,
  requiredAuth,
}: {
  children: JSX.Element;
  requiredAuth?: boolean;
}) => {
  const { data, loading = true, error } = useQuery(ME);
  const [_updateUserMutation] = useMutation(UPDATE_USER);

  const handleChangeIsOnline = (payload: boolean) => () => {
    _updateUserMutation({ variables: { id: data?.me.id, is_online: payload } });
  };

  useEffect(() => {
    if (data?.me) {
      meVar(data?.me);
    }
    window.addEventListener("offline", handleChangeIsOnline(false));
    window.addEventListener("online", handleChangeIsOnline(true));
    // return () => {
    //   window.addEventListener("offline", () => handleChangeIsOnline(false));
    //   window.addEventListener("online", () => handleChangeIsOnline(true));
    // };
  }, [data]);

  if (requiredAuth && error) {
    Router.push("/login");
  }

  if (loading) {
    return <>Loading...</>;
  }

  return children;
};
