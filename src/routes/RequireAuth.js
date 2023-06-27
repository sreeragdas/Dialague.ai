import { Redirect } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const result = Boolean(sessionStorage.getItem("isAuthenticated"));

  if (!result) {
    return <Redirect to="/" />;
  } else {
    return children;
  }
};

export default RequireAuth;