import React, { Component } from "react";

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
      <div>
        <span>{this.props.creator_id}</span>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default OrbContent;
