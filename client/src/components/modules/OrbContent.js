import { navigate } from "@reach/router";
import React, { Component } from "react";
import { post } from "../../utilities";

import "./OrbContent.css";

/*
 * Proptypes
 * @param {string} creator_id ObjectId of author
 * @param {string} emotion of memory
 * @param {string} content of memory
 * @param {date} timestamp of memory
 * @param {function} delete memory function 
 * @param {} entire orb object lol 
 */


class OrbContent extends Component {
  constructor(props) {
    super(props);
  }
  


  render() {
    const dateString = this.props.timestamp;
    const currentDate = new Date(dateString);
    const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    
    return (
      <>
      <div className="orbContent-container">
        <div className="orbContent-date">{officialDate}</div>
        <div className="orbContent-text">{this.props.content}</div>
        {/* <div> {this.props.loadImage}
          <div className="orbContent-images">
            {
              this.state.images.map((image, index) => (
                <img src={image} key={index} />
              ))
            }
          </div>
        </div> */}
        <div className="orbContent-buttons">
          {this.props.view === "self" ?
          <div className="orbContent-delete">
            <button onClick={() => this.props.deleteMemory(this.props.object)}>Delete</button>
          </div> : null}
          <div className="orbContent-cancel">
            <button onClick={this.props.handleClick}>Cancel</button>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default OrbContent;
