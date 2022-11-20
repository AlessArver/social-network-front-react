import Router from "next/router";

import { meVar } from "apollo/variables/user";

export default function ProfileMe() {
  const me = meVar();

  if (me) {
    Router.push(`/profile/${me.id}`);
  }

  return <div>Not found</div>;
}
