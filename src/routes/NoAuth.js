import { Redirect } from "react-router-dom";

const NoAuth = ({ children }) => {
  const result = Boolean(sessionStorage.getItem("isAuthenticated"));

  if (result) {
    return <Redirect to="/dashboard" />;
  } else {
    return children;
  }
};

export default NoAuth;