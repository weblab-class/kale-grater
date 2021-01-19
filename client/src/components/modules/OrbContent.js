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
    return (
      <>
      <div className="orbContent-container">
        <div className="orbContent-text">{this.props.content}</div>
        <button onClick={this.props.handleClick}>Cancel</button>
      </div>
      </>
    );
  }
}

export default OrbContent;
