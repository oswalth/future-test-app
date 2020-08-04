import React from "react";
import { Collapse, Card } from "react-bootstrap";

const AdditionalInfo = ({ activePerson }) => {
  return (
    <Collapse in={Object.keys(activePerson).length !== 0}>
      {activePerson.firstName ? (
        <Card style={{ width: "100%", marginBottom: "2rem" }}>
          <Card.Body>
            <Card.Title>
              Выбран пользователь:{" "}
              <b>{activePerson.firstName + activePerson.lastName}</b>
            </Card.Title>
            <Card.Text>
              <textarea style={{ width: "100%" }}>
                {activePerson.description}
              </textarea>
            </Card.Text>
            <Card.Text>
              Адрес проживания: <b>{activePerson.address.streetAddress}</b>
            </Card.Text>
            <Card.Text>
              Город: <b>{activePerson.address.city}</b>
            </Card.Text>
            <Card.Text>
              Провинция/штат: <b>{activePerson.address.state}</b>
            </Card.Text>
            <Card.Text>
              Индекс: <b>{activePerson.address.zip}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </Collapse>
  );
};

export default AdditionalInfo;
