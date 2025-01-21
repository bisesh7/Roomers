import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";

interface StarRatingProps {
  stars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
  const totalStars = 5;
  const starIcons = [];

  // Add filled stars as per the rating
  for (let i = 0; i < stars; i++) {
    starIcons.push(<RiStarFill key={`fill-${i}`} />);
  }

  // Add outline stars for the remaining
  for (let i = stars; i < totalStars; i++) {
    starIcons.push(<RiStarLine key={`line-${i}`} />);
  }

  return <>{starIcons}</>;
};

export default StarRating;
