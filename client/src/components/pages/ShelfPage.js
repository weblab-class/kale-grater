import React, {Component} from "react";
import { get } from "../../utilities";

import "./ShelfPage.css";

class ShelfPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orbs: [],
        };
    }

    componentDidMount() {
        document.title = "ShelfPage"
    }

    render() {
        return (
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-12 shelf hidden-md hidden-lg"></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-12 shelf"></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-12 shelf hidden-md hidden-lg"></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-4 col-md-2"><img src="http://placehold.it/150x190" class="img-responsive book"/></div>
                        <div class="col-xs-12 shelf"></div>
                    </div>
                </div> 
            </section>
        );
    };
}

export default ShelfPage;
