import React, { Component } from "react";

import "./NotFound.css";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> 404 Not Found</h1>
        <p>The page you requested couldn't be found.</p>
      </div>
    );
  }
}

export default NotFound;
