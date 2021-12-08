import {
  createContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { PostProps } from "../interfaces/post";
import useFetch from "../hooks/useFetch";

const PostsContext = createContext<{
  state: PostProps[];
  dispatch: Dispatch<any>;
  isFetching: boolean;
}>({
  state: [],
  dispatch: () => {},
  isFetching: true,
});

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const ADD_POST = "ADD_POST";
const LIKED = "LIKED";
const SET_POSTS = "SET_POSTS";

const postsReducer: Reducer<any, any> = (state: PostProps[], action) => {
  switch (action.type) {
    case ADD_POST: {
      return [action.payload, ...state];
    }
    case LIKED: {
      const posts = state.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, liked: !post.liked };
        }

        return post;
      });

      return posts;
    }

    case SET_POSTS: {
      return action.payload;
    }

    default:
      throw new Error(`Action is not supported: ${action.type}`);
  }
};

export const PostsProvider: FC = (props) => {
  const { response = [], isFetching } = useFetch<PostProps[]>(POST_URL);
  const [state, dispatch] = useReducer(postsReducer, response);

  useEffect(() => {
    if (response.length > 0) {
      dispatch({ type: SET_POSTS, payload: response });
    }
  }, [response]);

  const value = useMemo(() => ({ state, dispatch, isFetching }), [state]);

  return <PostsContext.Provider value={value} {...props} />;
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePostsContext must be used inside a PostsProvider");
  }

  const { dispatch, state, ...postContext } = context;

  const addPost = (post: Partial<PostProps>) => {
    post.id = -Date.now();
    post.liked = false;
    dispatch({ type: ADD_POST, payload: post });
  };

  const toggleLike = (id: number) => {
    dispatch({ type: LIKED, payload: { id } });
  };

  return { posts: state, addPost, toggleLike, ...postContext };
};
