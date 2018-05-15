import React, {Component} from "react";
import MenuBar from "../components/MenuBar";

class AdminRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <MenuBar/>
                Admin page
            </div>
        );
    }
}

export default AdminRouter;