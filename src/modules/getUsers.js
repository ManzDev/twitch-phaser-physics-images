import { shuffle } from "./shuffle.js";

const SIZE = 20;
const API_URL = "http://localhost:9999/api/users";

export const getUsers = async () => {
  const response = await fetch(API_URL);
  const usersList = await response.json();

  return shuffle(usersList).slice(0, SIZE);
};
