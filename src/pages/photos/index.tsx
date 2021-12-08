import { FC } from "react";
import Photos from "../../containers/grid-photos";
import { PhotosProvider } from "../../lib/photos";

const PhotosPage: FC = (props) => {
  return (
    <PhotosProvider>
      <Photos />
    </PhotosProvider>
  );
};

export default PhotosPage;
