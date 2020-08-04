import React from "react";

const AddForm = ({ newPerson, handleNewPersonChange, handleAddSubmit }) => {
  const checkInputs = () => {
    for (const [key, value] of Object.entries(newPerson)) {
      if (!value) {
        return true;
      }
    }
  };
  return (
    <div className="form-wrap">
      <form onSubmit={handleAddSubmit}>
        <ul className="form-container">
          <li>
            <h2>Add person</h2>
          </li>

          <li>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={newPerson.firstName}
              onChange={handleNewPersonChange}
            />
          </li>
          <li>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={newPerson.lastName}
              onChange={handleNewPersonChange}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={newPerson.email}
              onChange={handleNewPersonChange}
            />
          </li>
          <li>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={newPerson.phone}
              onChange={handleNewPersonChange}
            />
          </li>
          <li>
            <button
              type="submit"
              className="button primary"
              disabled={checkInputs()}
            >
              Add person
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddForm;
