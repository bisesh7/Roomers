"use client";

import { Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "../styles/blogs.module.scss";
import paginationStyles from "../styles/pagination.module.scss";
import common from "../styles/common.module.scss";
import PaginationComponent from "../components/Common/Pagination";

const Page = () => {
  const [blogs, setBlogs] = useState<JSX.Element[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        const newBlogs: JSX.Element[] = [];
        json.forEach((element: { title: string }) => {
          newBlogs.push(
            <Col
              sm={2}
              key={element.title}
              className={classNames({
                "mb-3": true,
                [styles.blogsListElement]: true,
              })}
            >
              <div className="py-3 mb-2">
                <Image
                  src="https://picsum.photos/500/300"
                  width={500}
                  height={300}
                  alt="Fake Image"
                  className={classNames({
                    [styles.blogsListImage]: true,
                  })}
                />
                <h6>{element.title.replace("'", "&apos;")}</h6>
              </div>
              <span
                className={classNames({
                  [styles.date]: true,
                  "text-muted": true,
                  [common.medium]: true,
                })}
              >
                {Date.now().toLocaleString().replace("'", "&apos;")}
              </span>
            </Col>
          );
        });
        setBlogs(newBlogs);
      });
  }, []);

  const blogsPerPage = 18;

  // Get current blogs based on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div
      className={classNames({
        [styles.blogsPage]: true,
      })}
    >
      <NavbarComponent />
      <Container
        className={classNames({
          "mt-5": true,
          [styles.blogsContainer]: true,
        })}
      >
        <h1>The Roomers Blog</h1>
        <span
          className={classNames({
            [common.medium]: true,
          })}
        >
          Stay up to date with the latest travel trends, industry news, and
          company announcements
        </span>

        <Row className="mt-4">{currentBlogs}</Row>

        <div className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={blogsPerPage}
            totalItems={blogs.length}
            className={classNames({
              "mt-5": true,
              [paginationStyles.pagination]: true,
            })}
          />
        </div>
      </Container>
      <Container
        className={classNames({
          [styles.footerContainer]: true,
        })}
      >
        <Footer className="" />
      </Container>
    </div>
  );
};

export default Page;
