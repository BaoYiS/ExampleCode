import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import debug from "sabio-debug";
const _logger = debug.extend("ProvidersRenderCards");

const ProvidersRenderCards = (props) => {
  _logger("rendering Provider Cards");

  const mapLanguages = (arr) => {
    return (
      <div
        key={`languagesCard-${arr.id}`}
        className="font-size-sm text-capitalize mb-1 opacity-8"
      >
        {arr.name}
      </div>
    );
  };
  const mapAffiliations = (arr) => {
    return (
      <div
        key={`affiliationsCard-${arr.id}`}
        className="font-size-sm text-capitalize mb-1 opacity-8"
      >
        {arr.name}
      </div>
    );
  };
  const mapLicenses = (arr) => {
    return (
      <div
        key={`licensesCard-${arr.id}`}
        className="font-size-sm text-capitalize mb-1 opacity-8"
      >
        {arr.licenseNumber}
      </div>
    );
  };
  const mapSpecializations = (arr) => {
    return (
      <div
        key={`specializationsCard-${arr.specialization.id}`}
        className="font-size-sm text-capitalize mb-1 opacity-8"
      >
        {arr.specialization.name}
      </div>
    );
  };

  const languageArray = props.providers.languages;
  const languageNames = languageArray.map(mapLanguages);

  const affiliationArray = props.providers.affiliations;
  const affiliationNames = affiliationArray.map(mapAffiliations);

  const licenseArray = props.providers.licenses;
  const licenseNames = licenseArray.map(mapLicenses);

  const specializationArray = props.providers.providerSpecializations;
  const specializationNames = specializationArray.map(mapSpecializations);

  function onViewClick(e) {
    e.preventDefault();
    _logger(e);
    props.history.push(`/provider/${props.providers.id}/details`, {
      providers: props.providers,
    });
    _logger("////////////////////onViewClick", props);
  }

  //need to create a component to hold the return, then create a ternary surrounding that component
  if (props.providers) {
    return (
      <React.Fragment>
        <Grid item xs={12} md={12} lg={12}>
          <Card className="card-box mb-4 pt-4">
            <div className="card-tr-actions">{/* <Checkbox /> */}</div>
            <div className="d-flex align-items-center px-4 mb-3">
              <div className="avatar-icon-wrapper rounded mr-3">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                  <div className="rounded overflow-hidden">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={props.providers.userProfile.avatarUrl}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100">
                <a className="font-weight-bold font-size-lg" title="...">
                  {`
                ${props.providers.titleType.name}
                ${props.providers.userProfile.firstName} 
                ${props.providers.userProfile.mi}. 
                ${props.providers.userProfile.lastName}
                `}
                </a>
                <span className="text-black-50 d-block pb-1">
                  {`Accepting: ${props.providers.professionalDetail.genderAccepted.name}`}
                </span>
                <div className="d-flex align-items-center pt-2">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className="mr-3"
                  >
                    Chat
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={onViewClick}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-3 font-size-sm p-3 mx-4 bg-secondary rounded-sm">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold text-black-50">Phone:</span>
                <span className="text-black-50">{props.providers.phone}</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="font-weight-bold text-black-50">Fax:</span>
                <span className="text-black-50">{props.providers.fax}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold text-black-50">
                  Networks:
                </span>
                <span className="text-black-50">
                  {props.providers.networks}
                </span>
              </div>
            </div>
            <div className="d-flex flex-wrap mb-1 mx-2">
              <div className="w-50 p-3">
                <Button
                  color="primary"
                  className="btn-gradient text-white bg-night-sky text-left px-4 py-3 w-100 rounded-lg"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={["far", "comment-dots"]}
                      className="font-size-xxl"
                    />
                    <div className="font-weight-bold">Languages</div>
                    <div className="font-size-sm text-capitalize mb-1 opacity-8">
                      {languageNames}
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-3">
                <Button
                  color="primary"
                  className="btn-gradient text-white bg-midnight-bloom text-left px-4 py-3 w-100 rounded-lg"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={["far", "building"]}
                      className="font-size-xxl"
                    />
                    <div className="font-weight-bold">Affiliations</div>
                    <div className="font-size-sm text-capitalize mb-1 opacity-8">
                      {affiliationNames}
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-3">
                <Button
                  color="primary"
                  className="btn-gradient text-white bg-vicious-stance text-left px-4 py-3 w-100 rounded-lg"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={["far", "object-group"]}
                      className="font-size-xxl"
                    />
                    <div className="font-weight-bold">Licenses</div>
                    <div className="font-size-sm text-capitalize mb-1 opacity-8">
                      {licenseNames}
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-3">
                <Button
                  color="primary"
                  className="btn-gradient text-white bg-royal text-left px-4 py-3 w-100 rounded-lg"
                >
                  <div>
                    <SchoolOutlinedIcon
                      color="#FFFFFF"
                      style={{ fontSize: 30 }}
                    />
                    {/* <SchoolOutlinedIcon color="action" style={{ fontSize: 30 }} /> */}
                    <div className="font-weight-bold">Specializations</div>
                    <div className="font-size-sm text-capitalize mb-1 opacity-8">
                      {specializationNames}
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

ProvidersRenderCards.propTypes = {
  providers: PropTypes.shape({
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
    affiliations: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      affiliationType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
    languages: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
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
    providerSpecializations: PropTypes.shape({
      isPrimary: PropTypes.string.isRequired,
      specialization: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
  }),
};
export default React.memo(ProvidersRenderCards);
