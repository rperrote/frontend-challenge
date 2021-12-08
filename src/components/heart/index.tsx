import { FC } from "react";
import "./heart.css";
import HeartIcon from "../../assets/heart.svg";
import HeartIconFilled from "../../assets/heart-filled.svg";

const Heart: FC<{ filled: boolean; onClick?: () => void }> = ({
  filled,
  onClick,
}) => (
  <img
    className="heart"
    src={filled ? HeartIconFilled : HeartIcon}
    alt={filled ? "liked" : "not liked"}
    onClick={onClick}
  />
);

export default Heart;
