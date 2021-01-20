import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab, Button, Tooltip } from "@material-ui/core";
import UserScheduleDialog from '@components/schedules/user/UserScheduleDialog';
import debug from "sabio-debug";

const _logger = debug.extend("ProviderDetailsRenderProfile");

const ProviderDetailsRenderProfile = (props) => {
  _logger("------------------------rendering profile", props);

  function onScheduleClicked(e) {
    e.preventDefault();
    _logger(e);
    props.fullProps.history.push(`/schedule`, {
      providerId: props.providerDetails.id,
    });
    _logger("passing props to schedules from profile", props.providerDetails.id)
    _logger("////////////////////onViewClick", props);
  }

  if (props.providerDetails) {
    return (
      <React.Fragment>
        <div className="d-flex align-items-start justify-content-between">
          <div className="avatar-icon-wrapper d-100">
            <span className="badge-circle badge badge-success">Online</span>
            <div className="avatar-icon d-100">
              <img
                alt="..."
                src={props.providerDetails.userProfile.avatarUrl}
              />
            </div>
          </div>
        </div>
        <div className="font-weight-bold font-size-lg d-flex align-items-center mt-2 mb-0">
          <span>
            {`
            ${props.providerDetails.titleType.name}
            ${props.providerDetails.userProfile.firstName} 
            ${props.providerDetails.userProfile.mi}. 
            ${props.providerDetails.userProfile.lastName}
            `}
          </span>
        </div>
        <div>
          <p className="mb-0 font-size-md text-white-50">
            {`Gender: ${props.providerDetails.genderType.name}`}
          </p>
          <p className="mb-4 font-size-md text-white-50">
            {`Accepting: ${props.providerDetails.professionalDetail.genderAccepted.name}`}
          </p>
        </div>
        <Button
          size="medium"
          variant="contained"
          color="secondary"
          className="mr-3"
          onClick={onScheduleClicked}
        >
          View Schedule (Provider)
        </Button>
        <UserScheduleDialog fullProps={props}/> 
        
   

        
        <Tooltip arrow title="Add to favourites">
          <Fab size="small" color="secondary">
            <FontAwesomeIcon icon={["fas", "star"]} />
          </Fab>
        </Tooltip>
        <div className="my-3 font-size-sm p-3 mx-4 bg-secondary rounded-sm">
          <div className="d-flex justify-content-between">
            <span className="font-weight-bold text-black-50">Phone:</span>
            <span className="text-black-50">{props.providerDetails.phone}</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span className="font-weight-bold text-black-50">Fax:</span>
            <span className="text-black-50">{props.providerDetails.fax}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="font-weight-bold text-black-50">Networks:</span>
            <span className="text-black-50">
              {props.providerDetails.networks}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

ProviderDetailsRenderProfile.propTypes = {
  providerDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    phone: PropTypes.number.isRequired,
    fax: PropTypes.string.isRequired,
    networks: PropTypes.string.isRequired,
    professionalDetail: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      npi: PropTypes.number.isRequired,
      genderAccepted: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      isAccepting: PropTypes.bool.isRequired,
    }),
    titleType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    userProfile: PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    genderType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default ProviderDetailsRenderProfile;
