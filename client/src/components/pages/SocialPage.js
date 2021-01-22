import React, { Component } from "react";
import { post, get } from "../../utilities";

import "./SocialPage.css";

class SocialPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: "",
      success: "",
      friends: [],
    }
  }

  componentDidMount() {
    get("/api/friends", { creator_id: this.props.userId}).then((friendObjs) => {
      // let reversedStoryObjs = plantObjs.reverse();
      friendObjs.map((friendObj) => {
        this.setState({ friends: this.state.friends.concat([friendObj])});
      });
    });
  };

  handleChange = (event) => {
    this.setState({
        value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    console.log('IN SUBMIT');
    event.preventDefault();
    const body = {username: this.state.value};
    if (body.username === "") {
      this.setState({
        error: "Please search for a user",
      });
    } else {
      post("/api/social", body).then((result) => {
        if (result.message === "success") {
          this.setState({
            success: "We found that user!",
            friendId: result.userFriendId
          });
        } else {
          this.setState({
            error: result.message,
          });
        };
      });
    };
  };

  addFriend = () => {
    this.setState({
      friends: [this.state.friendId].concat(this.state.friends)
    });
  }


  render() {
    console.log(this.state);
    return (
    <>
      <div>
        <div className="Search-message">Search for a user here:</div>   
        <input className="Search-container" value={this.state.value} onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>Search</button>
        {this.state.error ? <div className="Text-message">{this.state.error}</div> : null}
      </div>
      <div>
        {this.state.success ? 
        <>
          <div className="Text-message">{this.state.success}</div>
          <button onClick={this.addFriend}>Add {this.state.value}</button>
        </>
         : null}
      </div>

      <div>
        <div className="Text-message">Your Friends:</div>
        <div className="Text-message">{this.state.friends}</div>
      </div>
        
    </>
    );
  };
};

export default SocialPage;
