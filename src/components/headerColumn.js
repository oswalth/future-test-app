import React, { useEffect } from "react";

const HeaderColumn = ({ headerValue, handleOrder }) => {
  return (
    <th>
      <span className="header-val" style={{ marginRight: "1rem" }}>
        {headerValue.charAt(0).toUpperCase() + headerValue.slice(1)}
      </span>
      <span
        onClick={(e) => handleOrder(headerValue, e.target.id)}
        id=""
        className={`order-arrow`}
      >
        &uarr;
      </span>
      <span
        onClick={(e) => handleOrder(headerValue, e.target.id)}
        id="-"
        className={`order-arrow`}
      >
        &darr;
      </span>
    </th>
  );
};

export default HeaderColumn;
