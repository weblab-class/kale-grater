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
         if (!this.props.username) {
            navigate("/newuser");
        }
        return (
            <>
            <div className="AboutPage-body">
            <div className="AboutPage-orbContainer">
                <figure className="AboutPage-anger AboutPage-Orb AboutPage-shadow"></figure>
                <figure className="AboutPage-fear AboutPage-Orb AboutPage-shadow"></figure>
                <figure className="AboutPage-joy AboutPage-Orb AboutPage-shadow"></figure>
                <figure className="AboutPage-disgust AboutPage-Orb AboutPage-shadow"></figure>
                <figure className="AboutPage-sadness AboutPage-Orb AboutPage-shadow"></figure>
            </div>

            <div className="AboutPage-text">
                <h2 className="AboutPage-header">How we all started</h2>
                <div className="AboutPage-description">
                    <p>On the eve of our Milestone 1 submission, our team member Derek Shen, frantic to get something submittable, closed his
                        eyes and pointed to one of the bullet-pointed ideas on our Google Document. And thus our website was born...
                    </p>

                    <p>
                    <strong>Just kidding! </strong> We (Kailey, Grace, Derek) made Memorble with the hopes of providing users a 
                    unique and effective way of visualizing their emotions. Inspired by the Pixar film 
                    <em><a href="https://www.imdb.com/title/tt2096673/"> Inside Out</a></em>, each memory entry is enclosed in a vibrant, glowing, 
                    snowball-like orb to house the words and images that define the moment they wish to save. Memorble is an expression of the 
                    experiencing and the remembering self: one can use the site to look back on the most defining moments of their lives, or, on another day,
                    they can zoom out into our long-term view to see the shapes and turns over the days, weeks, and years. 
                    
                    </p>
                </div>

                <h2 className="AboutPage-header">How to use this site / FAQs</h2>
                <div className="AboutPage-description">
                    <p>For users who haven't added anything, it might look bare or confusing. Talk about adding a memory and the different features,
                    how many memories you can add, different views on the shelf, Bing Bong feature, social feature </p>

                    <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
                    quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
                    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
                    laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil 
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
                    </p>
                </div>

                <h2 className="AboutPage-header">Contact us!</h2>
                <div className="AboutPage-description">
                    Inquiries or comments on how to improve our site. Add a message box, our names!
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default AboutPage