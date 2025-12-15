import React from "react";

export default function ProtectedRoute({ children }) {
  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("userLoggedIn") === "true";

  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/signup";
    }
    return null;
  }

  return children;
}
