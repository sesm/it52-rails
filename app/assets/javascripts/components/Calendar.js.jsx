/** @jsx React.DOM */
var CalendarHeader = React.createClass({
    render: function() {
        return <div className="cal-row-fluid cal-row-head">
            <div className="cal-cell1">Sunday</div>
            <div className="cal-cell1">Monday</div>
            <div className="cal-cell1">Tuesday</div>
            <div className="cal-cell1">Wednesday</div>
            <div className="cal-cell1">Thursday</div>
            <div className="cal-cell1">Friday</div>
            <div className="cal-cell1">Saturday</div>
        </div>
    }
});

var CalendarDay = React.createClass({
    render: function() {
        return <div className="cal-month-day cal-day-inmonth cal-day-weekend">
            <span data-original-title="" className="pull-right" data-cal-date={this.props.date} data-cal-view="day" data-toggle="tooltip" title="">10</span>

            <div className="events-list" data-cal-start="1362859200000" data-cal-end="1362945600000">
                <a data-original-title="This is warning className event with very long title to check how it fits to evet in day view" href="http://www.example.com/" data-event-id="293" data-event-className="event-warning" className="pull-left cal-event event-warning" data-toggle="tooltip" title=""></a>
            </div>
        </div>
    }
});

var CalendarWeek = React.createClass({
    render: function() {
        return  <div className="cal-row-fluid cal-before-eventlist">
            <div className="cal-cell1 cal-cell" data-cal-row="-day1">
                <CalendarDay date="2013-03-10"/>
            </div>
        </div>
    }
});

var Calendar = React.createClass({
    render: function() {
        return <div className="cal-context" style={{width: '100%'}} id="calendar">
            <CalendarHeader/>
            <div className="cal-month-box">
                <CalendarWeek/>
            </div>
        </div>
    }
});


//React.render(<Calendar/>, document.getElementById('events-calendar'));