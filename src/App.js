import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { isTokenValid, useQuery } from "./utils/navigation";
import UserProvider, { UserContext } from "./components/UserProvider";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <NavBar />
      <UserProvider>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <ProtectedRoute path="/users">
              <Users />
            </ProtectedRoute>
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

function Login() {
  const [role, setRole] = useState("user");
  const queryParams = useQuery();
  let history = useHistory();
  const context = useContext(UserContext);
  console.log("c", context);
  const { user } = context;
  //check if user is logged in and redirect to Home
  useEffect(() => {
    // get tje user data from local storage
    console.log("login token", user.token);
    // verify the user token
    isTokenValid(user).then(result => {
      if (result === true) {
        // redirect to About Page
        history.push("/About");
      }
    });
  }, [history, user]);
  const login = () => {
    // store role in local storage
    localStorage.setItem(
      "user",
      JSON.stringify({ role, token: "Bearer 4390309403940fccF" })
    );
    // redirect to Home page
    let route = queryParams.from;
    if (!route) route = "";
    history.push(`/${route}`);
  };
  return (
    <div>
      <h2>Login</h2>
      <select value={role} onChange={event => setRole(event.target.value)}>
        <option value="user">User</option>
        <option disabled value="admin">
          Admin
        </option>
      </select>
      <button type="button" onClick={login}>
        Submit
      </button>
    </div>
  );
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
