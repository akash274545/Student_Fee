import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import App from "./App";

function Main() {
  const [page, setPage] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (page === "login") {
    return <Login goRegister={() => setPage("register")} onLogin={(user) => {
      setLoggedInUser(user);
      setPage("dashboard");
    }} />;
  }

  if (page === "register") {
    return <Register goLogin={() => setPage("login")} />;
  }

  if (page === "dashboard") {
  return <App user={loggedInUser} onLogout={() => {
    setLoggedInUser(null);
    setPage("login");
  }} />;
}


}

export default Main;
