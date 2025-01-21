"use client";

import { Container, Row } from "react-bootstrap";
import NavbarComponent from "../components/Common/Navbar";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import PaginationComponent from "../components/Common/Pagination";
import classNames from "classnames";
import PaginationStyles from "../styles/pagination.module.scss";
import SearchInput from "../components/Homepage/SearchBar";

interface ReviewData {
  id: string;
  imageUrl: string;
  address: string;
  rating: number;
}

const ITEMS_PER_PAGE = 30;

const Page = ({}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Function to fetch the latest review for each property
  const fetchLatestReviewForEachProperty = async () => {
    const propertiesSnapshot = await getDocs(collection(db, "properties"));
    const latestReviews = await Promise.all(
      propertiesSnapshot.docs.map(async (propertyDoc) => {
        const propertyId = propertyDoc.id;
        setPropertyId(propertyId);
        const reviewsQuery = query(
          collection(db, "reviews"),
          where("propertyAddress", "==", doc(db, "properties", propertyId)),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const reviewSnapshot = await getDocs(reviewsQuery);

        const reviews = reviewSnapshot.docs.map((doc) => doc.data());

        // Calculate average rating if reviews are available
        const averageRating =
          reviews.reduce((acc, review) => acc + review.overallRating, 0) /
            reviews.length || 0;

        if (!reviewSnapshot.empty) {
          const reviewData = reviewSnapshot.docs[0].data();
          return {
            id: reviewSnapshot.docs[0].id,
            imageUrl: reviewData.images[0] || "https://via.placeholder.com/200", // Placeholder if no image
            address: propertyDoc.data().address,
            rating: averageRating,
          };
        }
        return null;
      })
    );

    // Filter out any null entries if no reviews were found
    setReviews(latestReviews.filter((review) => review !== null));
  };

  useEffect(() => {
    fetchLatestReviewForEachProperty();
  }, []);

  const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-4">
        <SearchInput
          placeholder="Search by landlord name, city or rating..."
          setQuery={setSearchQuery}
          query={searchQuery}
          handleSearch={handleSearch}
          className="mt-4"
        />

        <h4 className="mt-4">Reviews</h4>

        <Row>
          {currentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={propertyId}
              imageUrl={review.imageUrl}
              address={review.address}
              rating={review.rating}
            />
          ))}
        </Row>

        <PaginationComponent
          totalItems={reviews.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          setCurrentPage={setCurrentPage}
          className={classNames("mt-4", PaginationStyles.pagination)}
        />
      </Container>
    </div>
  );
};

export default Page;
