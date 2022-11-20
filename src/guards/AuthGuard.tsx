import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/client";

import { ME } from "apollo/mutations/user";

import { meVar } from "apollo/variables/user";

export const AuthGuard = ({
  children,
  requiredAuth,
}: {
  children: JSX.Element;
  requiredAuth?: boolean;
}) => {
  const { data, loading = true, error } = useQuery(ME);

  useEffect(() => {
    if (data?.me) {
      meVar(data?.me);
    }
  }, [data]);

  if (requiredAuth && error) {
    Router.push("/login");
  }

  if (loading) {
    return <>Loading...</>;
  }

  return children;
};
