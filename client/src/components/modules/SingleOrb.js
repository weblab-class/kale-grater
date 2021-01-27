import React, { Component } from "react";
import OrbContent from "./OrbContent.js";
import { get } from "../../utilities";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./SingleOrb.css";


//do conditional rendering of OrbContent here

/*
 * Proptypes
 * @param {string} creator_id ObjectId of author
 * @param {string} emotion of memory
 * @param {string} content of memory
 * @param {date} timestamp of memory
 * @param {string} image of memory 
 */

 class SingleOrb extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showContent: false,
          privacy: this.props.privacy
          
        }
    }
    
    componentDidMount() {
      // remember -- api calls go here!
      if (this.props.userId) {
          this.loadImages();
      }
    }
  
    // image handling
  
    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId && this.props.userId) {
          // just logged in. reload images
          this.loadImages();
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

    loadImages = () => {
      get("/api/image").then(images => {
          this.setState({ images: images });
      });
      };

    render () {
        const orbColor = "SingleOrb-" + this.props.emotion;
        return (
          <>
          {this.props.privacy === "private" && this.props.view !== "self" ? null :
        // return (
            <div className="SingleOrb-container">
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
                  loadImage={this.props.loadImage}
                  image={this.props.image}
                  object={this.props.object}
                  view={this.props.view}
                  />
                  // </ReactCSSTransitionGroup>
                : <figure className={`${orbColor} SingleOrb-ball`} onClick={this.handleClick}>
                    <span className="SingleOrb-shadow"></span>
                  </figure>
              }
            </div>}
            </>)
          // );
    }
 }

 export default SingleOrb;