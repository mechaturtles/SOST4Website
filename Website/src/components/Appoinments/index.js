import React, {Component} from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  DayView,
  DateNavigator,
  WeekView,
  ViewSwitcher,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { AuthUserContext, withAuthorization } from '../Session';

const currentDate = moment().format("YYYY-MM-DD");
const schedulerData = [
  { startDate: '2020-07-20T09:45', endDate: '2020-07-20T11:00', recurrenceRule: 'FREQ=WEEKLY; UNTIL=20210720', title: 'Weekly Checkup' },
  { startDate: '2020-07-24T12:00', endDate: '2020-07-24T13:30', recurrenceRule: 'FREQ=WEEKLY; UNTIL=20210723', title: 'Special Appointment' },
];

class AppointmentsPage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
        //Similar formatting to Home page
        <div className = "Home Shrink">
          <div className = "Home-header Appt-header Shrink"> <header className = "Home-header-text Shrink"> Upcoming Appointments </header><br/>
          </div>
          <div className = "Home-body Appt-body Shrink">
            <div className = "Body-elements Body-elements-appt">
              <div className = "Appt-scheduler">
                <Scheduler
                data={schedulerData}
                >
                  <ViewState
                    currentDate={currentDate}
                    color="white"
                  />
                  <WeekView
                    startDayHour={10}
                    endDayHour={19}
                  />
                  <DayView
                    startDayHour={9}
                    endDayHour={14}
                  />
  
                  <Toolbar />
                  <DateNavigator />
                  <ViewSwitcher />
                  <Appointments />
                </Scheduler>
              </div>
            </div>
          </div>
        </div>)}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AppointmentsPage);