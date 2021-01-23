import React, { Component } from "react";
import { post, get } from "../../utilities";
import ShelfPage from "./ShelfPage.js";
import {navigate, Link} from "@reach/router";

import "./SocialPage.css";

class SocialPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: "",
      error: "",
      success: "",
      friends: [],
    }
  }

  componentDidMount() {
    get("/api/friends", ).then((result) => {
      // let reversedStoryObjs = plantObjs.reverse();
      // friends = result.friends
      this.setState({friends: result.friends})
      // friendObjs.map((friendObj) => {
      //   this.setState({ friends: this.state.friends.concat([friendObj])});
      // });
    });
  };

  handleChange = (event) => {
    if (this.state.error || this.state.success) {
      this.setState({
        error: "",
        success: "",
        friend: ""
      })
    }
    this.setState({
        friend: event.target.value,
    });
  };

  handleSubmit = (event) => {
    console.log('IN SUBMIT');
    event.preventDefault();
    const body = {username: this.state.friend};
    if (body.username === "") {
      this.setState({
        error: "Please search for a user",
      });
    } else {
      post("/api/social", body).then((result) => {
        console.log('result', result);
        if (result.message === "failure") {
          this.setState({
            error: "Sorry, we couldn't find that user"
          });
        } else if (result.message === "already friended") {
          this.setState({
            error: "um you're already friends with this person"
          })
        } else if (result.message === "self") {
          this.setState({
            error: "that's your own username"
          })
        } else {
          this.setState({
            success: "We found that user!",
            friend: result.username
          });
        };
      });
    };
  };
  handleClick = (friend) => {
    console.log('in click');
    const body = {username: friend}
    post("/api/social/shelves", body).then((user) => {
      console.log('USER', user);
      navigate("/shelves");
    })
  }

  addFriend = () => {
    // this.setState({
    //   friends: [this.state.friendId].concat(this.state.friends)
    // });
    const body = {
      username: this.state.friend
    }
    // console.log('BODY', body);
    post("/api/addfriend", body).then((result) => {
      this.setState({
        friends: result.friends,
        friend: ""
      })
    })
  }

  
  render() {
    return (
    <>
      <div>
        <div className="Search-message">Search for a user here:</div>   
        <input className="Search-container" value={this.state.friend} onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>Search</button>
        {this.state.error ? <div className="Text-message">{this.state.error}</div> : null}
      </div>
      <div>
        {this.state.success ? 
        <>
          <div className="Text-message">{this.state.success}</div>
          <button onClick={this.addFriend}>Add {this.state.friend}</button>
        </>
         : null}
      </div>

      <div>
        <div className="Text-message">Your Friends:</div>
        {this.state.friends.map(friend => (
          <div className="Text-message">
            {/* <button onClick={() => {this.handleClick(friend)}}>{friend}</button> */}
            <Link to={`/shelves/${friend}`} username={friend}>{friend}</Link>
          </div>))};
      </div>  
    </>
    );
  };
};

export default SocialPage;
