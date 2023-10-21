import { SET_CURRENT_USER, USER_LOADING, GET_USERS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  users: [],
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload, // Replace state.users with the new data
      };
      
    default:
      return state;
  }
}
