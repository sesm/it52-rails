/** @jsx React.DOM */
var CalendarHeader = React.createClass({
    render: function() {
        return <div className="cal-row-fluid cal-row-head">
            <div className="cal-cell1">Monday</div>
            <div className="cal-cell1">Tuesday</div>
            <div className="cal-cell1">Wednesday</div>
            <div className="cal-cell1">Thursday</div>
            <div className="cal-cell1">Friday</div>
            <div className="cal-cell1">Saturday</div>
            <div className="cal-cell1">Sunday</div>
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
            <CalendarHeaderPanel/>
            <CalendarHeader/>
            <div className="cal-month-box">
                <CalendarWeek/>
            </div>
        </div>
    }
});

var CalendarHeaderPanelTitle = React.createClass({
    render: function() {
        return <h3>{this.props.month} {this.props.year}</h3>;
    }
});

var CalendarHeaderPanel = React.createClass({
    openPrev: function() {
        console.log("open prev");
    },
    openNext: function() {
        console.log("open next");
    },
    render: function() {
        return <div className="page-header">

            <div className="pull-right form-inline">
                <div className="btn-group">
                    <button className="btn btn-primary" data-calendar-nav="prev" onClick={this.openPrev}>&lt;&lt; Prev</button>
                    <button className="btn btn-default" data-calendar-nav="today">Today</button>
                    <button className="btn btn-primary" data-calendar-nav="next" onClick={this.openNext}>Next &gt;&gt;</button>
                </div>
            </div>

            <CalendarHeaderPanelTitle month="Marth" year="2015"/>
        </div>
    }
});


//React.render(<Calendar/>, document.getElementById('events-calendar'));