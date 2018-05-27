import React, {Component} from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import UserProfile from "../components/UserProfile";
import {Route} from "react-router-dom";
import CreateSchedule from "../components/admin/LoadSchedule";
import AddFilm from "../components/admin/FilmManager";

class AdminRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <AdminMenuBar/>
                <div>
                    <Route path="/schedule" component={CreateSchedule}/>
                    <Route path="/profile" component={UserProfile}/>
                    <Route path="/addFilm" component={AddFilm}/>
                </div>
            </div>
        );
    }
}

export default AdminRouter;