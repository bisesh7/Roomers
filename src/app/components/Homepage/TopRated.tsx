import { Carousel, Row } from "react-bootstrap";
import CarouselComponent from "./Carousel";
import CarouselImage from "../Common/CarouselImage";
import Property1Image from "../../../public/images/property1.png";
import Property2Image from "../../../public/images/property2.png";
import Property3Image from "../../../public/images/property3.png";
import { useState } from "react";

function TopRated() {
  const [interval] = useState(5000);

  const carouselItems = [
    <Carousel.Item key={1} interval={interval}>
      <Row>
        <CarouselImage
          image={Property1Image}
          imageAlt="Property 1"
          address="1234 Main St."
          numberOfReviews={10}
        />
        <CarouselImage
          image={Property2Image}
          imageAlt="Property 2"
          address="1234 Knight St."
          numberOfReviews={3}
        />
        <CarouselImage
          image={Property3Image}
          imageAlt="Property 3"
          address="1234 Cambie St."
          numberOfReviews={8}
        />
      </Row>
    </Carousel.Item>,
    <Carousel.Item key={2} interval={interval}>
      <Row>
        <CarouselImage
          image={Property1Image}
          imageAlt="Property 1"
          address="1234 Burrard St."
          numberOfReviews={10}
        />
        <CarouselImage
          image={Property2Image}
          imageAlt="Property 2"
          address="1234 Granvile St."
          numberOfReviews={3}
        />
        <CarouselImage
          image={Property3Image}
          imageAlt="Property 3"
          address="1234 Fir St."
          numberOfReviews={8}
        />
      </Row>
    </Carousel.Item>,
  ];

  return (
    <div className="mt-4">
      <h4>Top-Rated Properties</h4>
      <CarouselComponent carouselItems={carouselItems} />
    </div>
  );
}

export default TopRated;
