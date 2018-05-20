import React, {Component} from "react";
import MenuBar from "../components/MenuBar";
import UserProfile from "../components/UserProfile";
import {Route} from "react-router-dom";
import CreateSchedule from "../components/admin/LoadSchedule";

class AdminRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <MenuBar/>
                <div>
                    <Route path="/schedule" component={CreateSchedule}/>
                    <Route path="/profile" component={UserProfile}/>
                </div>
            </div>
        );
    }
}

export default AdminRouter;