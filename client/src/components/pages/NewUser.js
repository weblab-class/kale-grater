/** Box for creating new username
 * add to MongoDB
 * route to HomePage
 */

import React, {Component} from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {navigate} from "@reach/router"

import "../../utilities.css";
import "./NewUser.css";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
    handleSubmit = (event) => {
        event.preventDefault();

        let usernameTaken = true; // hardcoded for now

        // need to define function usernameTaken RIP
        if (usernameTaken) {

            // how to incorporate css??
            // <div>Sorry, username taken. Try again.</div>
            
            navigate("/newuser")
        } else {
            const newUser = {userId: this.props.userId, userName: event};
            // redirect = "/home";
            navigate("/home")
        }

        // console.log('well it got here');      
        // navigate(redirect);

    }
    render() {
        return (
            <div>
                <h1 class="Welcome-container">Welcome new user! Please make a username: </h1>
                <div class="UsernameInput-container" value="">
                    <input ></input>
                </div>
                <div class="Button-container">
                    <button type="submit" class="submitButton-Container" onClick={this.handleSubmit}>
                        Submit!
                    </button>
                </div>
            </div>

        )
        
    }
}
export default NewUser;