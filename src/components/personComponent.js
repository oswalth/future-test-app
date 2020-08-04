import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { peopleUrl } from "../constants/constants";

const Person = ({ person, handleActivePerson }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => {
          if (open) {
            handleActivePerson({});
          } else {
            handleActivePerson(person);
          }
          setOpen((prevOpen) => !prevOpen);
        }}
      >
        <td className="person-id">{person.id}</td>
        <td className="person-firstName">{person.firstName}</td>
        <td className="person-lastName">{person.lastName}</td>
        <td className="person-email">{person.email}</td>
        <td className="person-phone">{person.phone}</td>
      </tr>
    </>
  );
};

export default Person;
