// components/SearchInput.tsx
import React, { Dispatch, SetStateAction } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsArrowReturnLeft, BsSearch } from "react-icons/bs";
import classNames from "classnames";
import styles from "../../styles/searchbar.module.scss";

interface props {
  placeholder: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
  className: string;
}

const SearchInput = ({
  placeholder,
  query,
  setQuery,
  handleSearch,
  className,
}: props) => {
  return (
    <InputGroup className={className} hasValidation={false}>
      <InputGroup.Text
        className={classNames({
          [styles.searchBarIcon]: true,
        })}
        id="basic-addon1"
      >
        <BsSearch />
      </InputGroup.Text>
      <FormControl
        className={classNames({
          [styles.searchInput]: true,
        })}
        placeholder={placeholder}
        aria-label="Search"
        aria-describedby="basic-addon1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        formNoValidate
      />
      <InputGroup.Text
        className={classNames({
          [styles.enterIcon]: true,
        })}
        onClick={() => {
          handleSearch();
        }}
        id="basic-addon1"
      >
        <BsArrowReturnLeft />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchInput;
