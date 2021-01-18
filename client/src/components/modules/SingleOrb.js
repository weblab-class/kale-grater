import React, { Component } from "react";
import SingleOrb from "./SingleOrb.js";

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
     }

    render () {
        return (
            <div>
              <OrbContent
                creator_id={this.props.creator_id}
                emotion={this.props.emotion}
                content={this.props.content}
                timestamp = {this.props.timestamp}
              />
            </div>
          );
    }
 }