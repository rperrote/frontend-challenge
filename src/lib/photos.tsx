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
import { PhotoProps } from "../interfaces/photo";
import useFetch from "../hooks/useFetch";

const PhotosContext = createContext<{
  state: PhotoProps[];
  dispatch: Dispatch<any>;
  isFetching: boolean;
}>({
  state: [],
  dispatch: () => {},
  isFetching: true,
});

const PHOTO_URL = "https://jsonplaceholder.typicode.com/albums/1/photos";
const ADD_PHOTO = "ADD_PHOTO";
const LIKED = "LIKED";
const SET_PHOTOS = "SET_PHOTOS";

const photosReducer: Reducer<any, any> = (state: PhotoProps[], action) => {
  switch (action.type) {
    case ADD_PHOTO: {
      return [action.payload, ...state];
    }
    case LIKED: {
      const photos = state.map((photo) => {
        if (photo.id === action.payload.id) {
          return { ...photo, liked: !photo.liked };
        }

        return photo;
      });

      return photos;
    }

    case SET_PHOTOS: {
      return action.payload;
    }

    default:
      throw new Error(`Action is not supported: ${action.type}`);
  }
};

export const PhotosProvider: FC = (props) => {
  const { response = [], isFetching } = useFetch<PhotoProps[]>(PHOTO_URL);
  const [state, dispatch] = useReducer(photosReducer, response);

  useEffect(() => {
    if (response.length > 0) {
      dispatch({ type: SET_PHOTOS, payload: response.slice(10) });
    }
  }, [response]);

  const value = useMemo(() => ({ state, dispatch, isFetching }), [state]);

  return <PhotosContext.Provider value={value} {...props} />;
};

export const usePhotosContext = () => {
  const context = useContext(PhotosContext);

  if (!context) {
    throw new Error("usePhotosContext must be used inside a PhotosProvider");
  }

  const { dispatch, state, ...photoContext } = context;

  const addPhoto = (photo: Partial<PhotoProps>) => {
    photo.id = -Date.now();
    photo.liked = false;
    dispatch({ type: ADD_PHOTO, payload: photo });
  };

  const toggleLike = (id: number) => {
    dispatch({ type: LIKED, payload: { id } });
  };

  return { photos: state, addPhoto, toggleLike, ...photoContext };
};
