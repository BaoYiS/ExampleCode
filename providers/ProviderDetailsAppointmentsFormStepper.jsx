import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  List,
  Divider,
  ListItem,
  Grid,
  GridList,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProviderDetailsRenderProviderServices from "@components/providers/ProviderDetailsRenderProviderServices";
import ProviderDetailsAppointmentsFormStepperFullDialog from "@components/providers/ProviderDetailsAppointmentsFormStepperFullDialog";
import scheduleService from "@services/scheduleService";
import * as appointmentService from "@services/providers/appointmentService.js";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsAppointmentsFormStepper");

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select an appointment date", "Select a service", "Checkout"];
}

export default function ProviderDetailsAppointmentsFormStepper(props) {
  const [checkoutFinished, setCheckoutFinished] = React.useState(false);

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    _logger("useEffect checkoutFinished", checkoutFinished);
    if (!isFirstRender.current) {
      onCheckoutFinished();
    }
  }, [checkoutFinished]);

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  const onCheckoutFinished = () => {
    _logger("ON CHECKOUT FINISHED", props);

    _logger(props.props.clickedAppointmentDetails.id);

    // look into props and filter through the props...scheduleData to find where
    // new Date(props...startTime & props...endTime) matches the date object data
    // gained on the initial click handler in RenderTimeslots

    let params = {
      id: props.props.clickedAppointmentDetails.id,
      payload: {
        Status: 2,
      },
    };

    updateStatusScheduleAvailability(params);
  };

  const updateStatusScheduleAvailability = (params) => {
    scheduleService
      .updateStatusScheduleAvailability(params)
      .then(onUpdateStatusScheduleAvailabilitySuccess)
      .catch(onUpdateStatusScheduleAvailabilityError);
  };

  const onUpdateStatusScheduleAvailabilitySuccess = (res) => {
    _logger(res);
    _logger('NOTES FOR PAYLOAD', props)

    let payload = {
      providerId: props.props.props.providerDetails.providerDetails.id,
      userId: 1,
      isConfirmed: true,
      startTime: props.props.clickedAppointmentDetails.startTime,
      serviceId: 12, //this will come back from props from purchase
      serviceTypeId: 3,
      endTime: props.props.clickedAppointmentDetails.endTime,
    };
    debugger

    addProviderAppointment(payload);

    //post to ProviderAppointment
  };

  const onUpdateStatusScheduleAvailabilityError = (err) => {
    _logger(err);
  };

  const addProviderAppointment = (payload) => {
    appointmentService
      .add(payload)
      .then(onAddProviderAppointmentSuccess)
      .catch(onAddProviderAppointmentError);
  };

  const onAddProviderAppointmentSuccess = (res) => {
    _logger(res);
  };

  const onAddProviderAppointmentError = (err) => {
    _logger(err);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Please add the appointment date you would like";
      case 1:
        return renderServices(props);
      // case 2:
      //   return "Please select a location";
      case 2:
        return checkoutWrapper(props, checkoutFinished, setCheckoutFinished);
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Thank you for scheduling your appointment! You will recieve an
              email shortly.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const renderServices = (props) => {
  let mappedProviderServices = props.mappedProviderServices;

  return (
    <Grid container spacing={4} className="mt-3">
      <Grid item xs={12} lg={12}>
        <GridList cols={3} cellHeight={"auto"} spacing={8}>
          {mappedProviderServices}
        </GridList>
      </Grid>
    </Grid>
  );
};

const checkoutWrapper = (props, checkoutFinished, setCheckoutFinished) => {
  _logger("checkoutFinished", checkoutFinished, props);

  return (
    <ProviderDetailsAppointmentsFormStepperFullDialog
      checkoutFinished={checkoutFinished}
      setCheckoutFinished={setCheckoutFinished}
      props={props}
    />
  );
};
ProviderDetailsAppointmentsFormStepper.propTypes = {
  toggleDialog: PropTypes.bool,
  setToggleDialogFunc: PropTypes.func,
  mappedProviderServices: PropTypes.arrayOf[PropTypes.shape({})],
  props: PropTypes.shape({
    clickedAppointmentDetails: PropTypes.shape({
      id: PropTypes.number,
      startTime: PropTypes.string,
      endTime: PropTypes.string
    }),
    props: PropTypes.shape({
      providerDetails: PropTypes.shape({
        providerDetails: PropTypes.shape({
          id: PropTypes.number
        })
      })
    })
  }),
};
