import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isTokenValid, useQuery } from "./utils/navigation";

export default function App() {
  const logout = () => {
    localStorage.clear("user");
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home (Must be logged in)</Link>
            </li>
            <li>
              <Link to="/about">About (Public page)</Link>
            </li>
            <li>
              <Link to="/users">Users (Must be Admin)</Link>
            </li>
          </ul>
          <button onClick={logout}>Logout</button>
        </nav>

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
    </Router>
  );
}

function Login() {
  const [role, setRole] = useState("user");
  const queryParams = useQuery();
  let history = useHistory();
  //check if user is logged in and redirect to Home
  useEffect(() => {
    // get tje user data from local storage
    const jsonUser = localStorage.getItem("user");
    if (!jsonUser) return;
    const user = JSON.parse(jsonUser);
    console.log(user.token);
    // verify the user token
    if (user && user.token) {
      isTokenValid(user.token).then(result => {
        if (result === true) {
          // redirect to About Page
          history.push("/About");
        }
      });
    }
  }, []);
  const login = () => {
    // store role in local storage
    localStorage.setItem(
      "user",
      JSON.stringify({ role, token: "e.g: JWT token" })
    );
    // redirect to Home page
    history.push(`/${queryParams.from}`);
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
