"use client";

import classNames from "classnames";
import NavbarComponent from "./components/Common/Navbar";
import Jumbotron from "./components/Homepage/Jumbotron";
import { Container } from "react-bootstrap";
import SearchInput from "./components/Homepage/SearchBar";
import TopRated from "./components/Homepage/TopRated";
import HowItWorks from "./components/Homepage/HowItWorks";
import RecentReviews from "./components/Homepage/RecentReviews";
import WhyRoomers from "./components/Homepage/WhyRoomers";
import HelpUs from "./components/Homepage/HelpUs";
import Footer from "./components/Common/Footer";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <>
      <NavbarComponent />

      <Container
        className={classNames({
          "mt-4": true,
        })}
      >
        <Jumbotron />
        <SearchInput
          placeholder="Search by landlord name, city or rating..."
          setQuery={setSearchQuery}
          query={searchQuery}
          handleSearch={handleSearch}
          className="mt-4"
        />
        <TopRated />
        <HowItWorks className="" />
        <RecentReviews className="" />
        <WhyRoomers className="" />
        <HelpUs className="" />
        <Footer className="" />
      </Container>
    </>
  );
}
