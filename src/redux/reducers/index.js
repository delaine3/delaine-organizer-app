import { SET_LOGIN_STATUS } from "../types";

const INITIAL_STATE = {
  loginStatus: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return INITIAL_STATE;
  }
};
