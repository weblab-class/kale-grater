import React, {Component} from "react";
import "../../utilities.css";
import "./AboutPage.css";
import {get} from "../../utilities.js";


class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // create reference for onClick scroll
        this.divToInfo = React.createRef();
        this.divToHowTo = React.createRef();
        this.divToContact = React.createRef()

    }

    componentDidMount() {
        document.title = "About | Memorble";

        // get("/api/getusername", {userId: this.props.userId}).then((result) => {
        //     this.setState({
        //         username: result.username,
        //     })
        // })
    }


    render() {
        // console.log('USERNAME', this.props.username)
        // console.log('hi')
        // if (!this.state.userId) {
        //     return <div>Loading!</div>
    // }
        //  if (!this.props.username) {
        //     navigate("/newuser");
        // }
        return (
            <>
            <div className="AboutPage-body">

            <div className="AboutPage-text">
                <h2 className="AboutPage-header AboutPage-top">How we all started</h2>
                <div>
                    <div className="AboutPage-description">On the eve of our Milestone 1 submission, our team member Derek Shen, frantic to get something submittable, closed his
                        eyes and pointed to one of the bullet-pointed ideas on our Google Document. And thus our website was born...
                    </div>

                    <div className="AboutPage-description">
                    <strong>Just kidding! </strong> Team Kale Grater (Kailey, Grace, Derek) made Memorble with the hopes of providing users a 
                    unique and effective way of visualizing their emotions. Inspired by the Pixar film&nbsp;
                    <em><a href="https://www.imdb.com/title/tt2096673/">Inside Out</a></em>, each memory entry is enclosed in a vibrant, glowing, 
                    snowball-like orb to house the words and images that define the moment they wish to save. Memorble is an expression of the 
                    experiencing and the remembering self: one can use the site to look back on the most defining moments of their lives, or, on another day,
                    they can zoom out into our long-term view to see the shapes and turns over the days, weeks, and years. 
                    
                    </div>
                </div>
            </div> 

            <div className="AboutPage-text">
                <h2 className="AboutPage-header">Contact us!</h2>
                <div className="AboutPage-description">
                    Please feel free to contact us about any inquiries or comments you have on how to improve our site! You can
                    reach us at&nbsp; <a className="email" href="mailto: dshen01@mit.edu">dshen01@mit.edu</a>&nbsp;(Derek Shen), <a className="email" href="mailto: gysong@mit.edu">gysong@mit.edu</a>&nbsp;(Grace Song), or <a className="email" href="mailto: kaileyy@mit.edu">kaileyy@mit.edu</a>&nbsp;(Kailey Yang).
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default AboutPage