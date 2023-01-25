import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";

import { Avatar } from "components/Avatar";

import s from "./index.module.sass";
import { useQuery } from "@apollo/client";
import { FRIENDS } from "apollo/queries/friend";
import { useRouter } from "next/router";

export interface IPostFriend {
  id: string;
  avatar?: string;
}
export interface IProfileFriends {
  owner_id: string;
  items: IPostFriend[];
  className?: string;
}
export const ProfileFriends: FC<IProfileFriends> = ({
  owner_id,
  items,
  className,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading = true } = useQuery(FRIENDS, {
    variables: {
      friendsInput: { to_id: id },
    },
  });

  return (
    <div className={clsx(s.profileFriends, className)}>
      <Link href={`/friends/${owner_id}`} className={s.profileFriends__title}>
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
