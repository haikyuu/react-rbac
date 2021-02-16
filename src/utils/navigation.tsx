import { useLocation } from "react-router-dom";

export async function isTokenValid(user: UserI) {
  // in the real world, we would call the API to veryfy it.
  return true;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
