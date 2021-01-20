import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import ProviderDetailsAppointmentsFormStepper from "@components/providers/ProviderDetailsAppointmentsFormStepper";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsAppointmentsDialog");

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function ProviderDetailsAppointmentsDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // props.setToggleDialogFunc();
    _logger(`set toggle closed`);
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    _logger(
      "dialog window before isFirstRender useEffect",
      isFirstRender.current
    );
    if (!isFirstRender.current) {
      setOpen(true);

      _logger(`set toggle open`);
    }
  }, [props.toggleDialog]);

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Book an Appointment
        </DialogTitle>
        <DialogContent>
          <ProviderDetailsAppointmentsFormStepper
            mappedProviderServices={props.mappedProviderServices}
            props={props}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ProviderDetailsAppointmentsDialog.propTypes = {
  toggleDialog: PropTypes.bool,
  setToggleDialogFunc: PropTypes.func,
  mappedProviderServices: PropTypes.arrayOf(PropTypes.shape({})),
  // clickedAppointmentDetails: PropTypes.number
};
