import React, {Component} from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import NewMemory from "../modules/NewMemory.js";
import {Link} from "@reach/router";

import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        document.title = "Inside Out";
    }

    render() {
        return (
            <>
                <div className="HomePage-outer">
                    <div className="HomePage-ball">
                        <span className="HomePage-shadow"></span>
                    </div>
                </div>

                <div className="HomePage-textContainer">
                    <h1 className="HomePage-header">Welcome to our Prototype!</h1>
                    <div className="HomePage-description">We tag ourselves in photos and comments nearly everyday, but how often do we take the time to tag and reflect on our emotions?</div>
                    <div className="HomePage-description">Joy, sadness, anger, fear, disgust... without one we wouldn't know the feeling of the others. They're all worth celebrating. </div>
                    <div className="HomePage-description">The premise of our project allows you to tag, quantify, and archive your emotions in the form of memory orbs so you'll never forget them.</div>
                    <button className="HomePage-button">
                        <Link to="/newmemory" className="NewMemory-link">
                            Get Started!
                        </Link>
                    </button>
                </div>
                <div className="HomePage-updates">Features in the works! Rolling orbs onto a memory shelf, long-term memory shelf, social component, attach images, randomized and custom-made memory collections, islands of personality, etc.</div>
            </>
        )
    }
}
export default HomePage;