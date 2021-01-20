import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, ListItem, Tooltip } from "@material-ui/core";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderPractices");

const ProviderDetailsRenderPractices = (props) => {
  _logger("rendering Practices");

  return (
    <ListItem className="hover-show-hide-container d-flex justify-content-between align-items-center py-3 border-0">
      <div className="font-weight-bold flex-grow-1">
        <div className="text-second font-size-lg">{props.practices.name}</div>
        <div className="text-center">
          <div className="font-weight-bold text-second">
            {`Address: 
                      ${props.practices.location.lineOne} 
                      ${props.practices.location.lineTwo} 
                      ${props.practices.location.city} 
                      ${props.practices.location.zip}, 
                      ${props.practices.location.state.name}`}
          </div>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.phone}</b>
            {props.practices.fax}
          </span>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.siteUrl}</b>
            {props.practices.email}
          </span>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.scheduleId}</b>
            {props.practices.email}
          </span>
        </div>
      </div>
      <div className="text-right hover-hide-wrapper">
        <div className="font-weight-bold text-second">{`Insurance Accepted: ${props.practices.insuranceAccepted}`}</div>
        <span className="opacity-7">{`ADA Accessible: ${props.practices.adaAccessible}`}</span>
      </div>

      <div className="text-right hover-show-wrapper">
        <Tooltip arrow title="View details">
          <IconButton className="bg-white text-first d-40 rounded-circle p-0 ml-1">
            <FontAwesomeIcon
              icon={["far", "user"]}
              className="font-size-md mx-auto"
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Remove">
          <IconButton className="bg-white text-danger d-40 rounded-circle p-0 ml-1">
            <FontAwesomeIcon
              icon={["fas", "times"]}
              className="font-size-md mx-auto"
            />
          </IconButton>
        </Tooltip>
      </div>
    </ListItem>
  );
};


ProviderDetailsRenderPractices.propTypes = {
  practices: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    fax: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
    facilityTypeId: PropTypes.number.isRequired,
    scheduleId: PropTypes.number.isRequired,
    adaAccessible: PropTypes.bool.isRequired,
    insuranceAccepted: PropTypes.bool.isRequired,
    genderAccepted: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      locationType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      state: PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
};

export default ProviderDetailsRenderPractices;
