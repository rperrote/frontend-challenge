import { FC } from "react";
import { usePostsContext } from "../../lib/posts";
import { PostProps } from "../../interfaces/post";
import Grid from "../../components/grid";
import "./grid-posts.css";
import Post from "../../components/post";
import Modal from "../../components/modal";
import { useState } from "react";
import Form from "../../components/form";

const Posts: FC = (props) => {
  const { posts, isFetching } = usePostsContext();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts">
      <AddPostModal />
      <Grid>{posts?.map(PostRender)}</Grid>
    </div>
  );
};

const PostRender = (post: PostProps) => {
  const { toggleLike } = usePostsContext();

  const onLike = (id: number) => () => toggleLike(id);

  return (
    <div>
      <Post {...post} onLike={onLike(post.id)} />
    </div>
  );
};

interface NewPostProps {
  title: string;
  body: string;
}

const AddPostModal: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const { addPost } = usePostsContext();

  const toggleShow = () => setShow((prevState) => !prevState);

  const handleSubmit = (post: NewPostProps) => {
    addPost(post);
    toggleShow();
  };

  return (
    <>
      <a className="addPost" onClick={toggleShow}>
        Add new
      </a>
      {show && (
        <Modal onClose={toggleShow}>
          <Form<NewPostProps> onSubmit={handleSubmit}>
            <Form.Input name="title" label="Titulo: " />
            <Form.Input name="body" label="Contenido: " type="textarea" />
            <button type="submit">Crear</button>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Posts;
