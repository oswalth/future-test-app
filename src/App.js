import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { Table, Container, Button } from "react-bootstrap";
import HeaderColumn from "./components/headerColumn";
import Person from "./components/personComponent";
import SearchForm from "./components/searchForm";
import PeoplePagination from "./components/pagination";
import axios from "axios";
import ACTIONS from "./constants/actionTypes";
import { peopleUrl, tableColumns } from "./constants/constants";
import { sortingRule } from "./utils";
import peopleReducer from "./reducers/peopleReducer";
import AddForm from "./components/addForm";
import AdditionalInfo from "./components/additionalInfo";

const App = () => {
  const [data, setData] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = React.useState("");
  const [searchColumn, setSearchCoolumn] = useState("firstName");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activePerson, setActivePerson] = useState({});
  const [addPerson, setAddPerson] = useState(false);
  const [newPerson, setNewPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [state, dispatch] = useReducer(peopleReducer, {
    loading: true,
    people: [],
  });

  const handleOrder = (headerValue, order) => {
    setOrder(order + headerValue);
  };

  const handleSearch = (searchVal) => {
    setSearch(searchVal);
  };

  const handleSearchColumn = (filterVal) => {
    console.log(filterVal);
    setSearchCoolumn(filterVal);
  };

  const handleActivePerson = (person) => {
    setActivePerson(person);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_PERSON,
      payload: {
        newPerson: { id: Math.floor(Math.random() * 1500), ...newPerson },
      },
    });
    setAddPerson((prevAdd) => !prevAdd);
  };

  const handleNewPersonChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleDatasetSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.children[0].children);
  };

  useEffect(() => {
    const sortedPeople = [...state.people].sort(sortingRule(order));
    dispatch({ type: ACTIONS.SORT_PEOPLE, payload: { people: sortedPeople } });
  }, [order]);

  useEffect(() => {
    setHasNextPage(page < Math.ceil(state.people.length / 50));
  }, [state.people, page]);

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios.get(peopleUrl[data]).then((res) => {
      // setPeople(res.data);
      dispatch({ type: ACTIONS.GET_DATA, payload: { people: res.data } });
    });
  }, [data]);

  return (
    <Container className="my-4">
      <SearchForm
        columns={tableColumns}
        search={search}
        searchColumn={searchColumn}
        handleSearch={handleSearch}
        handleSearchColumn={handleSearchColumn}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PeoplePagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
        <Button onClick={() => setAddPerson((prevAdd) => !prevAdd)}>+</Button>
      </div>
      {addPerson ? (
        <AddForm
          newPerson={newPerson}
          handleAddSubmit={handleAddSubmit}
          handleNewPersonChange={handleNewPersonChange}
        />
      ) : null}
      {data ? (
        <Table>
          <thead>
            <tr>
              {tableColumns.map((column) => {
                return (
                  <HeaderColumn
                    key={column}
                    headerValue={column}
                    handleOrder={handleOrder}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>
            {state.people
              .filter((person) => {
                if (
                  String(person[searchColumn])
                    .toLowerCase()
                    .indexOf(search.toLowerCase(), 0) !== -1
                ) {
                  return person;
                }
              })
              .map((person) => {
                return (
                  <Person
                    key={person.phone}
                    person={person}
                    activePerson={activePerson}
                    handleActivePerson={handleActivePerson}
                  />
                );
              })
              .slice((page - 1) * 50, page * 50)}
          </tbody>
        </Table>
      ) : (
        <div className="form-wrap">
          <form onSubmit={handleDatasetSubmit}>
            <ul className="form-container">
              <li>
                <h2>Choose dataset</h2>
              </li>
              <li>
                <label htmlFor="dataChoice1">Small dataset</label>
                <input
                  type="radio"
                  id="dataChoice1"
                  name="data"
                  value="small"
                  onChange={(e) => setData(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="dataChoice2">Big dataset</label>
                <input
                  type="radio"
                  id="dataChoice2"
                  name="data"
                  value="big"
                  onChange={(e) => setData(e.target.value)}
                />
              </li>
            </ul>
          </form>
        </div>
      )}
      {state.loading && (
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "50%",
          }}
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        />
      )}
      <AdditionalInfo activePerson={activePerson} />
      <PeoplePagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
    </Container>
  );
};

export default App;
