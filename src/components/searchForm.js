import React from "react";
import {
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const SearchForm = ({
  columns = [],
  search,
  handleSearch,
  searchColumn,
  handleSearchColumn,
}) => {
  return (
    <InputGroup className="mb-3">
      <DropdownButton
        as={InputGroup.Prepend}
        variant="outline-secondary"
        title={searchColumn}
        id="input-group-dropdown-1"
      >
        {columns.map((column) => {
          return (
            <Dropdown.Item
              onClick={(e) => {
                handleSearchColumn(column);
              }}
              href="#"
              key={column}
            >
              {column}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <FormControl
        placeholder=""
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <InputGroup.Append>
        <InputGroup.Text
          onClick={(e) => handleSearch(e.target.value)}
          id="basic-addon2"
        >
          Search
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchForm;
