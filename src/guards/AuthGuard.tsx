import { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";

import {
  isAuthVar,
  isOnlineVar,
  meLoadingVar,
  meVar,
} from "apollo/variables/user";
import { ME } from "apollo/queries/user";
import { UPDATE_USER } from "apollo/mutations/user";
import { useNetworkStatus } from "hooks/useNetworkStatus";
import { peer } from "utils/peer";

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
  const [isOnline, setIsOnline] = useState(true);

  const handleSetOnline = setInterval(() => {
    // setIsOnline(navigator.onLine);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(handleSetOnline);
    };
  }, []);

  useEffect(() => {
    peer.on("signal", (data) => {
      console.log("signal", data);
    });

    peer.on("stream", (currentStream) => {
      console.log("stream", currentStream);
    });
    peer.on("close", (r: any) => {
      console.log("close", r);
    });
  }, []);

  useEffect(() => {
    _getMe();

    if (data?.me) {
      meVar(data?.me);
      meLoadingVar(loading);
    }
  }, [data, isAuth]);

  if (requiredAuth && error) {
    Router.push("/login");
  }

  if (loading) {
    return <>Loading...</>;
  }

  return children;
};
