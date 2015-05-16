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
        var eventsFiltered = _.filter(this.props.events, function(event) {
            var day = new Date(event.started_at_js).getDate();
            return day == this.props.day;
        }.bind(this));

        return <div className="cal-month-day cal-day-inmonth cal-day-weekend">
            <span data-original-title="" className="pull-right"
                data-cal-date={this.props.date}
                data-cal-view="day"
                data-toggle="tooltip" title="">{this.props.day}</span>

            {_.map(eventsFiltered, function(event) {
                return <EventHref event={event}/>;
            })}
        </div>
    }
});

var EventHref = React.createClass({
    render: function() {
        console.log(this.props.event);
        if (this.props.event != {}) {
            return <div className="events-list"
                data-cal-start={this.props.event.started_at_js}
                data-cal-end={this.props.event.started_at_js}>
                <a data-original-title={this.props.event.title} href={this.props.event.url} data-event-id="293" data-event-classname="event-warning" className="pull-left cal-event event-warning" data-toggle="tooltip" title=""></a>
            </div>
        } else {
            return [];
        }

    }
});

var CalendarWeek = React.createClass({
    render: function() {
        return  <div className="cal-row-fluid cal-before-eventlist">
            {_.map(this.props.dates,
                  function(day) {
                      var dayOfWeek = "-day" + (moment().year(this.props.year).month(this.props.month).date(day).day());
                      var date = this.props.year+"-"+this.props.month+"-"+day;
                      return <div className="cal-cell1 cal-cell" data-cal-row={dayOfWeek}>
                          <CalendarDay date={date} day={day} events={this.props.events}/>
                      </div>
                  }.bind(this))}
        </div>
    }
});

var Calendar = React.createClass({
    componentDidMount: function() {
        $.get("/api/v1/events", function(result) {
            if (this.isMounted()) {
                console.log(result);
                this.setState({
                    events: result
                });
            }
        }.bind(this));
    },

    getInitialState: function() {
        return {
            year: moment().year(),
            month: moment().month(),
            events: []
        }
    },

    render: function() {
        var daysInMonth = new Date(moment().year(), moment().month(), 0).getDate();
        var days = _.range(1, daysInMonth + 1);
        var weeks = _.groupBy(days, function(day) {return moment().day(day).week()});
        return <div className="cal-context" style={{width: '100%'}} id="calendar">
            <CalendarHeader/>
            <div className="cal-month-box">
                {_.map(weeks, function(days) {
                    return <CalendarWeek dates={days} events={this.state.events} year={this.state.year} month={this.state.month}/>
                }.bind(this))}
            </div>
        </div>
    }
});

