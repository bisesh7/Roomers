"use client";

import NavbarComponent from "@/app/components/Common/Navbar";
import classNames from "classnames";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";
import styles from "../../styles/review.module.scss";
import profileStyles from "../../styles/profile.module.scss";
import Image from "next/image";
import PaginationComponent from "@/app/components/Common/Pagination";
import PaginationStyles from "../../styles/pagination.module.scss";
import Footer from "@/app/components/Common/Footer";
import StarRating from "../StarRating";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import ReviewInput from "./ReviewInput";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
interface Property {
  address: string;
}

interface Review {
  createdAt: {
    seconds: number;
  };
  detailedFeedback: string;
  images: string[];
  keywords: string;
  landlordName: string;
  overallRating: number;
  propertyAddress: string;
  reviewerName: string;
}

// Helper function to calculate rating percentages
const calculateRatingPercentages = (reviews: Review[]) => {
  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  reviews.forEach((review) => {
    ratingCounts[review.overallRating] += 1;
  });
  const totalReviews = reviews.length;
  return {
    oneStar: (ratingCounts[1] / totalReviews) * 100,
    twoStars: (ratingCounts[2] / totalReviews) * 100,
    threeStars: (ratingCounts[3] / totalReviews) * 100,
    fourStars: (ratingCounts[4] / totalReviews) * 100,
    fiveStars: (ratingCounts[5] / totalReviews) * 100,
  };
};

// Helper function to calculate average rating
const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0; // Return 0 if no reviews to avoid division by zero

  const totalSum = reviews.reduce(
    (sum, review) => sum + review.overallRating,
    0
  );
  return totalSum / reviews.length;
};

const ITEMS_PER_PAGE = 10;

const Page = ({}) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [landlordName, setLandlordName] = useState<string>("");
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingPercentages, setRatingPercentages] = useState({
    oneStar: 0,
    twoStars: 0,
    threeStars: 0,
    fourStars: 0,
    fiveStars: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    const fetchPropertyAndReviews = async () => {
      if (!id) return;
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProperty(docSnap.data() as Property);
        fetchReviews(id);
      } else {
        console.log("No such property!");
      }
    };

    const fetchReviews = async (id: string) => {
      const q = query(
        collection(db, "reviews"),
        where("propertyAddress", "==", doc(db, "properties", id))
      );
      const querySnapshot = await getDocs(q);
      const reviewsData: Review[] = querySnapshot.docs.map(
        (doc) => doc.data() as Review
      );
      setReviews(reviewsData);
      setRatingPercentages(calculateRatingPercentages(reviewsData));
      setAverageRating(calculateAverageRating(reviewsData));

      // Find the first review with a non-empty landlord name
      const reviewWithLandlord = reviewsData.find(
        (review) => review.landlordName
      );
      if (reviewWithLandlord) {
        setLandlordName(reviewWithLandlord.landlordName);
      }
    };

    fetchPropertyAndReviews();
  }, [searchParams]);

  const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const [experience, setExperience] = useState<string>("");

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-4">
        <h5>
          {landlordName}, {property?.address}
        </h5>
        <div className="d-flex mt-4">
          <div>
            <h3>{averageRating.toFixed(1)}</h3>
            <StarRating stars={Math.round(averageRating)} />
            <br />
            <span>{reviews.length} reviews</span>
          </div>
          <div className="w-50 ms-4">
            <Row>
              <Col sm={1}>
                <span>5</span>
              </Col>
              <Col className="pt-1">
                <ProgressBar variant="dark" now={ratingPercentages.fiveStars} />
              </Col>
              <Col sm={1}>{ratingPercentages.fiveStars.toFixed(0)}%</Col>
            </Row>
            <Row>
              <Col sm={1}>
                <span>4</span>
              </Col>
              <Col className="pt-1">
                <ProgressBar variant="dark" now={ratingPercentages.fourStars} />
              </Col>
              <Col sm={1}>{ratingPercentages.fourStars.toFixed(0)}%</Col>
            </Row>
            <Row>
              <Col sm={1}>
                <span>3</span>
              </Col>
              <Col className="pt-1">
                <ProgressBar
                  variant="dark"
                  now={ratingPercentages.threeStars}
                />
              </Col>
              <Col sm={1}>{ratingPercentages.threeStars.toFixed(0)}%</Col>
            </Row>
            <Row>
              <Col sm={1}>
                <span>2</span>
              </Col>
              <Col className="pt-1">
                <ProgressBar variant="dark" now={ratingPercentages.twoStars} />
              </Col>
              <Col sm={1}>{ratingPercentages.twoStars.toFixed(0)}%</Col>
            </Row>
            <Row>
              <Col sm={1}>
                <span>1</span>
              </Col>
              <Col className="pt-1">
                <ProgressBar variant="dark" now={ratingPercentages.oneStar} />
              </Col>
              <Col sm={1}>{ratingPercentages.oneStar.toFixed(0)}%</Col>
            </Row>
          </div>
        </div>
        <div className="d-flex mt-4">
          <span className={classNames(styles.tag, "p-2 me-3")}>
            Responsive <FaAngleDown className="pb-1" />{" "}
          </span>
          <span className={classNames(styles.tag, "p-2 me-3")}>
            Unresponsive <FaAngleDown className="pb-1" />{" "}
          </span>
          <span className={classNames(styles.tag, "p-2 me-3")}>
            Professional <FaAngleDown className="pb-1" />{" "}
          </span>
        </div>

        {currentReviews.map((review, index) => (
          <div key={index} className="mt-3">
            <span>{review.reviewerName}</span> <br />
            <span className="text-muted">
              {new Date(review.createdAt.seconds * 1000).toLocaleDateString()}
            </span>
            <br />
            <div className="my-1">
              <StarRating stars={review.overallRating} />
            </div>
            <p className="text-muted">{review.detailedFeedback}</p>
          </div>
        ))}

        {user && !loading && (
          <div className="d-flex mt-4">
            <Image
              src="https://picsum.photos/200"
              alt="Profile Pic"
              width={200}
              height={200}
              className={classNames(profileStyles.roundPic)}
            />

            <ReviewInput
              handleSearch={() => {}}
              placeholder="Share your experience with the landlord"
              query={experience}
              setQuery={setExperience}
              className="ms-2"
            />
          </div>
        )}

        <PaginationComponent
          totalItems={reviews.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          setCurrentPage={setCurrentPage}
          className={classNames("mt-4", PaginationStyles.pagination)}
        />

        <Footer className="" />
      </Container>
    </div>
  );
};

export default Page;
