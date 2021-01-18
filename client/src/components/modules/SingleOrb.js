import React, { Component } from "react";
import OrbContent from "./Orbcontent.js";

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
      this.setState({
        showContent: true,
      });
    }

    render () {
        return (
            <div onClick={this.handleClick}>
              {this.state.showContent
                ? <OrbContent
                  creator_id={this.props.creator_id}
                  emotion={this.props.emotion}
                  content={this.props.content}
                  timestamp = {this.props.timestamp}
                  />
                : <section className="SingleOrb-stage">
                    <figure className="SingleOrb-ball">
                      <span className="SingleOrb-shadow"></span>
                    </figure>
                  </section>
              }
            </div>
          );
    }
 }

 export default SingleOrb;