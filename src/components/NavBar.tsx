import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function Header() {
  const { logout } = useContext(UserContext);
  return (
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
  );
}
