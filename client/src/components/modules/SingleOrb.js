import React, { Component } from "react";
import OrbContent from "./OrbContent.js";

import "./SingleOrb.css";


//do conditional rendering of OrbContent here

/*
 * Proptypes
 * @param {string} creator_id ObjectId of author
 * @param {string} emotion of memory
 * @param {string} content of memory
 * @param {date} timestamp of memory
 */

 class SingleOrb extends Component {
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
        const orbColor = "SingleOrb-" + this.props.emotion;
        return (
            <div onClick={this.handleClick}>
              {this.state.showContent
                ? <OrbContent
                  creator_id={this.props.creator_id}
                  emotion={this.props.emotion}
                  content={this.props.content}
                  timestamp = {this.props.timestamp}
                  handleClick={this.handleClick.bind(this)}
                  />
                : <figure className={`${orbColor} SingleOrb-ball`}>
                    <span className="SingleOrb-shadow"></span>
                  </figure>
              }
            </div>
          );
    }
 }

 export default SingleOrb;