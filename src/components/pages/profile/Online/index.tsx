import { FC, useEffect, useState } from "react";

export interface IOnline {
  meId?: string;
  authorId?: string | string[];
}
export const Online: FC<IOnline> = ({ meId, authorId }) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleSetOnline = setInterval(() => setIsOnline(true), 1000);

  useEffect(() => {
    return () => {
      clearInterval(handleSetOnline);
    };
  }, []);

  useEffect(() => {}, [isOnline]);

  return <div>{isOnline ? "online" : "offline"}</div>;
};
