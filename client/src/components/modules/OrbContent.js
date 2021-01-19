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
      // <section>
      //   <div className="NewMemory-card">
      //     <div className="NewMemory-contentBx">
      //       <h2>{this.props.content}</h2>
      //       <div className="NewMemory-buttons">
      //         <a href="/shelves">Cancel</a>
      //       </div>
      //     </div>
      //   </div>
      // </section>
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
