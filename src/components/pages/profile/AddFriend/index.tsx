import { FC, ReactNode, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useLazyQuery } from "@apollo/client";

import { FRIENDS, FriendStatus, IFriend } from "apollo/queries/friend";
import { IUser } from "apollo/queries/user";

import { socket } from "utils/socket";

import { Button, ButtonSize, ButtonType } from "components/Button";

import s from "./index.module.sass";

export interface IAddFriend {
  me: IUser;
  user: IUser;
}
export const AddFriend: FC<IAddFriend> = ({ me, user }) => {
  const [_geMytFriends, { loading }] = useLazyQuery(FRIENDS);
  const [friend, setFriend] = useState<IFriend | null>(null);
  const [myFriend, setMyFriend] = useState<IFriend | null>(null);

  const handleGetFriend = ({
    fromId,
    toId,
  }: {
    fromId?: string;
    toId?: string;
  }) => {
    return _geMytFriends({
      variables: {
        friendsInput: {
          from_id: fromId,
          to_id: toId,
        },
      },
    });
  };

  useEffect(() => {
    handleGetFriend({ fromId: me.id, toId: user.id }).then((res) => {
      if (res?.data?.friends?.length) {
        if (res.data.friends[0]?.from_id === me.id) {
          setMyFriend(res?.data?.friends[0]);
        } else {
          setFriend(res?.data?.friends[0]);
        }
      }
      handleGetFriend({ fromId: user.id, toId: me.id }).then((res) => {
        if (res?.data?.friends?.length) {
          if (res.data.friends[0]?.from_id === user.id) {
            setFriend(res?.data?.friends[0]);
          } else {
            setMyFriend(res?.data?.friends[0]);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("createFriend", (res: IFriend) => {
        if (res && me.id === res.to_id && res.from_id === user.id) {
          setFriend(res);
        }
      });
      socket.on("updateFriend", (res: IFriend) => {
        // * НАДО СДЕЛАТЬ ТАК,ЧТОБ ПОСЛЕ ДОБАВЛЕНИЯ В ЧС, У ДРУГОГО ЮЗЕРА БЫЛ ТЕКС: ВЫ В ЧС
        if (res) {
          if (me.id === res.to_id && res.from_id === user.id) {
            setFriend(res);
          } else if (me.id === res.from_id && res.to_id === user.id) {
            setMyFriend(res);
          }
        }
      });
      socket.on("removeFriend", (res: IFriend) => {
        if (myFriend?.status === FriendStatus.blocked) {
          setFriend(null);
        } else {
          setFriend(null);
          setMyFriend(null);
        }
      });
    }
  }, [user]);

  const handleAddFriend = () => {
    if (!friend && !myFriend) {
      // Create new column with status pending
      socket.emit(
        "createFriend",
        {
          from_id: me.id,
          to_id: user.id,
          status: FriendStatus.pending,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        (res: IFriend) => {
          setMyFriend(res);
        }
      );
    } else if (friend && !myFriend) {
      // Update status to added in one culumn & create new column with status added
      socket.emit(
        "updateFriend",
        {
          id: friend.id,
          status: FriendStatus.added,
        },
        (res: IFriend) => {
          setFriend({ ...friend, status: res.status });
        }
      );
      socket.emit(
        "createFriend",
        {
          from_id: me.id,
          to_id: user.id,
          status: FriendStatus.added,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        (res: IFriend) => {
          setMyFriend(res);
        }
      );
    }
  };

  const toggleBlock = () => {
    if (myFriend?.status === FriendStatus.blocked) {
      // Функция для разблокировки
      socket.emit("removeFriend", myFriend.id, (res: IFriend) => {});
    } else if (friend && myFriend?.status === FriendStatus.added) {
      // Функция для блокировки
      socket.emit(
        "updateFriend",
        {
          id: myFriend.id,
          status: FriendStatus.blocked,
        },
        (res: IFriend) => {
          setMyFriend({ ...myFriend, status: res.status });
        }
      );
      socket.emit("removeFriend", friend.id, (res: IFriend) => {});
    }
  };

  const onRemove = () => {
    if (myFriend && friend) {
      socket.emit("removeFriend", myFriend.id, (res: IFriend) => {});
      socket.emit("removeFriend", friend.id, (res: IFriend) => {});
    }
  };

  if (loading) {
    return (
      <Button disabled size={ButtonSize.sm}>
        Loading
      </Button>
    );
  }

  if (myFriend?.status === FriendStatus.blocked) {
    return (
      <Button
        onClick={toggleBlock}
        size={ButtonSize.sm}
        className={s.addFriend__button}
        type={ButtonType.danger}
      >
        Unblock
      </Button>
    );
  }

  if (
    friend?.status === FriendStatus.added ||
    myFriend?.status === FriendStatus.added
  ) {
    return (
      <div>
        <Button
          onClick={onRemove}
          size={ButtonSize.sm}
          className={s.addFriend__button}
          type={ButtonType.danger}
          fullWidth
        >
          Remove
        </Button>
        <Button
          onClick={toggleBlock}
          size={ButtonSize.sm}
          className={s.addFriend__button}
          type={ButtonType.danger}
          fullWidth
        >
          Block
        </Button>
      </div>
    );
  }

  if (friend?.status === FriendStatus.pending) {
    return (
      <Button
        onClick={handleAddFriend}
        size={ButtonSize.sm}
        className={s.addFriend__button}
      >
        <MdAdd className={s.profile__addIcon} />
        Add to response
      </Button>
    );
  }

  if (myFriend?.status === FriendStatus.pending) {
    return (
      <Button disabled size={ButtonSize.sm} className={s.addFriend__button}>
        Pending
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddFriend}
      size={ButtonSize.sm}
      className={s.addFriend__button}
    >
      <MdAdd className={s.profile__addIcon} />
      Add friend
    </Button>
  );
};
