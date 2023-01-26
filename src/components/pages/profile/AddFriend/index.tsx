import { FC, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";

import { FRIENDS, FriendStatus, IFriend } from "apollo/queries/friend";
import { IUser } from "apollo/queries/user";

import { Button, ButtonSize, ButtonType } from "components/Button";

import s from "./index.module.sass";
import {
  CREATE_FRIEND,
  REMOVE_FRIEND,
  UPDATE_FRIEND,
} from "apollo/mutations/friend";
import {
  FRIEND_ADDED,
  FRIEND_REMOVED,
  FRIEND_UPDATED,
} from "apollo/subscriptions/friend";

export interface IAddFriend {
  me: IUser;
  user: IUser;
}
export const AddFriend: FC<IAddFriend> = ({ me, user }) => {
  const [_geMytFriends, { loading }] = useLazyQuery(FRIENDS);
  const [_createFriendMutation] = useMutation(CREATE_FRIEND);
  const [_updateFriendMutation] = useMutation(UPDATE_FRIEND);
  const [_removeFriendMutation] = useMutation(REMOVE_FRIEND);
  const { data: friendAdded } = useSubscription(FRIEND_ADDED);
  const { data: friendUpdated } = useSubscription(FRIEND_UPDATED);
  const { data: friendRemoved } = useSubscription(FRIEND_REMOVED);
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
    if (friendUpdated?.friendUpdated) {
      if (me.id === friendUpdated?.friendUpdated?.to_id) {
        if (user.id === friendUpdated?.friendUpdated?.from_id) {
          setFriend(friendUpdated?.friendUpdated);
        }
      } else {
        if (myFriend) {
          if (friendUpdated?.friendUpdated?.status === FriendStatus.blocked) {
            setMyFriend(null);
          } else {
            setMyFriend(friendUpdated?.friendUpdated);
          }
        }
      }
    }
  }, [friendUpdated]);

  useEffect(() => console.log({ myFriend, friend }), [myFriend, friend]);

  useEffect(() => {
    if (friendAdded?.friendAdded) {
      console.log("friendAdded", friendAdded?.friendAdded);
      if (me.id === friendAdded.friendAdded.to_id) {
        setFriend(friendAdded?.friendAdded);
      } else {
        if (myFriend) {
          setMyFriend({ ...myFriend, status: FriendStatus.added });
        }
      }
    }
  }, [friendAdded]);

  useEffect(() => {
    if (friendRemoved?.friendRemoved) {
      if (myFriend && friendRemoved?.friendRemoved?.id === myFriend.id) {
        setMyFriend(null);
      } else if (friend && friendRemoved?.friendRemoved?.id === friend.id) {
        setFriend(null);
      }
    }
  }, [friendRemoved]);

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
      }).then(({ data }) => {
        setMyFriend(data?.createFriend);
      });
    } else if (friend && !myFriend) {
      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: friend.id,
            status: FriendStatus.added,
          },
        },
      }).then(({ data }) =>
        setFriend({ ...friend, status: data?.updateFriend?.status })
      );

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
      }).then(({ data }) => setMyFriend(data?.createFriend));
    }
  };

  const toggleBlock = () => {
    if (myFriend?.status === FriendStatus.blocked) {
      // Функция для разблокировки
      _removeFriendMutation({
        variables: {
          id: myFriend.id,
        },
      }).then(() => setMyFriend(null));
    } else if (friend && myFriend?.status === FriendStatus.added) {
      // Функция для блокировки

      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: myFriend.id,
            status: FriendStatus.blocked,
          },
        },
      }).then(({ data }) => {
        setMyFriend({ ...myFriend, status: data?.updateFriend?.status });
      });

      _removeFriendMutation({
        variables: {
          id: friend.id,
        },
      }).then(() => setFriend(null));
    }
  };

  const onRemove = () => {
    if (myFriend && friend) {
      _removeFriendMutation({
        variables: {
          id: myFriend.id,
        },
      }).then(() => setMyFriend(null));
      _updateFriendMutation({
        variables: {
          updateFriendInput: {
            id: friend.id,
            status: FriendStatus.pending,
          },
        },
      }).then(({ data }) => {
        setFriend({ ...friend, status: data?.updateFriend?.status });
      });
    }
  };

  if (loading) {
    return (
      <Button disabled size={ButtonSize.sm}>
        Loading
      </Button>
    );
  }

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
