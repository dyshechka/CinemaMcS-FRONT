import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder, calculateOrder} from "../../actions/order_actions";
import OrderFilmPlate from "./OrderFilmPlate";
import {Container, Input, Row} from "reactstrap";

class OrderPayment extends Component {

    componentDidMount() {
        const selectedSeats = this.props.selectedSeats;
        const seatsIds = selectedSeats.map(selectedSeat => selectedSeat.id);
        this.props.calculateOrder({seanceId: this.props.seance.id, seatIds: seatsIds});
    }

    getMonths = () => {
        let months = [];
        for (let i = 1; i < 13; i++) {
           months.push((<option key={"month-"}>{i}</option>))
        }
        return months;
    };

    render() {
        return (
            <div>
                <OrderFilmPlate/>
                <Container>
                    <Row className="justify-content-center">
                        <Input className="large-input-field text-uppercase" placeholder="НОМЕР КАРТЫ"/>
                    </Row>
                    <Row className="justify-content-center">
                        <Input className="large-input-field text-uppercase" placeholder="ИМЯ И ФАМИЛИЯ ВЛАДЕЛЬЦА КАРТЫ"/>
                    </Row>
                    <Row className="justify-content-center">
                        <Input type="select"className="small-input-field" placeholder="ММ">
                            {
                                this.getMonths()
                            }
                        </Input>
                        <Input className="small-input-field" placeholder="ГГГГ"/>
                        <Input className="small-input-field" placeholder="CVV"/>
                    </Row>
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
    {calculateOrder: calculateOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderPayment);