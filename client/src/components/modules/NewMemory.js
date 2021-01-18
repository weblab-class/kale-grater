import React, { Component } from "react";

import "../../utilities.css";
import "./NewMemory.css";
import clearOrb from "../../../img/clear_orb.png";

import {post} from "../../utilities.js";

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
        console.log("IN FUNC");
        event.preventDefault();
        const orb = {
            userId: this.props.userId,
            content: this.state.content,
            emotion: this.state.emotion
        }
        console.log(orb);
        post("/api/newmemory", orb).then((result) => {
            console.log(result);
        })
        }
    

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    // setEmotion((emotion) => {
    //     this.setState({
    //         creator_id=this.state.creator_id,
    //         emotion=emotion,
    //         content=this.state.content,
    //         timestamp = this.state.timestamp
    //     })
    // })
    render() {
        return (
            <>
            <section>
                <div className="NewMemory-container">
                    <div className="NewMemory-card">
                        <div className="NewMemory-imgBx">
                            <img src={clearOrb}></img>
                        </div>
                        <div className="NewMemory-contentBx">
                            <h2>Memory Orb</h2>
                            <div className="NewMemory-color">
                                <h3>Emotion :</h3>
                                    <div onClick={() => {this.setState({emotion: 'joy'})}}></div>
                                    <div onClick={() => {this.setState({emotion: 'sadness'})}}></div>
                                    <div onClick={() => {this.setState({emotion: 'anger'})}}></div>
                                    <div onClick={() => {this.setState({emotion: 'fear'})}}></div>
                                    <div onClick={() => {this.setState({emotion: 'disgust'})}}></div>
                            </div>
                            <div className="NewMemory-box">
                                <h3>Tell us about your memory :</h3>
                                    <h4>
                                        <textarea name="description" rows="10" cols="60" id="txtArea" onChange={this.handleChange}></textarea>
                                    </h4>
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