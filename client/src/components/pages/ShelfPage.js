import React, {Component} from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import SingleOrb from "../modules/SingleOrb.js";
import MultiOrb from "../modules/MultiOrb.js";

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
            shelfView: "week",
            currentWeekOrbs: null,
            currentWeekStart: null
        };
    }

    componentDidMount() {
        document.title = "Shelf | Memorble";
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

        // get("/api/getusername", {userId: this.props.userId}).then((result) => {
        //     this.setState({
        //         username: result.username,
        //     })
        // })

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

    deleteMemory = (orbObj) => {
        this.setState({
            orbs: this.state.orbs.filter(orb => orb !== orbObj),
        });
        
        post("/api/deletememory", { _id: orbObj._id}).then(() => {
          navigate(`/shelves/${orbObj.creator_id}`);
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
    
    handleClick = (change) => {
        var prevMonday = new Date()
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
        var currentStart = this.state.currentWeekStart ? this.state.currentWeekStart : prevMonday
        // console.log('B5', prevSunday)
        // prevSunday.setDate(prevSunday.getDate() - (prevSunday.getDay() + 6) % 7);
        // console.log('AFTER', prevSunday)
        // console.
        // var currentStart = 


        
        var month;
        if (currentStart.getMonth() + 1 < 10) {
          month = "0" + (currentStart.getMonth() + 1)
        } else {
          month = currentStart.getMonth() + 1
        }
        const prevMondayDate = currentStart.getFullYear() + "-" + month + "-" + currentStart.getDate();
        // console.log('OIDSJFA', prevSundayDate)
        // console.log('bruh', Date(prevSundayDate))
        // var weekOrbs = {}
        var allDayOrbs = []
        var weekOrbs = []
        const weekDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        // for (let i = 0; i < 7; i++) {
        //     // var current_result = new Date(prevSundayDate);
        //     var current_result = new Date(prevSunday.getFullYear(), month - 1, prevSunday.getDate())
        //     current_result.setDate(current_result.getDate() + i);
        //     var resultMonth;
        //     if (current_result.getMonth() + 1 < 10) {
        //         resultMonth = "0" + (current_result.getMonth() + 1)
        //     } else {
        //         resultMonth = result.getMonth() + 1
        //     }
          
        //     const resultDate = current_result.getFullYear() + "-" + resultMonth + "-" + current_result.getDate()
        //     // console.log(resultDate)
        //     function filterDay(orb) {
        //         return orb.timestamp.startsWith(resultDate)
        //     }

        //     const properResultDate = resultMonth + "-" + current_result.getDate() + "-" + current_result.getFullYear();
            
        //     const dayOrbs = this.state.orbs.filter(filterDay)
        //     var dayEmotions = ""
        //     var dayEmotionsList = []
        //     var orbClass = "MultiOrb-"
        //     var contentList = []
        //     for (let i = 0; i < dayOrbs.length; i++) {
        //         const currentOrb = dayOrbs[i]
        //         const currentEmotion = currentOrb.emotion
        //         // if (!dayEmotions.startsWith(currentEmotion)) {
        //         if (!dayEmotionsList.includes(currentEmotion)) {
        //             dayEmotions = dayEmotions + currentEmotion
        //             // numEmotions += 1
                    
        //         }
        //         contentList = [currentOrb.content].concat(contentList)
        //         dayEmotionsList = [currentEmotion].concat(dayEmotionsList)
        //     }
        //     if (dayEmotionsList.length === 0) {
        //         orbClass += "clear";
        //     } else if (dayEmotionsList.length > 2) {
        //         orbClass += "mixed";
        //     } else {
        //         orbClass += dayEmotions;
        //     }
            
        //     // console.log(numEmotions)
        //     // console.log('ORBCLASS', orbClass)
            
        //     // weekOrbs = 
        //     weekOrbs = [<MultiOrb className={`MultiOrb-orb ${orbClass}`}
        //     // creator_id={.creator_id} 
        //     // emotion={orbObj.emotion}
        //     // content={orbObj.content}
        //     // timestamp={orbObj.timestamp}
        //     // privacy={orbObj.privacy}
        //     // view={this.state.view}
        //     emotions={dayEmotionsList}
        //     content={contentList}
        //     date={properResultDate}
        //     day={weekDayNames[i]}
        //     view={this.state.view}
        //     />].concat(weekOrbs)
        //     // allDayOrbs = [dayOrbs].concat(allDayOrbs)
        //     // weekOrbs[i] = dayOrbs
        // }
    }
    render() {
        if (!this.props.username) {
            navigate("/newuser")
        }
        if (!this.state.view || !this.state.loaded || !this.props.username) {
            return <div>Loading!</div>;
        }
        let orbsList = null;
        const hasOrbs = this.state.orbs.length !== 0;
        if (hasOrbs) {
            orbsList = this.state.orbs.map((orbObj) => (
                <SingleOrb className="ShelfPage-orb"
                _id={orbObj._id}
                creator_id={orbObj.creator_id} 
                emotion={orbObj.emotion}
                content={orbObj.content}
                timestamp={orbObj.timestamp}
                privacy={orbObj.privacy}
                view={this.state.view}
                delete={this.deleteMemory}
                object={orbObj}
                />
            ));
        } else {
            orbsList = <div>No stories!</div>
        }

        var prevSunday = new Date();
        // console.log('B5', prevSunday)
        prevSunday.setDate(prevSunday.getDate() - (prevSunday.getDay() + 6) % 7);
        // console.log('AFTER', prevSunday)
        // console.
        var month;
        if (prevSunday.getMonth() + 1 < 10) {
          month = "0" + (prevSunday.getMonth() + 1)
        } else {
          month = prevSunday.getMonth() + 1
        }
        const prevSundayDate = prevSunday.getFullYear() + "-" + month + "-" + prevSunday.getDate();
        // console.log('OIDSJFA', prevSundayDate)
        // console.log('bruh', Date(prevSundayDate))
        // var weekOrbs = {}
        var allDayOrbs = []
        var weekOrbs = []
        const weekDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for (let i = 0; i < 7; i++) {
            // var current_result = new Date(prevSundayDate);
            var current_result = new Date(prevSunday.getFullYear(), month - 1, prevSunday.getDate())
            current_result.setDate(current_result.getDate() + i);
            var resultMonth;
            if (current_result.getMonth() + 1 < 10) {
                resultMonth = "0" + (current_result.getMonth() + 1)
            } else {
                resultMonth = result.getMonth() + 1
            }
          
            const resultDate = current_result.getFullYear() + "-" + resultMonth + "-" + current_result.getDate()
            // console.log(resultDate)
            function filterDay(orb) {
                return orb.timestamp.startsWith(resultDate)
            }

            const properResultDate = resultMonth + "-" + current_result.getDate() + "-" + current_result.getFullYear();
            
            const dayOrbs = this.state.orbs.filter(filterDay)
            var dayEmotions = ""
            var dayEmotionsList = []
            var orbClass = "MultiOrb-"
            var contentList = []
            for (let i = 0; i < dayOrbs.length; i++) {
                const currentOrb = dayOrbs[i]
                const currentEmotion = currentOrb.emotion
                // if (!dayEmotions.startsWith(currentEmotion)) {
                if (!dayEmotionsList.includes(currentEmotion)) {
                    dayEmotions = dayEmotions + currentEmotion
                    // numEmotions += 1
                    
                }
                contentList = [currentOrb.content].concat(contentList)
                dayEmotionsList = [currentEmotion].concat(dayEmotionsList)
            }
            if (dayEmotionsList.length === 0) {
                orbClass += "clear";
            } else if (dayEmotionsList.length > 2) {
                orbClass += "mixed";
            } else {
                orbClass += dayEmotions;
            }
            
            // console.log(numEmotions)
            // console.log('ORBCLASS', orbClass)
            
            // weekOrbs = 
            weekOrbs = [<MultiOrb className={`MultiOrb-orb ${orbClass}`}
            // creator_id={.creator_id} 
            // emotion={orbObj.emotion}
            // content={orbObj.content}
            // timestamp={orbObj.timestamp}
            // privacy={orbObj.privacy}
            // view={this.state.view}
            emotions={dayEmotionsList}
            content={contentList}
            date={properResultDate}
            day={weekDayNames[i]}
            view={this.state.view}
            />].concat(weekOrbs)
            // allDayOrbs = [dayOrbs].concat(allDayOrbs)
            // weekOrbs[i] = dayOrbs
        }

        return (
            <>
            <button onClick={this.handleSwitch}>Switch View</button>
            {this.state.view === "self" ? null : <h2 className="Shelf-title">{this.props.username}'s Orbs</h2>}
            {this.state.shelfView === "all" ? 
            <div className="ShelfPage-row">
                {/* {this.props.creator_id && <ShelfPage addNewOrb={this.addNewOrb} />} */}
                {orbsList}
            </div> :
            <>
                <button onClick={this.handleClick(-7)}>LAST WEEK</button>
                <button onClick={this.handleClick(7)}>NEXT WEEK</button>
            
            <div className="ShelfPage-week">
                {this.state.currentWeekOrbs ? this.state.currentWeekOrbs.reverse() : weekOrbs.reverse()}
            </div>
            </>}
            </>
        );
    }
}

export default ShelfPage;
