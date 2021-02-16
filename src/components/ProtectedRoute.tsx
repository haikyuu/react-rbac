import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { isTokenValid } from "../utils/navigation";
import { UserI } from "../utils/types";

export default function ProtectedRoute(props) {
  const history = useHistory();
  useEffect(() => {
    // if user is not logged in, redirect back  to Login page and show a message
    const jsonUser = localStorage.getItem("user");
    console.log(jsonUser);
    if (jsonUser) {
      const user: UserI = JSON.parse(jsonUser);
      isTokenValid(user.token).then(result => {
        // I know, it's too long. But i prefer clarity
        // if you want isUserLoggedIn = result
        if (result === false) {
          history.push(`/login?from=home`);
        }
      });
    } else {
      history.push(`/login?from=home`);
    }
  }, []);
  return <Route {...props} />;
}
