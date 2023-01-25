import Link from "next/link";
import { FC } from "react";
import { MdMoreHoriz } from "react-icons/md";

import { IPost } from "apollo/queries/post";

import { useToggle } from "hooks/useToggle";

import { Avatar } from "components/Avatar";
import { Dropdown } from "components/Dropdown";

import s from "./index.module.sass";
// import { socket } from "utils/socket";

export interface IPostProps extends IPost {
  avatar?: string;
  fullName: string;
  handleRemovePost: (postId: string) => void;
}
export const Post: FC<IPostProps> = ({
  id,
  userId,
  avatar,
  fullName,
  text,
  handleRemovePost,
}) => {
  const showOptions = useToggle();

  const onRemove = () => {
    // socket.emit("removePost", id, (res: IPost) => {
    //   handleRemovePost(res.id);
    // });
  };

  return (
    <div className={s.post}>
      <div className={s.post__header}>
        <Link href={`/profile/${userId}`} className={s.post__owner}>
          <Avatar
            width={40}
            height={40}
            src={avatar}
            className={s.post__avatar}
          />
          <div className={s.post__fullName}>{fullName}</div>
        </Link>
        <Dropdown
          childrenItems={[
            // { onClick: () => {}, text: "Edit" },
            { onClick: onRemove, text: "Remove" },
          ]}
          visible={showOptions.value}
          onOpen={showOptions.set}
          onClose={showOptions.unset}
        >
          <MdMoreHoriz onClick={showOptions.toggle} className={s.post__more} />
        </Dropdown>
      </div>
      <p className={s.post__text}>{text}</p>
    </div>
  );
};
