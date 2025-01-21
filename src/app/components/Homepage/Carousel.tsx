import { NextPage } from "next";
import Carousel from "react-bootstrap/Carousel";

interface Props {
  carouselItems: React.JSX.Element[];
}

const CarouselComponent: NextPage<Props> = ({ carouselItems }) => {
  return (
    <Carousel className="mt-4" controls={false} indicators={false}>
      {carouselItems}
    </Carousel>
  );
};

export default CarouselComponent;
