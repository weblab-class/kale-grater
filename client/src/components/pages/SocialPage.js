import React, { Component } from "react";
import { post, get } from "../../utilities";

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
    document.title = "Social | Outside In";
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
        if (result.message === "failure") {
          this.setState({
            error: "Sorry, we couldn't find that user"
          });
        } else {
          this.setState({
            success: "We found that user!",
            friend: result.username
          });
        };
      });
    };
  };

  addFriend = () => {
    // this.setState({
    //   friends: [this.state.friendId].concat(this.state.friends)
    // });
    const body = {
      username: this.state.friend
    }
    console.log('BODY', body);
    post("/api/addfriend", body).then((result) => {
      this.setState({
        friends: result.friends,
        friend: ""
      })
    })
  }


  render() {
    // console.log(this.state);
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
        <div className="Text-message">{this.state.friends}</div>
      </div>
        
    </>
    );
  };
};

export default SocialPage;
