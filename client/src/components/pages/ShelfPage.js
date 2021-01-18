import React, {Component} from "react";
import { get } from "../../utilities";

import SingleOrb from "../modules/SingleOrb.js";
import { NewMemory } from "../modules/NewMemory.js";

import "./ShelfPage.css";

class ShelfPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orbs: [],
        };
    }

    componentDidMount() {
        document.title = "Shelf | Inside Out";

        get("/api/shelves").then((orbObjs) => {
            this.setState({
                orbs: orbObjs
            });
        });

    }

    // called when user presses "Submit" to add new orb to shelf
    addNewOrb = (orbObj) => {
        this.setState({
            orbs: [orbObj].concat(this.state.orbs),
        });
    };

    render() {
        let orbsList = null;
        const hasOrbs = this.state.orbs.length !== 0;
        if (hasOrbs) {
            orbsList = this.state.orbs.map((orbObj) => (
                <SingleOrb 
                creator_id={orbObj.creator_id} 
                emotion={orbObj.emotion}
                content={orbObj.content}
                />
            ));
        } else {
            orbsList = <div>No stories!</div>
        }
        return (
            <>
            <div className="ShelfPage-row">
                {this.props.creator_id && <ShelfPage addNewOrb={this.addNewOrb} />}
                {orbsList}
            </div>
            </>
        );
    }
}

export default ShelfPage;
