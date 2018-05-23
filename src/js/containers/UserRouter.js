import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import MainPage from "../components/MainPage";
import MenuBar from "../components/MenuBar";
import OrderSelectSeat from "../components/order/OrderSelectSeat";
import OrderCalculation from "../components/order/OrderCalculation";
import OrderPayment from "../components/order/OrderPayment";
import OrderComplition from "../components/order/OrderComplition";
import UserProfile from "../components/UserProfile";
import VacanciesList from "../components/VacanciesList";

class UserRouter extends Component {
    render() {
        return (
            <div className="global-padding">
                <MenuBar/>
                <Route path="/schedule" component={MainPage}/>
                <Route path="/films" component={MainPage}/>
                <Route path="/select-seat" component={OrderSelectSeat}/>
                <Route path="/calculate-order" component={OrderCalculation}/>
                <Route path="/payment-order" component={OrderPayment}/>
                <Route path="/complete-order" component={OrderComplition}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/vacancies" component={VacanciesList}/>
            </div>
        );
    }
}

export default UserRouter;