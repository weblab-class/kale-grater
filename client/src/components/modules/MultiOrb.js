import React, { Component } from "react";
import OrbContent from "./OrbContent.js";

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
        console.log('classname', this.props.className)
        return (
            <>
            <div className="MultiOrb-week">{this.props.day}</div>
              <figure className={this.props.className}>
                <span className="MultiOrb-shadow"></span>
              </figure>
            </>
          );
    }
 }

 export default MultiOrb;