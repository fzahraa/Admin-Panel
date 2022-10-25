import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/Users";


const App = () => {
  return (
    <>
      <Users></Users>
      <ToastContainer style={{fontSize: "1.3rem"}}></ToastContainer>
    </>
  );
}

export default App;
