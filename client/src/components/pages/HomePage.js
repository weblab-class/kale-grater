import React, {Component} from "react";
import NewMemory from "../modules/NewMemory.js";
import {get} from "../../utilities.js";
import {navigate} from "@reach/router";
import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // create reference for onClick scroll
        this.divToNew = React.createRef()
    }

    componentDidMount() {
        document.title = "Home | Outside In";
        
        // get("/api/getusername", {userId: this.props.userId}).then((result) => {
        //     this.setState({
        //         username: result.username
        //     })
        // })
    }

    handleOnClick = (event) => {
        if (this.divToNew) {
            this.divToNew.current.scrollIntoView({
                alignToTop: true,
                behavior: "smooth",
                block: "nearest"
            })
        }
    }

    render() {
        // if (!this.state.username) {
        if (!this.props.username) {
            navigate("/newuser")
        }
        return (
            <>
            <div id="HomePage-wrap">
                <div className="HomePage-block">
                    <div className="HomePage-outer">
                        <div className="HomePage-ball">
                            <span className="HomePage-shadow"></span>
                        </div>
                    </div>

                    <div className="HomePage-textContainer">
                        <h1 className="HomePage-header">Welcome {this.props.username}!</h1>
                        <div className="HomePage-description">We tag ourselves in photos and comments nearly everyday, but how often do we take the time to tag and reflect on our emotions?</div>
                        <div className="HomePage-description">Joy, sadness, anger, fear, disgust... without one we wouldn't know the feeling of the others. They're all worth celebrating. </div>
                        <div className="HomePage-description">The premise of our project allows you to tag, quantify, and archive your emotions in the form of memory orbs so you'll never forget them.</div>
                        <button onClick={this.handleOnClick} className="HomePage-button">Get Started!</button>
                    </div>
                </div>
                
                <div ref={this.divToNew} className="HomePage-memory">
                    <h1>Add a Memory</h1>
                    <div className="HomePage-description"><NewMemory userId={this.props.userId}></NewMemory></div>
                </div>
            </div>
            </>
        )
    }
}
export default HomePage;