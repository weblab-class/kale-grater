import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import NewUser from "./pages/NewUser.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      userName: undefined
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id }, () => {
        if (this.state.userName !== undefined) {
          navigate("/home")
        } else {
          navigate("/newuser")
        }
      });
      })
    };


  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Router>
          <LoginPage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId} />
          <HomePage
            path="/home"
            userId={this.state.userId} />
          <NewUser
            path="/newuser"
            userId={this.state.userId}
            userName={this.state.userName} />
          <NotFound default />
        </Router>

      </>
    );
  }
}

export default App;
