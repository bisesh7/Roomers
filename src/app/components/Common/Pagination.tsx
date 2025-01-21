import classNames from "classnames";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { Pagination } from "react-bootstrap";
import styles from "../../styles/pagination.module.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface Props {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  className: string;
}

const PaginationComponent: NextPage<Props> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  className,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination className={className}>
      <span
        className={classNames({
          [styles.changeButton]: true,
        })}
        onClick={() => {
          if (currentPage !== 1) handlePageChange(currentPage - 1);
        }}
      >
        <GrFormPrevious />
      </span>
      {Array.from({ length: totalPages }, (_, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={currentPage === idx + 1}
          onClick={() => handlePageChange(idx + 1)}
          className={classNames({
            [styles.active]: currentPage === idx + 1,
          })}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
      <span
        className={classNames({
          [styles.changeButton]: true,
        })}
        onClick={() => {
          if (currentPage !== totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
      >
        <GrFormNext />
      </span>
    </Pagination>
  );
};

export default PaginationComponent;
