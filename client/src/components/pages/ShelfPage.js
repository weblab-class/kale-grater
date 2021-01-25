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
            weekOrbs: null
        };
    }

    componentDidMount() {
        document.title = "Shelf | Inside Out";
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

    handleSwitch = () => {
        if (this.state.shelfView === "all") {
            this.setState({
                shelfView: "week"
            })
        } else {
                this.setState({
                    shelfView: "all"
                })
            }
        }

    // filterDay = (orb) => {
    //     console.log('TS', orb.timestamp)
    //     console.log('RD', resultDate)
    //     return orb.timestamp.startsWith(resultDate)
    // }

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

        var prevSunday = new Date();
        prevSunday.setDate(prevSunday.getDate() - (prevSunday.getDay() + 7) % 7);
        var month;
        if (prevSunday.getMonth() + 1 < 10) {
          month = "0" + (prevSunday.getMonth() + 1)
        } else {
          month = prevSunday.getMonth() + 1
        }
        const prevSundayDate = prevSunday.getFullYear() + "-" + month + "-" + prevSunday.getDate();
        // var weekOrbs = {}
        var allDayOrbs = []
        for (let i = 0; i < 7; i++) {
            var result = new Date(prevSundayDate);
            result.setDate(result.getDate() + i);
                var resultMonth;
            if (result.getMonth() + 1 < 10) {
                resultMonth = "0" + (result.getMonth() + 1)
            } else {
                resultMonth = result.getMonth() + 1
            }
          
            const resultDate = result.getFullYear() + "-" + resultMonth + "-" + result.getDate()

            function filterDay(orb) {
                return orb.timestamp.startsWith(resultDate)
            }
            
            const dayOrbs = this.state.orbs.filter(filterDay)

            allDayOrbs = [dayOrbs].concat(allDayOrbs)
            // weekOrbs[i] = dayOrbs
        }

        return (
            <>
            <button onClick={this.handleSwitch}>Switch View</button>
            {this.state.view === "self" ? null : <h2 className="Shelf-title">{this.state.username}'s Orbs</h2>}
            {this.state.shelfView === "all" ? 
            <div className="ShelfPage-row">
                {/* {this.props.creator_id && <ShelfPage addNewOrb={this.addNewOrb} />} */}
                {orbsList}
            </div> :
            <div className="Shelf-title">WEEK</div>}
            </>
        );
    }
}

export default ShelfPage;
