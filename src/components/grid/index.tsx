import { FC } from "react";
import "./grid.css";

interface GridProps {}

const Grid: FC<GridProps> = (props) => {
  return <div className="grid">{props.children}</div>;
};

export default Grid;
