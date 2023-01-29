import { FC, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useLazyQuery, useMutation } from "@apollo/client";

import { FRIEND, FriendStatus, IFriend } from "apollo/queries/friend";
import { IUser } from "apollo/queries/user";

import { Button, ButtonSize, ButtonType } from "components/Button";

import s from "./index.module.sass";
import {
  CREATE_FRIEND,
  REMOVE_FRIEND,
  UPDATE_FRIEND,
} from "apollo/mutations/friend";
import { FRIEND_EVENTS } from "utils/socket/events";
import { socket } from "utils/socket/socket";

export interface IAddFriend {
  me: IUser;
  user: IUser;
}
export const AddFriend: FC<IAddFriend> = ({ me, user }) => {
  const [_getMyFriendData] = useLazyQuery(FRIEND);
  const [_createFriendMutation] = useMutation(CREATE_FRIEND);
  const [_updateFriendMutation] = useMutation(UPDATE_FRIEND);
  const [_removeFriendMutation] = useMutation(REMOVE_FRIEND);
  const [friend, setFriend] = useState<IFriend | null>(null);
  const [myFriend, setMyFriend] = useState<IFriend | null>(null);

  const handleGetFriend = () =>
    _getMyFriendData({
      variables: { friendsInput: { from_id: me.id, to_id: user.id } },
      onCompleted: (data) => {
        _getMyFriendData({
          variables: { friendsInput: { from_id: user.id, to_id: me.id } },
        });
      },
    });

  useEffect(() => {
    handleGetFriend();

    socket.on(`friend-${me.id}-${user.id}`, (res) => {
      setMyFriend(res);
    });
    socket.on(`friend-${user.id}-${me.id}`, (res) => {
      setFriend(res);
    });
  }, []);

  useEffect(() => {
    socket.on(FRIEND_EVENTS.friendRemoved, (data) => {
      console.log(FRIEND_EVENTS.friendRemoved, data);
      if (myFriend?.id === data) {
        setMyFriend(null);
      } else if (friend?.id === data) {
        setFriend(null);
      }
    });
  }, [friend, myFriend]);

  const handleAddFriend = () => {
    if (!friend && !myFriend) {
      _createFriendMutation({
        variables: {
          createFriendInput: {
            from_id: me.id,
            to_id: user.id,
            status: FriendStatus.pending,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        },
      });
    } else if (friend && !myFriend) {
      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: friend.id,
            status: FriendStatus.added,
          },
        },
      });
      _createFriendMutation({
        variables: {
          createFriendInput: {
            from_id: me.id,
            to_id: user.id,
            status: FriendStatus.added,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        },
      });
    }
  };

  const toggleBlock = () => {
    if (myFriend?.status === FriendStatus.blocked) {
      // Функция для разблокировки
      _removeFriendMutation({
        variables: {
          id: myFriend.id,
        },
      });
    } else if (friend && myFriend?.status === FriendStatus.added) {
      // Функция для блокировки
      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: myFriend.id,
            status: FriendStatus.blocked,
          },
        },
      });
      _removeFriendMutation({
        variables: {
          id: friend.id,
        },
      });
    }
  };

  const onRemove = () => {
    if (myFriend && friend) {
      _removeFriendMutation({
        variables: {
          id: myFriend.id,
        },
      });
      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: friend.id,
            status: FriendStatus.pending,
          },
        },
      });
    }
  };

  if (friend) {
    if (friend?.status === FriendStatus.blocked) {
      return (
        <Button
          disabled
          size={ButtonSize.sm}
          className={s.addFriend__button}
          type={ButtonType.danger}
        >
          U a blocked
        </Button>
      );
    }
  } else {
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
