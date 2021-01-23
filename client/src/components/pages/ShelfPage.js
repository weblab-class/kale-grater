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
            // userId: this.props.userId,
            // loaded: null,
            privacy: "",
            loaded: "",
            userId: this.props.userId
        };
        console.log('STATE', this.state);
    }

    componentDidMount() {
        console.log('am i even in the component')
        document.title = "Shelf | Inside Out";
        console.log(this.props.userId);
        get("/api/shelves", {userId: this.props.userId}).then((orbObjs) => {
            this.setState({
                orbs: orbObjs,
                loaded: 'yes'
            });
        });

        get("/api/user", {userId: this.props.userId}).then((result) => {
            this.setState({
                privacy: result.message
            })
        })

    }

    componentDidUpdate () {
        if (this.props.userId !== this.state.userId) {
        get("/api/shelves", {userId: this.props.userId}).then((orbObjs) => {
            this.setState({
                orbs: orbObjs,
                loaded: 'yes'
            });
        });

        get("/api/user", {userId: this.props.userId}).then((result) => {
            this.setState({
                privacy: result.message
            })
        })
        }
    }
    // called when user presses "Submit" to add new orb to shelf
    addNewOrb = (orbObj) => {
        this.setState({
            orbs: [orbObj].concat(this.state.orbs),
        });
    };

    render() {
        console.log('does it render??')
        console.log(this.state)
        console.log('ID', this.props.userId)
        if (!this.state.privacy || !this.state.loaded) {
            return <div>Loading!</div>;
        }
        let orbsList = null;
        const hasOrbs = this.state.orbs.length !== 0;
        if (hasOrbs) {
            orbsList = this.state.orbs.map((orbObj) => (
                <SingleOrb className="ShelfPage-orb"
                creator_id={orbObj.creator_id} 
                emotion={orbObj.emotion}
                content={orbObj.content}
                timestamp={orbObj.timestamp}
                />
            ));
        } else {
            orbsList = <div>No stories!</div>
        }
        return (
            <>
            <div className="ShelfPage-row">
                {/* {this.props.creator_id && <ShelfPage addNewOrb={this.addNewOrb} />} */}
                {orbsList}
            </div>
            </>
        );
    }
}

export default ShelfPage;
