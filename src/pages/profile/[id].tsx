import { useCallback, useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useReactiveVar,
  useSubscription,
} from "@apollo/client";
import { useRouter } from "next/router";

import { meVar } from "apollo/variables/user";
import { postsVar } from "apollo/variables/post";

import { IUser, USER } from "apollo/queries/user";
import { IPost, POSTS } from "apollo/queries/post";
import { CREATE_POST, REMOVE_POST } from "apollo/mutations/post";
import { POST_ADDED, POST_REMOVED } from "apollo/subscriptions/post";

import { MainLayout } from "layouts/MainLayout";

import { Avatar } from "components/Avatar";
import { ProfileFriends } from "components/pages/profile/ProfileFriends";
import { Post } from "components/Post";
import { CreatePost } from "components/pages/profile/CreatePost";
import { AddFriend } from "components/pages/profile/AddFriend";

import s from "styles/pages/profile.module.sass";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const me = useReactiveVar(meVar);
  const { data, loading = true } = useQuery(USER, { variables: { id } });
  const [_createPostMutation] = useMutation(CREATE_POST);
  const [_removePostMutation] = useMutation(REMOVE_POST);
  const { data: postAdded } = useSubscription(POST_ADDED);
  const { data: postRemoved } = useSubscription(POST_REMOVED);
  const { data: postsData, loading: postsLoading } = useQuery(POSTS, {
    variables: { userId: id },
  });
  const posts = useReactiveVar(postsVar);
  const [user, setUser] = useState<null | IUser>(null);
  const [friends] = useState([
    { id: "679" },
    { id: "5423" },
    { id: "2343" },
    { id: "321" },
    { id: "522" },
    { id: "543" },
    { id: "5455" },
    { id: "5432" },
  ]);

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user);
    }
  }, [loading]);

  useEffect(() => {
    if (postsData?.posts) {
      postsVar(postsData?.posts);
    }
  }, [postsLoading]);

  useEffect(() => {
    if (postAdded?.postAdded) {
      if (posts) {
        postsVar([postAdded?.postAdded, ...posts]);
      } else {
        postsVar([postAdded?.postAdded]);
      }
    }
  }, [postAdded]);

  useEffect(() => {
    if (postRemoved?.postRemoved) {
      postsVar(posts.filter((p) => p.id !== postRemoved.postRemoved?.id));
    }
  }, [postRemoved]);

  const handleAddPost = useCallback(
    (text: string) => {
      _createPostMutation({
        variables: { createPostInput: { text, userId: id } },
      }).then(({ data }) => {
        if (posts) {
          postsVar([data?.createPost, ...posts]);
        } else {
          postsVar([data?.createPost]);
        }
      });
    },
    [posts]
  );

  const handleRemovePost = useCallback(
    (postId: string) => {
      _removePostMutation({
        variables: {
          id: postId,
        },
      }).then(() => postsVar(posts.filter((p: IPost) => p.id !== postId)));
    },
    [posts]
  );

  if (loading) {
    return <>Loading...</>;
  }

  const getTime = (date?: Date) => {
    return date != null ? new Date(date).getTime() : 0;
  };

  return (
    <MainLayout
      asideChildren={
        window.innerWidth >= 768 && (
          <ProfileFriends items={friends} owner_id={`${id}`} />
        )
      }
    >
      <div className={s.profile__header}>
        <div className={s.profile__headerColumn}>
          <Avatar width={100} height={100} className={s.profile__avatar} />
          <div className={s.profile__fullName}>
            {user?.first_name} {user?.last_name}
            {/* <div>{user?.is_online ? "online" : "offline"}</div> */}
          </div>
        </div>
        {!!user && !!me && me.id !== user.id && (
          <AddFriend me={me} user={user} />
        )}
      </div>
      {!!me && me.id === id && <CreatePost handleAddPost={handleAddPost} />}
      {!!user && !!posts?.length && (
        <div className={s.profile__posts}>
          {Array.from(posts)
            .sort((a, b) => {
              const leftDate: any = getTime(a.created_at);
              const rightDate: any = getTime(b.created_at);

              return rightDate - leftDate;
            })
            .map((p) => (
              <Post
                key={p.id}
                {...p}
                meId={me?.id}
                fullName={`${user?.first_name} ${user?.last_name}`}
                avatar={user?.avatar}
                handleRemovePost={handleRemovePost}
              />
            ))}
        </div>
      )}
    </MainLayout>
  );
}
