import React from "react";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const ProviderService = (props) => {
  const oneProviderService = props.providerService;
  if (props.providerService) {
    return (
      <Grid item xs={8} md={3} lg={3} xl={3}>
        <Paper className={props.classes.paper}>
          {oneProviderService.service.cpt4Code}
          <br></br>
          {oneProviderService.service.name}
          <br></br>
          {oneProviderService.serviceType.name}
          <br></br>
          {oneProviderService.price}
          <br></br>
        </Paper>
      </Grid>
    );
  }
};

ProviderService.propTypes = {
  providerService: PropTypes.shape({
    id: PropTypes.number.isRequired,
    providerId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    service: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cpt4Code: PropTypes.string.isRequired,
    }),
    serviceType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default React.memo(ProviderService);
