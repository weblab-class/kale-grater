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
            view: "",
            loaded: "",
            userId: this.props.userId,
            userName: "",
            shelfView: "all",
        };
        console.log('STATE', this.state);
    }

    componentDidMount() {
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
                view: result.message,
            })
        })

        get("/api/getusername", {userId: this.props.userId}).then((result) => {
            this.setState({
                username: result.username,
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
                view: result.message
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
        if (!this.state.view || !this.state.loaded || !this.state.username) {
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
                privacy={orbObj.privacy}
                view={this.state.view}
                />
            ));
        } else {
            orbsList = <div>No stories!</div>
        }
        return (
            <>
            <button>Switch View</button>
            {this.state.view === "self" ? null : <h2 className="Shelf-title">{this.state.username}'s Orbs</h2>}
            <div className="ShelfPage-row">
                {/* {this.props.creator_id && <ShelfPage addNewOrb={this.addNewOrb} />} */}
                {orbsList}
            </div>
            </>
        );
    }
}

export default ShelfPage;
