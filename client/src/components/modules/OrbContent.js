import { navigate } from "@reach/router";
import React, { Component } from "react";
import { post } from "../../utilities";
import Logo from "../../../img/small_clear_orb.png";

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
    // const currentDate = new Date(dateString);
    const officialDate = dateString.substring(5, 10) + "-" + dateString.substring(0, 4)
    // const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    // const officialDate = resultMonth + "-" + current_result.getDate() + "-" + current_result.getFullYear();
    
    const currentDate = new Date(dateString);
    // const officialDate = (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();

    return (
      <>
      <div className="orbContent-container">
        <div className="orbContent-date">{officialDate}</div>
        <div className="orbContent-content">
          <div className="orbContent-text">{this.props.content}</div>  
          <div className="orbContent-images">
            { this.props.image !== ""
            ? 
              // this.props.image.map((image, index) => (
                <img src={this.props.image} className="Resize-image"/>
              // ))
            : <>
                <img src={ Logo } />
                <div className="NoImage-text">No Image</div>
              </>
            }
          </div>
        </div>
       
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
