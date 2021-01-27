import React, { Component } from "react";
import OrbContent from "./OrbContent.js";
import MultiOrbContent from "./MultiOrbContent.js";

import "./MultiOrb.css";


//do conditional rendering of OrbContent here

/*
 * Proptypes
 * @param {string} creator_id ObjectId of author
 * @param {string} emotion of memory
 * @param {string} content of memory
 * @param {date} timestamp of memory
 */

 class MultiOrb extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showContent: false,
        }
    }
    
    handleClick = () => {
      if (this.state.showContent === false) {
        this.setState({
          showContent: true,
        });   
      } else {
        this.setState({
          showContent: false,
        });
      };
    };

    render () {
        // console.log('classname', this.props.className)
        return (
            // <>
            <div className="MultiOrb-Container">
            <div className="MultiOrb-weekContainer">
              <h2 className="MultiOrb-week">{this.props.day}</h2>
              <h3 className="MultiOrb-date">{this.props.date}</h3>
            </div> 
            {this.state.showContent && this.props.view === "self" ?
            <MultiOrbContent 
              content={this.props.content}
              emotions={this.props.emotions}
              handleClick={this.handleClick.bind(this)}
            /> :
            <>
            {/* <div className="MultiOrb-weekContainer">
              <div className="MultiOrb-week">{this.props.day}</div>
              <div className="MultiOrb-date">{this.props.date}</div>
            </div>  */}
              <figure className={this.props.className} onClick={this.handleClick}>
                <span className="MultiOrb-shadow"></span>
              </figure>
              </>}
              </div>
            // </>
          );
    }
 }

 export default MultiOrb;