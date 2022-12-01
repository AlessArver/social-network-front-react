import { useReactiveVar } from "@apollo/client";

import { meLoadingVar, meVar } from "apollo/variables/user";
import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  const me = useReactiveVar(meVar);
  const meLoading = useReactiveVar(meLoadingVar);

  useEffect(() => {
    if (!meLoading) {
      if (me) {
        Router.push("/messages");
      } else {
        Router.push("/login");
      }
    }
  }, [me, meLoading]);

  return <div></div>;
}
