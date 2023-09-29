import React, { Component } from "react";
import Myeditor from "./Components/Myeditor";
import Navbar from "./Components/Navbar";
import "./App.css";
// import Login from "./Components/Login";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Myeditor />
        {/* <Login /> */}
      </>
    );
  }
}
