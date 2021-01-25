import React, { Component } from "react";

import "../../utilities.css";
import "./NewMemory.css";
import clearOrb from "../../../img/clear_orb.png";

import {post} from "../../utilities.js";
import {navigate} from "@reach/router";

class NewMemory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            emotion: "",
            privacy: ""
        };

        // ignore rn
        // this.state = {
        //     creator_id=this.props.creator_id,
        //     emotion=null,
        //     content=this.props.content,
        //     timestamp = this.props.timestamp
        // };
    };

    componentDidMount() {
        // remember -- api calls go here!
      }
    
    // to do...
    handleSubmit = (event) => {
        event.preventDefault();
        const orb = {
            userId: this.props.userId,
            content: this.state.content,
            emotion: this.state.emotion,
            privacy: this.state.privacy
        }

        if (orb.content === "" || orb.emotion === "" || orb.privacy === "") {
            return alert("Please fill out memory, emotion, AND privacy!");
        } else {
            post("/api/newmemory", orb).then(() => {
                navigate("/home");
            });
        }};

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleColorChange = (value) => {
        this.setState({emotion: value});
        const colorClasses = [".Highlightjoy-container", 
        ".Highlightsadness-container",
        ".Highlightanger-container",
        ".Highlightfear-container",
        ".Highlightdisgust-container"]
        console.log('INFUNC');
        const highlightEmotion = ".Highlight" + value + "-container";
        console.log(highlightEmotion);
        for (let i = 0; i < 5; i ++) {
            if (colorClasses[i] === highlightEmotion) {  
                const select = document.querySelector(highlightEmotion);
                console.log('SELECT', select)
                select.style.boxShadow = "0 0 3pt 2pt white";
            } else {
                const notSelect = document.querySelector(colorClasses[i]);
                console.log('NOT SELECT', notSelect)
                notSelect.style.boxShadow = "none";
            }

        }
    }

    setPrivacy = (value) => {
        this.setState({
            privacy: value
        })
    }

    render() {
        return (
            <>
            <section>
                <div className="NewMemory-container">
                    <div className="NewMemory-card">
                        {/* <div className="NewMemory-imgBx">
                            <img src={clearOrb}></img>
                        </div> */}
                        <div className="NewMemory-contentBx">
                            <h2>Memory Orb</h2>
                            <div className="NewMemory-color">
                                <h3>Emotion :</h3>
                                    {/* <div onClick={() => {this.setState({emotion: 'joy'})}} className="Highlightjoy-container"></div>
                                    <div onClick={() => {this.setState({emotion: 'sadness'})}} className="Highlightsadness-container"></div>
                                    <div onClick={() => {this.setState({emotion: 'anger'})}} className="Highlightanger-container"></div>
                                    <div onClick={() => {this.setState({emotion: 'fear'})}} className="Highlightfear-container"></div>
                                    <div onClick={() => {this.setState({emotion: 'disgust'})}} className="Highlightdisgust-container"></div> */}
                                    <div onClick={() => {this.handleColorChange('joy')}} className="Highlightjoy-container"></div>
                                    <div onClick={() => {this.handleColorChange('sadness')}} className="Highlightsadness-container"></div>
                                    <div onClick={() => {this.handleColorChange('anger')}} className="Highlightanger-container"></div>
                                    <div onClick={() => {this.handleColorChange('fear')}} className="Highlightfear-container"></div>
                                    <div onClick={() => {this.handleColorChange('disgust')}} className="Highlightdisgust-container"></div>
                            </div>
                            <div className="NewMemory-box">
                                <h3>Tell us about your memory :</h3>
                                    <h4>
                                        <textarea name="description" rows="10" cols="60" id="txtArea" onChange={this.handleChange}></textarea>
                                    </h4>
                            </div>
                            <div className="dropdown">
                            <button className="dropbtn">Privacy Option</button>
                            <div className="dropdown-content">
                                <a href="#" onClick={() => this.setPrivacy('public')}>Public</a>
                                <a href="#" onClick={() => this.setPrivacy('semi-private')}>Semi-private: content hidden, orb color shown</a>
                                <a href="#" onClick={() => this.setPrivacy('private')}>Private: completely hidden</a>
                            </div>
                            <div className="NewMemory-box">{this.state.privacy}</div>
                            </div>
                            {/* POPULATE HREF WITH LINK TO REDIRECT TO */}
                            <div className="NewMemory-buttons">
                                <a href="/home" >Cancel</a>
                                <button onClick={this.handleSubmit}>Add Memory</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    };
}

export default NewMemory;