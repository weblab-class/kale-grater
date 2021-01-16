import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./LoginPage.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "761480055071-mjpqo87nr30mjbf346f8b8u82v14n219.apps.googleusercontent.com";

class LoginPage extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {};
    }
  
    componentDidMount() {
      // remember -- api calls go here!
      // if user Id exists, route to home page
    //   if (userId)
    }

    render() {
        return (
            <>
            <section>
                <div className='Login-color'></div>
                <div className='Login-color'></div>
                <div className='Login-color'></div>
                <div className='Login-ornaments'>
                    <div className='Login-circle' style={{"--i":0}}></div>
                    <div className='Login-circle' style={{"--i":1}}></div>
                    <div className='Login-circle' style={{"--i":2}}></div>
                    <div className='Login-circle' style={{"--i":3}}></div>
                    <div className='Login-circle' style={{"--i":4}}></div>
                </div>
            </section>

            {this.props.userId ? (
                <GoogleLogout
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                />
                ) : (
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.props.handleLogin}
                    onFailure={(err) => console.log(err)}
                />
            )}
            </>
        );
    }
}

export default LoginPage;