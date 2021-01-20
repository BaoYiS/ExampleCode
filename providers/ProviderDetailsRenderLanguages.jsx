import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderLanguages");

const ProviderDetailsRenderLanguages = (props) => {
  _logger("rendering Languages");

  if (props.languages) {
    return (
      <div className="py-2">
        <div className="align-box-row">
          <a className="avatar-icon-wrapper avatar-icon-md text-white"></a>
          <div className="pl-2">
            <span className="d-block">
              <a className="text-white">{props.languages.name}</a>
              <small className="d-block text-white-50">
                {`(${props.languages.code})`}
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

ProviderDetailsRenderLanguages.propTypes = {
  languages: PropTypes.shape({
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
export default React.memo(ProviderDetailsRenderLanguages);
