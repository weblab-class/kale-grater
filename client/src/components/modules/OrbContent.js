import { navigate } from "@reach/router";
import React, { Component } from "react";

import "./OrbContent.css";

/*
 * Proptypes
 * @param {string} creator_id ObjectId of author
 * @param {string} emotion of memory
 * @param {string} content of memory
 * @param {date} timestamp of memory
 */


class OrbContent extends Component {
  constructor(props) {
    super(props);
  }

  deleteMemory = () => {
    post("/api/deletememory", body).then(() => {
      navigate("/shelves");
    });
  };
  

  render() {
    const dateString = this.props.timestamp;
    const currentDate = new Date(dateString);
    const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    
    return (
      <>
      <div className="orbContent-container">
        <div className="orbContent-date">{officialDate}</div>
        <div className="orbContent-text">{this.props.content}</div>
        <div className="orbContent-buttons">
          <div className="orbContent-delete">
            <button onClick={this.deleteMemory}>Delete</button>
          </div>
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
