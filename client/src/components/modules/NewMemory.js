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
    }

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
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                            </div>
                            <div className="NewMemory-box">
                                <h3>Tell us about your memory :</h3>
                                    <h4>
                                        <textarea name="description" rows="10" cols="60"></textarea>
                                    </h4>
                            </div>
                            {/* POPULATE HREF WITH LINK TO REDIRECT TO */}
                            <a href="#">Add Memory</a>
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