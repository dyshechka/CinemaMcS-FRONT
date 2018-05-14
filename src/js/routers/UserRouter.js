import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import MainPage from "../components/MainPage";
import MenuBar from "../components/MenuBar";

class UserRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <MenuBar/>
                <Route path="/films" component={MainPage}/>
            </div>
        );
    }
}

export default UserRouter;