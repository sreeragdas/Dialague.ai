import { client } from "../../axios";
import { setPermissions } from "./Permission";

export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await client.post("/login/", { email, password });

      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user data in session storage
        sessionStorage.setItem('isAuthenticated', true);
        let user = response.data.user;
        const permission = await client.get('/group/' + user.groups[0].id + '/permissions/')
          .catch((err) => {
            console.log('error ', err);
          });
        dispatch(setPermissions(permission.data));
        sessionStorage.setItem('permissions', JSON.stringify(permission.data));
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    } catch (error) {
      if (error.response) {

        const statusCode = error.response.status;
        let errorMessage = "";

        if (statusCode === 400) {
          return "Please check your credentials ";
          //  dispatch(loginFailure("Please check your credentials !!!"))
          errorMessage = "Please check your credentials !!!";
        } else if (statusCode === 501) {
          return "Bad request";
          // errorMessage = "Bad request";
        } else if (statusCode === 401) {
          return "Inactive User Please Contact Admin.";
          // errorMessage = "Inactive User Please Contact Admin.";
        } else {
          return "Internal error"
          // errorMessage = "Internal error";
        }

        dispatch(loginFailure(errorMessage));
      }
      else {
        dispatch(loginFailure(error.message));
      }

    }

  };
};
