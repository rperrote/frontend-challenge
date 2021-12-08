import { FC } from "react";
import Posts from "../../containers/grid-posts";
import { PostsProvider } from "../../lib/posts";

const PostsPage: FC = (props) => {
  return (
    <PostsProvider>
      <Posts />
    </PostsProvider>
  );
};

export default PostsPage;
