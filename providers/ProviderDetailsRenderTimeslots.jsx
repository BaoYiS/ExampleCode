import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid, Badge, Card, CardContent, Button } from "@material-ui/core";

export default function ProviderDetailsRenderTimeslots(props) {
  

  const renderStatusSwitch = (scheduleData) => {


    let startTime = new Date(scheduleData.startTime).toLocaleTimeString()
    let endTime = new Date(scheduleData.endTime).toLocaleTimeString()


    switch (scheduleData.status) {
      case 1:
        return (
          // <Button onClick={props.onSelectEventHandler}>
          <Card className="card-box mb-4 bg-midnight-bloom">
            <div className="card-indicator bg-primary" />
            <CardContent className="px-4 py-3">
              <Button onClick={() => props.onSelectEventHandler(scheduleData)}>
              <div className="d-flex align-items-center justify-content-start">
                <span className="px-3 badge badge-primary">Available</span>
                <div className="font-size-sm text-white px-2">
                  <FontAwesomeIcon icon={["far", "clock"]} className="mr-1" />
                  {startTime} - {endTime}
                </div>
              </div>
              </Button>
            </CardContent>
          </Card>
        //  </Button>
        );

      case 2:
        return (
          <Card className="card-box mb-4 bg-midnight-bloom">
            <div className="card-indicator bg-danger" />
            <CardContent className="px-4 py-3">
              <div className="d-flex align-items-center justify-content-start">
                <span className="px-3 badge badge-danger">Booked</span>
                <div className="font-size-sm text-danger px-2">
                  <FontAwesomeIcon icon={["far", "clock"]} className="mr-1" />
                  {startTime} - {endTime}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return renderStatusSwitch(props.scheduleData);
}

ProviderDetailsRenderTimeslots.propTypes = {
    onSelectEventHandler: PropTypes.func,
  };
