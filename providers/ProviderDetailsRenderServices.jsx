import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem } from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderServices");

const ProviderDetailsRenderServices = (props) => {
  _logger("rendering Services");

  if (props.providerServices) {
    return (
      <ListItem button className="align-box-row">
        <div className="align-box-row w-100">
          <div className="mr-3"></div>
          <div>
            <div className="font-weight-bold text-primary d-block">
              {`${props.providerServices.service.name}`}
            </div>
            <small className="text-success">
              <span>{`$${props.providerServices.price}`}</span>
            </small>
          </div>
          <div className="ml-auto card-hover-indicator align-self-center">
            <FontAwesomeIcon
              icon={["fas", "chevron-right"]}
              className="font-size-md"
            />
          </div>
        </div>
      </ListItem>
    );
  } else {
    return null;
  }
};

ProviderDetailsRenderServices.propTypes = {
  providerServices: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    service: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cpt4Code: PropTypes.number.isRequired,
    }),
    serviceType: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};
export default React.memo(ProviderDetailsRenderServices);
