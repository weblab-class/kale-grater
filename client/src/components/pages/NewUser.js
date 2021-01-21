/** Box for creating new username
 * add to MongoDB
 * route to HomePage
 */

import React, {Component} from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {navigate} from "@reach/router"

import "../../utilities.css";
import { post } from "../../utilities";
import "./NewUser.css";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: ""
        };
    }

    componentDidMount() {

    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('IN SUBMIT');
        const body = {username: this.state.value};
        if (body.username === "") {
            alert("Please make a username!")
        } else {
            console.log('B4POST', body);
            post("/api/newuser", body).then((result) => {
                console.log(result);
                if (result.message === "success") {
                    navigate("/home");
                } else {
                    this.setState({
                        error: result.message
                    })
                }
            });
            };            
        };
    
    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <h1 class="Welcome-container">Welcome new user! Please make a username: </h1>
                <div class="UsernameInput-container" value="">
                    <input value={this.state.value} onChange={this.handleChange}></input>
                    {this.state.error ? <div>{this.state.error}</div> : null}
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