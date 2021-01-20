import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderAffiliations");

const ProviderDetailsRenderAffiliations = (props) => {
  _logger("rendering Affilations");

  if (props.affiliations) {
    return (
      <React.Fragment>
        <div className="py-2">
          <div className="align-box-row">
            <a className="avatar-icon-wrapper avatar-icon-md text-white"></a>
            <div className="pl-2">
              <span className="d-block">
                <a className="text-white">{props.affiliations.name}</a>
                <small className="d-block text-white-50">
                  {`(${props.affiliations.affiliationType.name})`}
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

ProviderDetailsRenderAffiliations.propTypes = {
  affiliations: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    affiliationType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};
export default React.memo(ProviderDetailsRenderAffiliations);
