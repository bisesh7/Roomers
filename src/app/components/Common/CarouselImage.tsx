import classNames from "classnames";
import { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import styles from "../../styles/carousel.module.scss";
import common from "../../styles/common.module.scss";
import { Col } from "react-bootstrap";

interface Props {
  image: StaticImageData;
  imageAlt: string;
  address: string;
  numberOfReviews: number;
}

const CarouselImage: NextPage<Props> = ({
  image,
  imageAlt,
  address,
  numberOfReviews,
}) => {
  return (
    <>
      <Col
        sm={4}
        className={classNames({
          [styles.carouselItem]: true,
        })}
      >
        <div>
          <Image
            src={image}
            alt={imageAlt}
            width={400}
            height={300}
            className={classNames({
              [styles.picture]: true,
            })}
          />
          <div className="mt-3">
            <span
              className={classNames({
                [common.medium]: true,
              })}
            >
              {address}
            </span>{" "}
            <br />
            <span className="text-muted">{`Based on ${numberOfReviews} review`}</span>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarouselImage;
