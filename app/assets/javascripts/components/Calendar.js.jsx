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
            <span data-original-title="" className="pull-right"
                data-cal-date={this.props.date}
                data-cal-view="day"
                data-toggle="tooltip" title="">{this.props.day}</span>

            <div className="events-list" data-cal-start="1362859200000" data-cal-end="1362945600000">
                <a data-original-title="This is warning className event with very long title to check how it fits to evet in day view" href="http://www.example.com/" data-event-id="293" data-event-classname="event-warning" className="pull-left cal-event event-warning" data-toggle="tooltip" title=""></a>
            </div>
        </div>
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
    getInitialState: function() {
        return {
            year: moment().year(),
            month: moment().month(),
            events: [{
                title: "JSNN",
                link: "github.com",
                start: 1362859200000,
                end: 1362945600000
            }]
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

