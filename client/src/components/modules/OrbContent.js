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

  render() {
    const dateString = this.props.timestamp;
    const currentDate = new Date(dateString);
    const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    
    return (
      <>
      <div className="orbContent-container">
        <div className="orbContent-date">{officialDate}</div>
        <div className="orbContent-text">{this.props.content}</div>
        <button onClick={this.props.handleClick}>Cancel</button>
      </div>
      </>
    );
  }
}

export default OrbContent;
