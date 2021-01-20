import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderSpecializations");

const ProviderDetailsRenderSpecializations = (props) => {
  _logger("rendering Specializations");

  if (props.providerSpecializations) {
    return (
      <React.Fragment>
        <div className="py-2">
          <div className="align-box-row">
            <a className="avatar-icon-wrapper avatar-icon-md text-white"></a>
            <div className="pl-2">
              <span className="d-block">
                <a className="text-white">
                  {props.providerSpecializations.specialization.name}
                </a>
                <small className="d-block text-white-50">
                  {`Primary field of study: ${props.providerSpecializations.isPrimary}`}
                </small>
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

ProviderDetailsRenderSpecializations.propTypes = {
  providerSpecializations: PropTypes.shape({
    isPrimary: PropTypes.string.isRequired,
    specialization: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};
export default React.memo(ProviderDetailsRenderSpecializations);
