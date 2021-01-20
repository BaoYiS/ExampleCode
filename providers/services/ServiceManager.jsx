import React from "react";
import ProviderService from "./ProviderService";
import providerServiceService from "@services/providerServiceService";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import debug from "sabio-debug";
const _logger = debug.extend("ServiceManager");

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class ServiceManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.GetAllServicesByProviderId();
  }

  GetAllServicesByProviderId = () => {
    providerServiceService
      .GetByProviderId()
      .then(this.onGetByProviderIdSucesss)
      .catch(this.onGetByProviderIdError);
  };

  onGetByProviderIdSucesss = (response) => {
    const providerService = response.items;

    _logger(providerService);

    this.setState((prevState) => {
      return {
        mappedProviderServices: providerService.map(this.mapProviderService),
      };
    });
  };

  onGetByProviderIdError = (errResponse) => {
    _logger({ error: errResponse.config });
  };

  mapProviderService = (oneProviderService) => {
    return (
      <React.Fragment key={`ProviderServiceId-${oneProviderService.id}`}>
        <ProviderService
          providerService={oneProviderService}
          classes={this.props}
        />
      </React.Fragment>
    );
  };

  render() {
    const classes = this.props;
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <div className={classes.root}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Grid
              container
              spacing={1}
              alignContent="center"
              alignItems="center"
              wrap="wrap"
            >
              {this.state.mappedProviderServices}
            </Grid>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

ServiceManager.propTypes = {
  root: PropTypes.shape({
    flexGrow: PropTypes.number.isRequired,
  }),
  paper: PropTypes.shape({
    padding: PropTypes.number.isRequired,
    textAlign: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

export default withStyles(useStyles)(ServiceManager);
