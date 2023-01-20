export default (state, action) => {
  switch (action.type) {
    case "CHANGE_BARTENDER":
      return {
        ...state,
        bartender: action.payload,
      };
    case "CHANGE_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return { ...state };
  }
};
