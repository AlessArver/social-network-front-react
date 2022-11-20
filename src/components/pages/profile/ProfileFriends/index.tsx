import Link from "next/link";
import { FC } from "react";

import { Avatar } from "components/Avatar";

import s from "./index.module.sass";

export interface IPostFriend {
  id: string;
  avatar?: string;
}
export interface IProfileFriends {
  owner_id: string;
  items: IPostFriend[];
}
export const ProfileFriends: FC<IProfileFriends> = ({ owner_id, items }) => {
  return (
    <div className={s.profileFriends}>
      <Link
        href={`/friends?id=${owner_id}`}
        className={s.profileFriends__title}
      >
        Friends
      </Link>
      <div className={s.profileFriends__items}>
        {items.map((i) => (
          <Link href={`/profile/${i.id}`} key={i.id}>
            <Avatar width={40} height={40} />
          </Link>
        ))}
      </div>
    </div>
  );
};
