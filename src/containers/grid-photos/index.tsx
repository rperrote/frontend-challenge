import { FC } from "react";
import Grid from "../../components/grid";
import Photo from "../../components/photo";
import { PhotoProps } from "../../interfaces/photo";
import { usePhotosContext } from "../../lib/photos";
import "./grid-photos.css";

const Photos: FC = (props) => {
  const { photos, isFetching } = usePhotosContext();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="photos">
      <Grid>{photos?.map(PhotoRender)}</Grid>
    </div>
  );
};

const PhotoRender = (photo: PhotoProps) => {
  const { toggleLike } = usePhotosContext();

  const onLike = (id: number) => () => toggleLike(id);

  return (
    <div>
      <Photo {...photo} onLike={onLike(photo.id)} />
    </div>
  );
};

export default Photos;
