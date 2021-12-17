import { SET_LOGIN_STATUS } from "../types";
export const updateLoginStatus = (loginStatus) => (dispatch, getState) => {
  try {
    console.log(loginStatus, getState());
    dispatch({
      type: SET_LOGIN_STATUS,
      payload: {
        loginStatus,
        message: `Update loginStatus ${
          getState().loginReducer.loginStatus
        } to ${loginStatus} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
