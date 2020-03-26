import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Box,
  Container,
} from "@material-ui/core";
import ImageUploader from 'react-images-upload';
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      padding: '10px 85px',
      width: 310,
      borderRadius: '30px',
      backgroundColor: '#ffe65e',
      textTransform: 'none',
      fontSize: '18px',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#ffe65e',
        color: '#ffffff',
      },
    },
});

const fileDropStyles = {
  fileContainer: {
    border: '3px solid #ffe65e',
    minHeight: 160,
    width: 310,
    backgroundColor: 'rgba(112,130,160,0.6)',
  },
  button: {
    height: '100%',
    width: '100%',
    fontSize: '22px',
    backgroundColor: 'transparent',
  },
}

const CustomH3 = withStyles({
  root: {
    color: '#ffffff !important',
    fontSize: 68,
    fontWeight: 400,
  },
})(Typography);

const CustomTextField = withStyles({
  root: {
    display: 'grid',
    maxWidth: 300,
    margin: 'auto',
    '& input': {
      color: '#ffffff',
    },
    '& label': {
      color: '#ffffff',
    },
    '& .MuiInput-underline:before': {
        borderBottom: '2px solid white',
    },
    '&:hover': {
      '& .MuiInput-underline:before': {
        borderBottom: '2px solid white',
      },
    },
  },
})(TextField);

class Signup extends PureComponent {
  state = { 
    loading: false,
    files: [],
    fileDataURLs: [],
    uploadDialogOpen: false,
  };

  componentDidMount() {
    const { selectTab } = this.props;
    selectTab('Register');
  }

  handleClose() {
    this.setState({
        uploadDialogOpen: false
    });
  }

  handleSave(files, fileDataURLs) {
    console.log(files);
    this.setState({
        files, 
        fileDataURLs,
        uploadDialogOpen: false
    });
  }

  handleOpen() {
    this.setState({
        uploadDialogOpen: true,
    });
  }

  register = () => {
    const { setStatus } = this.props;
    if (!this.registerTermsCheckbox.checked) {
      this.setState({ termsOfServiceError: true });
      return;
    }
    if (this.registerPassword.value !== this.registerPasswordRepeat.value) {
      setStatus("passwordsDontMatch");
      return;
    }
    setStatus(null);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  };

  render() {
    const {
      classes,
      onClose,
      status,
      setStatus
    } = this.props;
    const { loading } = this.state;
    return (
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <CustomH3 component="h1" variant="h2">
            Hackathon
          </CustomH3>
          <form className={classes.form} onSubmit={this.register} noValidate>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  inputRef={node => {
                    this.registerUsername = node;
                  }}
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  inputRef={node => {
                    this.registerEmail = node;
                  }}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  inputRef={node => {
                    this.registerPassword = node;
                  }}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  name="repeatpassword"
                  label="Repeat password"
                  inputRef={node => {
                    this.registerPasswordRepeat = node;
                  }}
                  type="password"
                  id="repeatpassword"
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    buttonStyles={fileDropStyles.button}
                    fileContainerStyle={fileDropStyles.fileContainer}
                    withLabel={false}
                    buttonText='Add picture'
                    onChange={this.handleSave.bind(this)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
              </Grid>
            </Grid>
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  selectTab: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default withRouter(withStyles(styles)(Signup));
