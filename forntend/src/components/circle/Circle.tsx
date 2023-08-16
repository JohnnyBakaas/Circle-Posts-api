import { useParams } from "react-router-dom";

const Circle = () => {
  const { circleId } = useParams();
  console.log(circleId);

  return <div>Dette er enda ikke implimentert :)</div>;
};

export default Circle;
