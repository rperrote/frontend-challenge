import { FC, useState } from "react";
import Heart from "../heart";
import Modal from "../modal";
import "./photo.css";

interface PhotoProps {
  title: string;
  url: string;
  thumbnailUrl: string;
  liked: boolean;
  onLike: () => void;
}

const Photo: FC<PhotoProps> = ({ title, url, thumbnailUrl, liked, onLike }) => {
  return (
    <div className="photo-post">
      <h4>{title}</h4>
      <img src={thumbnailUrl} alt={title} />
      <div>
        <PhotoModal title={title} url={url} />
      </div>
      <Heart filled={liked} onClick={() => onLike()} />
    </div>
  );
};

const PhotoModal: FC<Partial<PhotoProps>> = ({ url, title }) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => setShow((prevState) => !prevState);

  return (
    <>
      <a className="photo" onClick={toggleShow}>
        Abrir
      </a>
      {show && (
        <Modal onClose={toggleShow}>
          <img src={url} alt={title} />
        </Modal>
      )}
    </>
  );
};

export default Photo;
