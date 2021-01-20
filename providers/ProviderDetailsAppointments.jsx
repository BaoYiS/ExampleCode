import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ProviderDetailsRenderTimeslots from "@components/providers/ProviderDetailsRenderTimeslots";
import scheduleService from "@services/scheduleService";
import ProviderDetailsAppointmentsDialog from "@components/providers/ProviderDetailsAppointmentsDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid, Badge, Card, CardContent } from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsAppointments");

export default function ProviderDetailsAppointments(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [mappedData, setMappedData] = React.useState([]);
  const [toggleDialog, setToggleDialog] = React.useState(false);
  const [clickedAppointmentDetails, setClickedAppointmentDetails] = React.useState({})

  React.useEffect(() => {
    _logger("useEffect toggleDialog", toggleDialog);
  }, [toggleDialog]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const mappingScheduleData = (scheduleData) => {
    return (
      <div key={`scheduleDataTimeslot-${scheduleData.id}`}>
        <ProviderDetailsRenderTimeslots
          scheduleData={scheduleData}
          onSelectEventHandler={onSelectEventHandler}
          handleClickOpen={handleClickOpen}
          props={props}
        />
      </div>
    );
  };

  //   let mappedScheduleData = props.scheduleData.map(mappingScheduleData)

  let sundaySchedule = [];
  let mondaySchedule = [];
  let tuesdaySchedule = [];
  let wednesdaySchedule = [];
  let thursdaySchedule = [];
  let fridaySchedule = [];
  let saturdaySchedule = [];

  //   _logger("sundaySchedule", sundaySchedule);
  //   _logger("mondaySchedule", mondaySchedule);
  //   _logger("tuesdaySchedule", tuesdaySchedule);
  //   _logger("wednesdaySchedule", wednesdaySchedule);
  //   _logger("thursdaySchedule", thursdaySchedule);
  //   _logger("fridaySchedule", fridaySchedule);
  //   _logger("saturdaySchedule", saturdaySchedule);

  React.useEffect(() => {
    dayOfWeekSwitch(props.scheduleData);
  }, [toggleDialog]);

  const dayOfWeekSwitch = (scheduleDataProps) => {
    scheduleDataProps.forEach((scheduleObject) => {
      switch (scheduleObject.dayOfWeek) {
        case 0:
          sundaySchedule.push(scheduleObject);
          break;

        case 1:
          mondaySchedule.push(scheduleObject);
          break;

        case 2:
          tuesdaySchedule.push(scheduleObject);
          break;

        case 3:
          wednesdaySchedule.push(scheduleObject);
          break;

        case 4:
          thursdaySchedule.push(scheduleObject);
          break;

        case 5:
          fridaySchedule.push(scheduleObject);
          break;

        case 6:
          saturdaySchedule.push(scheduleObject);
          break;

        default:
          break;
      }

      _logger("sundaySchedule", sundaySchedule);
      _logger("mondaySchedule", mondaySchedule);
      _logger("tuesdaySchedule", tuesdaySchedule);
      _logger("wednesdaySchedule", wednesdaySchedule);
      _logger("thursdaySchedule", thursdaySchedule);
      _logger("fridaySchedule", fridaySchedule);
      _logger("saturdaySchedule", saturdaySchedule);

      let mappedSundaySchedule = sundaySchedule.map(mappingScheduleData);
      let mappedMondaySchedule = mondaySchedule.map(mappingScheduleData);
      let mappedTuesdaySchedule = tuesdaySchedule.map(mappingScheduleData);
      let mappedWednesdaySchedule = wednesdaySchedule.map(mappingScheduleData);
      let mappedThursdaySchedule = thursdaySchedule.map(mappingScheduleData);
      let mappedFridaySchedule = fridaySchedule.map(mappingScheduleData);
      let mappedSaturdaySchedule = saturdaySchedule.map(mappingScheduleData);

      let settingMappedDataToState = {
        mappedSundaySchedule,
        mappedMondaySchedule,
        mappedTuesdaySchedule,
        mappedWednesdaySchedule,
        mappedThursdaySchedule,
        mappedFridaySchedule,
        mappedSaturdaySchedule,
      };

      setMappedData(settingMappedDataToState);
    });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const onSelectEventHandler = React.useCallback(
  //   (scheduleData) => {
  //     _logger(scheduleData, toggleDialog);
  //     setToggleDialog(!toggleDialog)


  //   },
  //   [toggleDialog, setToggleDialog],
  // );


  const onSelectEventHandler = (scheduleData) =>
  {
    _logger('onSelectEventHandler', scheduleData);
    debugger

    let appointmentDetails = 
    {
      id: scheduleData.id,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
    }

    setClickedAppointmentDetails(appointmentDetails)
    setToggleDialog(!toggleDialog)
  }

  return (
    <Fragment>
      <ProviderDetailsAppointmentsDialog
        toggleDialog={toggleDialog}
        setToggleDialogFunc={onSelectEventHandler}
        mappedProviderServices={props.mappedProviderServices}
        props={props}
        clickedAppointmentDetails={clickedAppointmentDetails}
      />
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        // className="bg-midnight-bloom"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Sunday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedSundaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>Monday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedMondaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography>Tuesday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedTuesdaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Wednesday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedWednesdaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography>Thursday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedThursdaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography>Friday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedFridaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography>Saturday</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                {mappedData.mappedSaturdaySchedule}
              </Grid>
            </Grid>
          </Fragment>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
}

ProviderDetailsAppointments.propTypes = {
  scheduleData: PropTypes.arrayOf[PropTypes.shape({})],
  mappedProviderServices: PropTypes.arrayOf[PropTypes.shape({})],
};

{
  /*   
        <Grid item xs={12} sm={6} lg={12}>
          <Card className="card-box mb-4">
            <div className="card-indicator bg-first" />
            <CardContent className="px-4 py-3">
              <div className="d-flex align-items-center justify-content-start">
                <div className="badge badge-primary px-3">On Hold</div>
                <div className="font-size-sm text-danger px-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  14:22
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Card className="card-box mb-4">
            <div className="card-indicator bg-info" />
            <CardContent className="px-4 py-3">
             
              <div className="d-flex align-items-center justify-content-start">
                <Badge color="primary" className="px-3">
                  Processed
                </Badge>
                <div className="font-size-sm text-dark px-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  17:56
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Card className="card-box mb-4 bg-midnight-bloom">
            <div className="card-indicator bg-success" />
            <CardContent className="px-4 py-3">
              
              <div className="d-flex align-items-center justify-content-start">
                <div className="px-3 badge badge-success">Fixed</div>
                <div className="font-size-sm text-dark px-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  09:41
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
         */
}
