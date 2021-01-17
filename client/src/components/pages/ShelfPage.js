import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./ShelfPage.css";

class ShelfPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Shelf
            </div>
        )

    };
};
export default ShelfPage;