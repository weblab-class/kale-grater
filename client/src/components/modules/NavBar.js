import React, {Component} from "react";
import {Link} from "@reach/router";
import GoogleLogin, {GoogleLogout} from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "761480055071-mjpqo87nr30mjbf346f8b8u82v14n219.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Inside Out</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/home" className="NavBar-link">
            Home
          </Link>

          <Link to="/shelves" className="NavBar-link">
            Shelves
          </Link>
          {/* <Link to="/social/" className="NavBar-link">
            Social
          </Link> */}
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;