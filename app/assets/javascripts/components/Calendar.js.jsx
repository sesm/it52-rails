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
    st : {"test": "123"},
    render: function() {
        //console.log("events of day: " + this.props.events);
        var eventsForDay = [];
        var that = this;
        $.each(this.props.events, function() {
            var day = new Date($(this)[0].started_at).getDate();
            if (day == that.props.day) {
                console.log("day suites: " + day);
                eventsForDay.push($(this)[0]);
            }

        });
        console.log(eventsForDay);
        //var st="123";

        if (eventsForDay.length > 0) {
            st = eventsForDay[0];
            //that.state.eventForDay=eventsForDay[0];
        } else {
            st = {};
        }
        console.log(st);

        return <div className="cal-month-day cal-day-inmonth cal-day-weekend">
            <span data-original-title="" className="pull-right"
                data-cal-date={this.props.date}
                data-cal-view="day"
                data-toggle="tooltip" title="">{this.props.day}</span>

            <EventHref event = {this.st}/>
        </div>
    }
});

var EventHref = React.createClass({
    render: function() {
        console.log(this.props.event);
        if (this.props.event != {}) {
            return <div className="events-list" data-cal-start="1362859200000" data-cal-end="1362945600000">
                <a data-original-title={this.props.event.title} href={this.props.event.title} data-event-id="293" data-event-classname="event-warning" className="pull-left cal-event event-warning" data-toggle="tooltip" title=""></a>
            </div>
        } else {
            return <div className="events-list" data-cal-start="1362859200000" data-cal-end="1362945600000">
            </div>
        }

    }
});

var CalendarWeek = React.createClass({
    render: function() {
        return  <div className="cal-row-fluid cal-before-eventlist">
            {_.map(_.zip(_.range(this.props.start, this.props.end + 1),
                           _.range(1, 8)),
                  function(nums) {
                      var dayOfWeek = "-day"+nums[1];
                      var day = nums[0];
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
            //var lastGist = result[0];
            if (this.isMounted()) {
                console.log(result)
                this.setState({
                    events: result
                    //username: lastGist.owner.login,
                    //lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },

    getInitialState: function() {
        return {
            year: 2015,
            month: 5,
            events: [{
                title: "JSNN",
                link: "github.com",
                start: 1362859200000,
                end: 1362945600000
            }]
        }
    },

    render: function() {
        return <div className="cal-context" style={{width: '100%'}} id="calendar">
            <CalendarHeader/>
            <div className="cal-month-box">
                <CalendarWeek start={10} end={16} events={this.state.events} year={this.state.year} month={this.state.month}/>
            </div>
        </div>
    }
});

