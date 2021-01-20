import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderLicenses");

const ProviderDetailsRenderLicenses = (props) => {
  _logger("rendering Licenses");

  if (props.licenses) {
    return (
      <div className="py-2">
        <div className="align-box-row">
          <a className="avatar-icon-wrapper avatar-icon-md text-white"></a>
          <div className="pl-2">
            <span className="d-block">
              <a className="text-white">
                {`${props.licenses.state.name}: ${props.licenses.licenseNumber}`}
              </a>
              <small className="d-block text-white-50">
                {`(${props.licenses.dateExpires})`}
              </small>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

ProviderDetailsRenderLicenses.propTypes = {
  licenses: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    licenseNumber: PropTypes.string.isRequired,
    dateExpires: PropTypes.string.isRequired,
  }),
};
export default React.memo(ProviderDetailsRenderLicenses);
