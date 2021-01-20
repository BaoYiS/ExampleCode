import React from "react";
import PropTypes from "prop-types";
import { Card, List, Divider, ListItem } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderProviderServices");

const ProviderDetailsRenderProviderServices = (props) => {
  _logger("rendering ProviderServices");
  _logger(props.medicalServiceType)
  _logger(props)

  if (props.medicalServiceTypes) {
    return (
      <Card className="card-box">
        <div className="bg-composed-wrapper bg-midnight-bloom mt-0">
          <div className="bg-composed-wrapper--image bg-composed-img-2" />
          <div className="bg-composed-wrapper--content text-light p-3">
            <h6 className="mb-1 font-weight-bold">
              {`${props.medicalServiceTypes.name}`}
            </h6>
            <p className="mb-0 opacity-7"></p>
          </div>
        </div>
        <List>
          <div className="scroll-area shadow-overflow">
            <PerfectScrollbar>
              {props.medicalServiceTypes.list.map((item) => {
                return (
                  <div key={`serviceDetails-${props.medicalServiceTypes.list.id}`}>
                    <ListItem button className="align-box-row">
                      <div className="align-box-row w-100">
                        <div className="mr-3"></div>
                        <div>
                          <div className="font-weight-bold text-primary d-block">
                            {`${item.medicalService.name}`}
                          </div>
                          <small className="text-success">
                            <span>{`$${item.price}`}</span>
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
                  </div>
                );
              })}
              <Divider />
            </PerfectScrollbar>
          </div>
        </List>
        <div className="card-footer bg-midnight-bloom text-center"></div>
      </Card>
    );
  } else {
    return <p>ruh roh</p>;
  }
};

ProviderDetailsRenderProviderServices.propTypes = {
  medicalServiceTypes: PropTypes.shape({
    list: PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      medicalService: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cpt4Code: PropTypes.number.isRequired,
      }),
      medicalServiceType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
    name: PropTypes.string,
  }),
};
export default React.memo(ProviderDetailsRenderProviderServices);
