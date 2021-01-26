import React, { Component } from "react";
import OrbContent from "./OrbContent.js";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
          privacy: this.props.privacy
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
          <>
          {this.props.privacy === "private" && this.props.view !== "self" ? null :
        // return (
            <div className="SingleOrb-container" onClick={this.handleClick}>
              {this.state.showContent && (this.state.privacy === "public" || !this.state.privacy || this.props.view === "self") ? 
              // <ReactCSSTransitionGroup
              //   transitionName="fade"
              //   transitionAppear={true}
              //   transitionLeave={true}
              //   transitionEnterTimeout={500}
              //   transitionLeaveTimeout={300}
              //   transitionAppearTimeout={200}
              //   >
                <OrbContent
                  _id={this.props._id}
                  creator_id={this.props.creator_id}
                  emotion={this.props.emotion}
                  content={this.props.content}
                  timestamp = {this.props.timestamp}
                  privacy={this.props.privacy}
                  handleClick={this.handleClick.bind(this)}
                  deleteMemory={this.props.delete}
                  object={this.props.object}
                  />
                  // </ReactCSSTransitionGroup>
                : <figure className={`${orbColor} SingleOrb-ball`}>
                    <span className="SingleOrb-shadow"></span>
                  </figure>
              }
            </div>}
            </>)
          // );
    }
 }

 export default SingleOrb;