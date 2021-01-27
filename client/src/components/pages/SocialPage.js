import React, { Component } from "react";
import { post, get } from "../../utilities";
import ShelfPage from "./ShelfPage.js";
import {navigate, Link} from "@reach/router";
import Particles from 'react-particles-js';

import "./SocialPage.css";

class SocialPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: "",
      error: "",
      success: "",
      friends: [],
      loaded: "",
    }
  }

  componentDidMount() {
    get("/api/friends", ).then((result) => {
      this.setState({friends: result.friends})
    });

    get("/api/checkusername").then((result) => {
      if (result.message === "no username") {
        navigate("/newuser")
      }
     this.setState({
       loaded: "true"
     }) 
    })
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
            error: "Sorry, we couldn't find that user!"
          });
        } else if (result.message === "already friended") {
          this.setState({
            error: "You're already friends with this person!"
          })
        } else if (result.message === "self") {
          this.setState({
            error: "That's your own username!"
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
    // console.log('in click');
    const body = {username: friend}
    console.log('body', body);
    post("/api/social/shelves", body).then((user) => {
      console.log('USER', user);
      console.log(`/shelves/${user.friend._id}`);
      navigate(`/shelves/${user.friend._id}`);
      // return user.friend.creator_id
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
        friend: "",
        success: ""
      })
    })
  }

  
  render() {
    if (!this.props.username) {
      navigate("/newuser")
  }
    if (!this.state.loaded) {
      return <div>Loading!</div>
    }
    return (
    <>
    <div>
    <div id="particles-js">
     <Particles 
    params={{
	    "particles": {
	        "number": {
	            "value": 90,
	            "density": {
	                "enable": true,
	                "value_area": 1500
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.02
	        },
	        "move": {
	            "direction": "right",
	            "speed": 0.05
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
	            }
	        }
	    },
	    "retina_detect": true
	}}/>
    </div>
    <div className="SocialPage-body">
      <div className="flex-child a">
      <div>
        <p className="Search-message">Search for a User Here:</p>   
        <input className="Search-container" value={this.state.friend} onChange={this.handleChange}></input>
        <button className="Search-popup" onClick={this.handleSubmit}>Search</button>
        {this.state.error ? <div className="Text-message">{this.state.error}</div> : null}
      </div>
      <div>
        {this.state.success ? 
        <>
          <div className="Text-message">{this.state.success}</div>
          <button className="Search-popup" onClick={this.addFriend}>Add {this.state.friend}</button>
        </>
         : null}
      </div>

      <div>
        <p className="Text-message">Your Friends:</p>
        {this.state.friends.map(friend => (
          <div className="Text-message">
            <button className="SocialPage-friends" onClick={() => {this.handleClick(friend)}}>{friend}</button>
          </div>))}
      </div>  
      </div>
    
      
      <div className="flex-child b">Welcome to the social page! Here, you can search for users by their username
      and add them to your list of friends seen on the left. Click on a friend's name to visit their shelves and see
      their orbs. Enjoy!</div>
    </div>
    </div>
    </>
    );
  };
};

export default SocialPage;
