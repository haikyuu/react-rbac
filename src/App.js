import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
async function isTokenValid(token) {
  // in the real world, we would call the API to veryfy it.
  return true;
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
  const history = useHistory();
  useEffect(() => {
    // if user is not logged in, redirect back to Login page and show a message
    const jsonUser = localStorage.getItem("user");
    console.log(jsonUser);
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
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
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
