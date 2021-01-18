import React, {Component} from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import NewMemory from "../modules/NewMemory.js";
import {Link} from "@reach/router";

import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        document.title = "Inside Out";
    }

    render() {
        return (
            <>
                <Link to="/newmemory" className="NewMemory-link">
                    Add Memory!
                </Link>
            </>
        )
    }
}
export default HomePage;