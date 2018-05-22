import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {approveOrder, calculateOrder} from "../../actions/order_actions";
import OrderFilmPlate from "./OrderFilmPlate";
import {Container, Input, Row} from "reactstrap";
import MaskedInput from 'react-maskedinput'
import {Link} from "react-router-dom";

class OrderPayment extends Component {

    state = {
        cardNumber: null,
        cardHolder: null,
        cardYear: null,
        cardCVV: null
    };

    componentDidMount() {
        const selectedSeats = this.props.selectedSeats;
        const seatsIds = selectedSeats.map(selectedSeat => selectedSeat.id);
        this.props.calculateOrder({seanceId: this.props.seance.id, seatIds: seatsIds});
    }

    getCalculatedOrder = () => {
        return this.props.order ? this.props.order : null;
    };

    getMonths = () => {
        let months = [];
        for (let i = 1; i < 13; i++) {
           months.push((<option key={"month-" + i}>{i}</option>))
        }
        return months;
    };

    changeCardNumber = (e) => {
        this.validFunction(e.target.value, 19, "cardNumber");
    };

    changeCardHolder = (e) => {
        this.setState({cardHolder: e.target.value});
    };

    changeCardCVV = (e) => {
        this.validFunction(e.target.value, 3, "cardCVV");
    };

    changeCardYear = (e) => {
        this.validFunction(e.target.value, 4, "cardYear");
    };

    validFunction = (value, length, attr) => {
        let validatedValue = value;
        validatedValue = validatedValue.trim();
        validatedValue = validatedValue.replace("_", "");
        if (validatedValue.length === length) {
            this.setState({[attr]: value});
        } else {
            this.setState({[attr]: null});
        }
    };

    render() {
        const continueButton = !this.state.cardNumber || !this.state.cardHolder
        || !this.state.cardYear || !this.state.cardCVV ? ("") : (
            <div className="d-flex p-3 mb-3 border-top border-1 border-secondary justify-content-end">
                <Link to="/complete-order" className="button-color-one p-2">Подтвердить</Link>
            </div>
        );

        return (
            <div>
                <OrderFilmPlate/>
                <Container>
                    <Row className="justify-content-center">
                        <MaskedInput className="card-input-field" mask="1111 1111 1111 1111" name="card" size="20" onChange={this.changeCardNumber} placeholder="НОМЕР КАРТЫ"/>
                    </Row>
                    <Row className="justify-content-center">
                        <Input className="large-input-field text-uppercase"  onChange={this.changeCardHolder} placeholder="ИМЯ И ФАМИЛИЯ ВЛАДЕЛЬЦА КАРТЫ"/>
                    </Row>
                    <Row className="justify-content-center">
                        <Input type="select" className="small-input-field" placeholder="ММ">
                            {
                                this.getMonths()
                            }
                        </Input>
                        <MaskedInput className="small-input-field year-input-field" mask="1111" size="4" name="card" onChange={this.changeCardYear} placeholder="ГГГГ"/>
                        <MaskedInput className="small-input-field year-input-field" placeholder="CVV" mask="111" size="3" onChange={this.changeCardCVV}/>
                    </Row>
                    <Row className="justify-content-center">
                        <div>Итого к оплате: {this.getCalculatedOrder() ? this.getCalculatedOrder().commonCost : ""} Р</div>
                    </Row>
                    {continueButton}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order ? state.order.calculatedOrder : null,
    selectedSeats: state.order ? state.order.selectedSeats : [],
    seance: state.seance,
    hall: state.hall
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {calculateOrder, approveOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderPayment);