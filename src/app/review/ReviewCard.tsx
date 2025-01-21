import React from "react";
import { Col, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import styles from "../styles/review.module.scss"; // Adjust the path as necessary
import StarRating from "./StarRating";

interface ReviewCardProps {
  id: string | null;
  imageUrl: string;
  address: string;
  rating: number;
  key: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  imageUrl,
  address,
  rating,
  key,
}) => {
  const router = useRouter();

  return (
    <Col
      onClick={() => {
        router.push(`/review/${address}?id=${id}`);
      }}
      sm="4"
      key={key}
      className={classNames(styles.reviewCard, "d-flex mt-2")}
    >
      <Image
        src={imageUrl}
        alt="Property picture"
        width={200}
        height={200}
        className={classNames(styles.propertyImage)}
      />
      <div className="ms-3">
        <span>{address}</span> <br />
        <StarRating stars={rating} />
      </div>
    </Col>
  );
};

export default ReviewCard;
