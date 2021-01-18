import React, {Component} from "react";
import { get } from "../../utilities";
import SingleOrb from "../modules/SingleOrb.js";

import "./ShelfPage.css";

class ShelfPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orbs: [],
        };
    }

    componentDidMount() {
        document.title = "ShelfPage";

        get("/shelf").then((orbObjs) => {
            this.setState({
                orbs: orbObjs
            });
        });

    }

    render() {
        // return (
        //     <>
        //         <div>SHELF</div>
        //     </>
        // );
         
        return (
            <div>
                <SingleOrb creator_id="testing" emotion="excited" content="i am excited"></SingleOrb>
            </div>
        )
    }
}

export default ShelfPage;
