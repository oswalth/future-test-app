const sortingRule = (property) => {
  let order = 1;

  if (property[0] === "-") {
    order = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * order;
  };
};

export { sortingRule };
