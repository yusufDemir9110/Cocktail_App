export default (state, action) => {
  switch (action.type) {
    case "CHANGE_BARTENDER":
      return {
        ...state,
        bartender: action.payload,
      };
    default:
      return { ...state };
  }
};
