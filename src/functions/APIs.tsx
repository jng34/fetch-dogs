import { baseURI } from "../constants/Constants"
import { Login } from "../types/Types";

// GET method
export const fetchGET = (uri: string) => {
  return fetch(uri, {
    method: "GET",
    credentials: "include",
    headers: { "Content-type": "application/json" },
  })
};

// POST method
export const fetchPOST = (endPt: string, bodyInput?: Login | string[] | undefined) => {
  return fetch(baseURI + endPt, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bodyInput),
  })
};