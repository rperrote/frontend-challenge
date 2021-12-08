import { FC } from "react";
import Heart from "../heart";
import "./post.css";

interface PostProps {
  title: string;
  body: string;
  liked: boolean;
  onLike: () => void;
}

const Post: FC<PostProps> = ({ title, body, liked, onLike }) => {
  return (
    <div className="post">
      <h4>{title}</h4>
      <p>{body}</p>
      <Heart filled={liked} onClick={() => onLike()} />
    </div>
  );
};

export default Post;
