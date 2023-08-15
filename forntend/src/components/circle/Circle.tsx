import { useParams } from "react-router-dom";

const Circle = () => {
  const { circleId } = useParams();
  console.log(circleId);

  return <div>kake</div>;
};

export default Circle;
