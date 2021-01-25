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
            emotion: this.state.emotion
        }

        if (orb.content === "" || orb.emotion === "") {
            return alert("Please fill out memory AND emotion!");
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
                            {/* <h2>Memory Orb</h2> */}
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
                                    <textarea 
                                    name="description"
                                    id="txtArea"  
                                    placeholder="Tell us about your memory!"
                                    rows="10" cols="60" 
                                    onChange={this.handleChange}></textarea>
                                <div>                                  
                                    <input id="fileInput" type="file" name="files[]" accept="image/*" onChange={this.uploadImage} />
                                </div>  
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