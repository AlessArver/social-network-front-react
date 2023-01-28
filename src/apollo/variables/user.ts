import { makeVar } from "@apollo/client";

import { IUser } from "apollo/queries/user";

export const meVar = makeVar<null | IUser>(null);
export const meLoadingVar = makeVar<boolean>(true);
export const isAuthVar = makeVar<boolean>(false);
export const isOnlineVar = makeVar<boolean>(true);
