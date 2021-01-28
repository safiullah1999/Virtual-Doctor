import { UPDATE_USER } from "./actionTypes.js";

const initialState = {
  userID: "",
  userType: "",
  account: ""
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        userID: action.userID,
        userType: action.userType,
        account: action.account
      };

    default:
      return state;
  }
};

export default Reducer;