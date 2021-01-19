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
        <a href="/shelves">Cancel</a>
      </div>
      </>
    );
  }
}

export default OrbContent;
