import { useCallback, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

import { IUser, USER } from "apollo/queries/user";
import { IPost, POSTS } from "apollo/queries/post";

import { meVar } from "apollo/variables/user";

import { socket } from "utils/socket";

import { MainLayout } from "layouts/MainLayout";

import { Avatar } from "components/Avatar";
import { Button, ButtonSize } from "components/Button";
import { ProfileFriends } from "components/pages/profile/ProfileFriends";
import { Post } from "components/Post";
import { CreatePost } from "components/pages/profile/CreatePost";

import s from "styles/pages/profile.module.sass";
import { postsVar } from "apollo/variables/post";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const me = meVar();
  const { data, loading = true } = useQuery(USER, { variables: { id } });
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
      console.log("postsData?.posts", postsData?.posts);
      postsVar(postsData?.posts);
    }
  }, [postsLoading]);

  const handleAddPost = useCallback((post: IPost) => {
    console.log("posts", posts, postsData, postsData?.posts);
    if (postsData?.posts) {
      postsVar([post, ...postsData?.posts]);
    } else {
      postsVar([post]);
    }
  }, []);

  const handleRemovePost = (postId: string) => {
    console.log("handleRemovePost", posts, postsData);

    console.log(postsData?.posts.filter((p: IPost) => p.id !== postId));
    postsVar(postsData?.posts.filter((p: IPost) => p.id !== postId));
  };

  useEffect(() => {
    socket.on("createPost", (res) => {
      handleAddPost(res);
    });
    socket.on("removePost", (res) => {
      handleRemovePost(res.id);
    });

    return () => {
      socket.removeListener("createPost");
      socket.removeListener("removePost");
    };
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  const getTime = (date?: Date) => {
    return date != null ? new Date(date).getTime() : 0;
  };

  return (
    <MainLayout
      asideChildren={<ProfileFriends items={friends} owner_id={"23443"} />}
    >
      <div className={s.profile__header}>
        <div className={s.profile__headerColumn}>
          <Avatar width={100} height={100} className={s.profile__avatar} />
          <div className={s.profile__fullName}>
            {user?.first_name} {user?.last_name}
          </div>
        </div>
        {!me && (
          <Button size={ButtonSize.sm}>
            <MdAdd className={s.profile__addIcon} />
            Add friend
          </Button>
        )}
      </div>
      {!!me && me.id === id && (
        <CreatePost userId={id} handleAddPost={handleAddPost} />
      )}
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
