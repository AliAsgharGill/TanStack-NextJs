
// import { User } from "./types";
export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}