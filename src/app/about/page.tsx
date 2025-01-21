"use client";

import Jumbotron from "./Jumbotron";
import NavbarComponent from "../components/Common/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import footerStyles from "../styles/footer.module.scss";
import common from "../styles/common.module.scss";
import styles from "../styles/about.module.scss";
import classNames from "classnames";
import { BsHeart, BsMegaphone } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa6";
import Footer from "../components/Common/Footer";
import AuthComponent from "../components/Auth/Auth";

const Page = ({}) => {
  return (
    <div>
      <NavbarComponent />
      <Container>
        <Jumbotron />
        <h4 className="mt-5">Our Misssion</h4>
        <span>
          Our mission is to empower renters by providing a platform for honest
          reviews and reliable landlord information.
        </span>
        <h4 className="mt-3">Our Story</h4>
        <span>
          Launched in 2024 by{" "}
          <a
            className={classNames({
              [footerStyles.links]: true,
              [common.medium]: true,
            })}
            href="https://www.shakyabisesh.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bisesh Shakya
          </a>{" "}
          , Roomers Space was born from personal challenges faced in the rental
          market, aiming to improve rental experiences for everyone.
        </span>

        <h4 className="mt-3">Behind Roomers.space</h4>
        <span
          className={classNames({
            [common.medium]: true,
            "text-muted": true,
          })}
        >
          <a
            className={classNames({
              [footerStyles.links]: true,
              [common.medium]: true,
            })}
            href="https://www.shakyabisesh.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bisesh Shakya
          </a>{" "}
          is the founder, designer, and developer of Roomers.space, a platform
          dedicated to improving the rental experience by connecting renters
          with trustworthy landlords. With a background at Diagonal Technologies
          and IntelliFi, Bisesh leveraged his expertise in software development
          and financial technology to create a user-centric website that
          addresses the complexities of the rental market. His work at
          Roomers.space represents not just a business venture but a commitment
          to enhancing transparency and fairness in renting.
        </span>

        <h4 className="mt-3">Our Values</h4>
        <Row className="mt-2">
          <Col
            className={classNames({
              "border p-3 ps-3 me-2": true,
              [styles.value]: true,
            })}
          >
            <BsHeart className="mb-1" />
            &nbsp;
            <span
              className={classNames({
                [common.medium]: true,
              })}
            >
              Empowerment
            </span>
          </Col>
          <Col
            className={classNames({
              "border p-3 ps-3 me-2": true,
              [styles.value]: true,
            })}
          >
            <FaRegHandshake className="mb-1" />
            &nbsp;
            <span
              className={classNames({
                [common.medium]: true,
              })}
            >
              Community
            </span>
          </Col>
          <Col
            className={classNames({
              "border p-3 ps-3 me-2": true,
              [styles.value]: true,
            })}
          >
            <BsMegaphone className="mb-1" />
            &nbsp;
            <span
              className={classNames({
                [common.medium]: true,
              })}
            >
              Transparency
            </span>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <div className="mb-4">
            <h1>Join Our Community</h1>
            <span
              className={classNames({
                [common.medium]: true,
              })}
            >
              Share and discover honest rental reviews today.
            </span>
          </div>
          <AuthComponent className="" login={false} />
        </div>

        <Footer className="" />
      </Container>
    </div>
  );
};

export default Page;
