import ACTIONS from "../constants/actionTypes";

const peopleReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, people: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, people: action.payload.people };
    case ACTIONS.SORT_PEOPLE:
      return { ...state, loading: false, people: action.payload.people };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        people: [],
      };
    case ACTIONS.ADD_PERSON:
      const newPeople = [action.payload.newPerson, ...state.people];
      return { ...state, people: newPeople };
    default:
      return state;
  }
};

export default peopleReducer;
