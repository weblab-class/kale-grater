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
 */


class OrbContent extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    // const dateString = this.props.timestamp;
    // const currentDate = new Date(dateString);
    // const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    console.log('CONTENT', this.props.content)
    return (
      <>
      <div className="orbContent-container">
        <div>MEMORIES:</div>
        <div className="orbContent-text">{this.props.content.map((item) => (
            <div>{item}</div>
        ))}</div>
        <div className="orbContent-buttons">
          {/* <div className="orbContent-delete">
            <button onClick={() => this.props.deleteMemory(this.props.object)}>Delete</button>
          </div> */}
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