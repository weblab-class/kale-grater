import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "761480055071-mjpqo87nr30mjbf346f8b8u82v14n219.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    if (this.props.userId) {
      this.loadImages();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId && this.props.userId) {
      // just logged in. reload images
      this.loadImages();
    }
  }

  loadImages = () => {
    get("/api/getImages").then(images => {
      this.setState({ images: images });
    });
  }

  deleteImages = () => {
    post("/api/deleteImages").then(this.loadImages);
  }

  uploadImage = (event) => {
    const fileInput = event.target;
    console.log(fileInput);
    this.readImage(fileInput.files[0]).then(image => {
      fileInput.value = null;
      return post("/api/uploadImage", { image: image }).then(this.loadImages);
    }).catch(err => {
      console.log(err);
    });
  };

  readImage = (blob) => {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onloadend = () => {
        if (r.error) {
          reject(r.error.message);
          return;
        } else if (r.result.length < 50) {
          // too short. probably just failed to read, or ridiculously small image
          reject("small image? or truncated response");
          return;
        } else if (!r.result.startsWith("data:image/")) {
          reject("not an image!");
          return;
        } else {
          resolve(r.result);
        }
      };
      r.readAsDataURL(blob);
    });
  };

  render() {
    return (
      <>
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

        <div className="Skeleton-controls">
          <button type="button" onClick={this.deleteImages}>
            Delete All Images
        </button>
          <label htmlFor="fileInput">Click to add an image</label>
          <input id="fileInput" type="file" name="files[]" accept="image/*" onChange={this.uploadImage} />
        </div>
        <div className="Skeleton-images">
          {
            this.state.images.map((image, index) => (
              <img src={image} key={index} />
            ))
          }
        </div>

        <h1>Good luck on your project :)</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>Change the font in utilities.css</li>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
          <li>Update website title in client/dist/index.html</li>
        </ul>
      </>
    );
  }
}

export default Skeleton;
