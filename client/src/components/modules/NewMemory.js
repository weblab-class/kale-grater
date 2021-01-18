import React, { Component } from "react";

import "../../utilities.css";
import "./NewMemory.css";
import clearOrb from "../../../img/clear_orb.png";

class NewMemory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasEntry: false,
            hasEmotion: false
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
        addMemory = (value) => {
            const orb = {
                userId: this.props.userId,
                content: value
            }
            post("/api/newmemory", orb).then()
        }
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
                                    <div onClick={() => {console.log('joy')}}></div>
                                    <div onClick={() => {console.log('sadness')}}></div>
                                    <div onClick={() => {console.log('anger')}}></div>
                                    <div onClick={() => {console.log('fear')}}></div>
                                    <div onClick={() => {console.log('disgust')}}></div>
                            </div>
                            <div className="NewMemory-box">
                                <h3>Tell us about your memory :</h3>
                                    <h4>
                                        <textarea name="description" rows="10" cols="60" id="txtArea"></textarea>
                                    </h4>
                            </div>
                            {/* POPULATE HREF WITH LINK TO REDIRECT TO */}
                            <a href="" onClick={() => {console.log(document.getElementById("txtArea").value)}}>Add Memory</a>
                            <a href="/home">Cancel</a>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    };
}

export default NewMemory;