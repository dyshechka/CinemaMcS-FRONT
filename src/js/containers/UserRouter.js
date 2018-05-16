import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import MainPage from "../components/MainPage";
import MenuBar from "../components/MenuBar";
import OrderSelectSeat from "../components/order/OrderSelectSeat";

class UserRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <MenuBar/>
                <Route path="/schedule" component={MainPage}/>
                <Route path="/films" component={MainPage}/>
                <Route path="/select-seat" component={OrderSelectSeat}/>
            </div>
        );
    }
}

export default UserRouter;