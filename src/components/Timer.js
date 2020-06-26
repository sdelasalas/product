import React from 'react';
import { Form, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import './Timer.css';

class Timer extends React.Component {
    state ={
        endDate: new Date(),
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        errorMsg: ''
    };
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    onEndDateChange = endDate => {
        this.setState({ endDate });
    }

    getTwoDigitValue = value => {
        if (value < 10) {
            return '0' + value;
        }
        return '' + value;
    }

    calculateCountdown = ()=> {
        const startDate = new Date ();
        const { endDate } = this.state;

        this.setState({ errorMsg: '' });

        const timeRemaining = endDate.getTime() - startDate.getTime();

        if (timeRemaining > 0) {
            const start_date = new Date(startDate);
            const end_date = new Date(endDate);
            const start_millis = start_date.getTime(); //get timestamp of start date
            const end_millis = end_date.getTime(); //get timestamp of end date

            //convert to seconds, 1 second = 1000 milli seconds
            const old_sec = start_millis / 1000;
            const current_sec = end_millis / 1000;

            //get remaining seconds
            let seconds = current_sec - old_sec;

            let days = Math.floor(seconds / (24 * 60 * 60));
            seconds -= days * 24 * 60 * 60;

            let hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * 60 * 60;

            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            days = Math.abs(days);
            hours = Math.abs(hours);
            minutes = Math.abs(minutes);
            seconds = Math.floor(Math.abs(seconds));

            this.setState(()=> ({
                days, hours, minutes, seconds
            }), () => {
                this.timer = setTimeout(this.calculateCountdown, 1000);
            });
        } else {
            this.setState({ errorMsg: 'Vacation Time is Here!'});
            clearTimeout(this.timer);
        }
    };

    render() {
        const { days, hours, minutes, seconds, errorMsg } = this.state;
        const convertedDays = this.getTwoDigitValue(days);
        const convertedHours = this.getTwoDigitValue(hours);
        const convertedMins = this.getTwoDigitValue(minutes);
        const convertedSeconds = this.getTwoDigitValue(seconds);

        return (
            <div>
                <div className="date-time-form">
                    {<h1>Vacation Countdown</h1>}
                    {errorMsg && <p className="error-msg">{errorMsg}</p>}
                    <Form>
                        <Form.Group controlId="end_date">
                            <Form.Label>End Date</Form.Label>
                            <DateTimePicker 
                                format="dd/MM/y h:mm:ss a"
                                onChange={this.onEndDateChange}
                                value={this.state.endDate}/>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={this.calculateCountdown}>
                                Begin Countdown
                            </Button>
                    </Form>
                </div>
                <div className="counter">
                    <div className="time">
                        <div className="time-value">{convertedDays}</div>
                        <div className="time-label">Days</div>
                    </div>
                    <div className="time">
                        <div className="time-value">{convertedHours}</div>
                        <div className="time-label">Hours</div>
                    </div>
                    <div className="time">
                        <div className="time-value">{convertedMins}</div>
                        <div className="time-label">Minutes</div>
                    </div>
                    <div className="time">
                        <div className="time-value">{convertedSeconds}</div>
                        <div className="time-label">Seconds</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Timer;