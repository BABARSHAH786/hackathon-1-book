// src/auth.js

export const isLoggedIn = () => {
  return localStorage.getItem("userLoggedIn") === "true";
};

export const loginUser = () => {
  localStorage.setItem("userLoggedIn", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("userLoggedIn");
};




