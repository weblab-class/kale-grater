import React, { Component } from "react";
import { Router, navigate, Match } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import NavBar from "./modules/NavBar.js";
import ShelfPage from "./pages/ShelfPage.js";
import NewMemory from "./modules/NewMemory.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import "./App.css";

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
        navigate("/home")
      });
      })
    };


  handleLogout = () => {
    this.setState({ userId: undefined });
    navigate("/")
    post("/api/logout");
  };

  render() {
    // const Match = () => {
    // console.log('HI');
    // return (<Match path="/">
    //     {props => 
    //     props.match && !this.state.userId ? (
    //       <>
    //       <LoginPage
    //         path="/"
    //         handleLogin={this.handleLogin}
    //         handleLogout={this.handleLogout}
    //         userId={this.state.userId} />
        
    //       </>
        // ) : (
    console.log("CONFUSION");
    return this.state.userId ? (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
          <Router>
            <LoginPage
              path="/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId} />
            <HomePage path="/home" userId={this.state.userId}  />
            <ShelfPage path="/shelves" userId={this.state.userId} />
            <NewMemory path="/newmemory" userId={this.state.userId} />
            <NotFound default />
          </Router>
        </div>
      </>) : (
      <>
        <div className="App-container">
          <Router>
            <LoginPage 
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              default />
          </Router>
        </div>
      </>)
      };
      // </Match>
    // )};
  };
    // return (
    //   <>
    //     <NavBar
    //       handleLogin={this.handleLogin}
    //       handleLogout={this.handleLogout}
    //       userId={this.state.userId}
    //     />
    //     <Router>

    //       <LoginPage
    //         path="/"
    //         handleLogin={this.handleLogin}
    //         handleLogout={this.handleLogout}
    //         userId={this.state.userId} />
    //       <HomePage
    //         path="/home"
    //         userId={this.state.userId}  />
    //       <ShelfPage
    //         path="/shelves"
    //         userId={this.state.userId} />

    //       <NotFound default />
    //     </Router>

    //   </>
//     );
//   }
// }

export default App;
