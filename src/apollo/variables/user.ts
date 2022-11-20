import { makeVar } from "@apollo/client";

import { IUser } from "apollo/queries/user";

export const meVar = makeVar<null | IUser>(null);
