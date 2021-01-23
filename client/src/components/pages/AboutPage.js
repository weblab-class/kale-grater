import React, {Component} from "react";
import "../../utilities.css";
import "./AboutPage.css";


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
        document.title = "About | Outside In";
    }


    render() {
        return (
            <>
            <div className="AboutPage-wrap">
                <div className="AboutPage-sidenav">
                    <div className="AboutPage-sections">
                        <a href="#info" className="AboutPage-section">How we Started</a>
                        <a href="#howto" className="AboutPage-section">How to Use this Site</a>
                        <a href="#contact" className="AboutPage-section">Contact Us!</a>
                    </div>
                </div>

                <div className="AboutPage-body">
                    <div>
                        <div className="AboutPage-block">
                                <h2 id="info" className="AboutPage-header">How we all started</h2>
                            <div className="AboutPage-description">
                                <p>Purpose of webpage, inspiration from Inside Out</p>

                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum  
                                </p>
                            </div>
                        </div>
                        <div className="AboutPage-block">
                                <h2 id="howto" className="AboutPage-header">How to use this site / FAQs</h2>
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
                        </div>
                        <div className="AboutPage-block">
                                <h2 id="contact" className="AboutPage-header">Contact us!</h2>
                            <div className="AboutPage-description">
                                Inquiries or comments on how to improve our site. Add a message box, our names!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default AboutPage