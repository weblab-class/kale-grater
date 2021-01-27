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
            privacy: "",
            toUpload: "",
            image: "",
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
    
    // image handling
    

    uploadImage = (event) => {
    const fileInput = event.target;
    console.log(fileInput);
    this.readImage(fileInput.files[0]).then(image => {
      fileInput.value = null;
      return post("/api/uploadImage", { image: image }).then(this.loadImages); // take out load??
    }).catch(err => {
      console.log(err);
    });
  };

    readImage = (event) => {
        this.setState({
            message: ""
        })
        const blob = event.target.files[0];
        return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onloadend = () => {
            if (r.error) {
            reject(r.error.message);s
            return;
            } else if (r.result.length < 50) {
            // too short. probably just failed to read, or ridiculously small image
            reject("small image? or truncated response");
            return;
            } else if (!r.result.startsWith("data:image/")) {
            reject("not an image!");
            return;
            } else {
            resolve(r.result);
            }
        };
        r.readAsDataURL(blob);
        }).then((image) => this.setState({  
            toUpload: image
            }));
    };

    
    // memory submission 

    handleSubmit = (event) => {
        event.preventDefault();
        const orb = {
            userId: this.props.userId,
            content: this.state.content,
            emotion: this.state.emotion,
            privacy: this.state.privacy,
            image: this.state.toUpload, 
        }

        if (orb.content === "" || orb.emotion === "" || orb.privacy === "") {
            return alert("Please fill out memory, emotion, AND privacy!");
        } else {
            this.setState({
                message: ""
            })
            post("/api/newmemory", orb).then((result) => {
                navigate(`/shelves/${this.props.userId}`);
            }).catch((err) => {
                this.setState({
                    message: "Sorry, your image was too big to attach. Try attaching a smaller image or press Cancel and start a new orb!"
                })
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
                                    <hr className="NewMemory-line"></hr>
                                    <textarea 
                                    className="NewMemory-textArea"  
                                    placeholder="Tell us about your memory!"
                                    rows="5" cols="50" 
                                    onChange={this.handleChange}></textarea>
                                    <hr className="NewMemory-line"></hr>
                                
                                <div className="NewMemory-options">
                                    <div className="image-upload">
                                        <label for="fileInput">
                                            <img src="https://img.icons8.com/plasticine/50/000000/image.png"/>
                                        </label>        

                                            <input className="NewMemory-attach" id="fileInput" type="file" name="files[]" accept="image/*" onChange={this.readImage} />
                                        {this.state.message ? <div>{this.state.message}</div> : null}
                                    </div>
                                    
                                    <div className="dropdown">
                                    <button className="dropbtn">Privacy Option &nbsp;↓</button>
                                    <div className="dropdown-content">
                                        <a href="#" className="dropdown-setting" onClick={() => this.setPrivacy('public')}>Public</a>
                                        {/* <p className="dropdown-description"> *orb, content visible</p> */}
                                        <a href="#" className="dropdown-setting" onClick={() => this.setPrivacy('private')}>Private</a>
                                        {/* <p className="dropdown-description"> *completely hidden</p> */}
                                    </div>
                                    <div className="NewMemory-box">{this.state.privacy}</div>
                                    </div>
                                    <button className="createOrb" onClick={this.handleSubmit}>Create Orb!</button> 
                                </div>

                            </div>
                            <a className="cancel-memory" id="cancelMemory" href="/home" >X</a>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    };
}

export default NewMemory;