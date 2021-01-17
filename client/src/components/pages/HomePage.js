import React, {Component} from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import NewMemory from "../modules/NewMemory.js";
// import Modal from "react-bootstrap/Modal";

import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

    }

    componentDidMount() {

    }

    render() {

        return (
            <>
                <button class="Button-container" onClick={e => {
                    this.showModal();
                }}>
                    Add Memory
                </button>
            {/* <div>
                <NewMemory
                    userId={this.state.userId} />
            </div> */}
            </>
        )
    }
}
export default HomePage;