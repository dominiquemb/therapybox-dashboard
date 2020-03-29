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
import authenticationService from '../../../shared/services/authentication.service';
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
      color: '#000000',
      '&:hover': {
        backgroundColor: '#ffe65e',
        color: '#000000',
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
    marginBottom: 45,
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

const CustomGridItem = withStyles({
  root: {
    padding: '25px !important',
  },
})(Grid);

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      files: [],
      errorMessage: false,
      fileDataURLs: [],
      uploadDialogOpen: false,
    };

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) { 
      this.props.history.push('/c/home');
    }
  }

  componentDidMount() {
    const { selectTab } = this.props;
    selectTab('Register');
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async handleSave(files, fileDataURLs) {
    // let newFiles = [];
    // await Promise.all(files.map(async (file) => {
    //     let newObj = {};
    //     newObj.name = file.name;
    //     newObj.type = file.type;
    //     this.toBase64(file).then(result => {
    //       newObj.base64 = result; 
    //     });

    //     newFiles.push(newObj);
    //     return newObj;
    //   })
    // );

    this.setState({
        files,
        fileDataURLs,
        uploadDialogOpen: false
    });
  }

  register = (evt) => {
    evt.preventDefault();
    const { setStatus, history } = this.props;
    let { errorMessage, files } = this.state;

    if (this.registerPassword.value !== this.registerPasswordRepeat.value) {
      //setStatus("passwordsDontMatch");
      errorMessage = "Passwords don't match";
      return;
    }

    //setStatus(null);
    this.setState({ loading: true });

    authenticationService.register({
      firstName: this.registerFirstName.value,
      lastName: this.registerLastName.value,
      username: this.registerUsername.value,
      email: this.registerEmail.value,
      images: files,
      password: this.registerPassword.value,
    })
    .then(
        user => {
            const { from } = this.props.location.state || { from: { pathname: "/c/home" } };
            history.push(from);
        },
        error => {
            //setSubmitting(false);
            //setStatus(error);
            errorMessage = error;
        }
    );
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
    const { loading, errorMessage } = this.state;
    return (
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <CustomH3 component="h1" variant="h2">
            Hackathon
          </CustomH3>
          <form className={classes.form} onSubmit={this.register} noValidate>
            <Grid container spacing={10}>
            <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="first_name"
                  label="First name"
                  inputRef={node => {
                    this.registerFirstName = node;
                  }}
                  name="firstName"
                  autoComplete="firstName"
                />
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last name"
                  inputRef={node => {
                    this.registerLastName = node;
                  }}
                  name="lastName"
                  autoComplete="lastName"
                />
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
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
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  inputRef={node => {
                    this.registerEmail = node;
                  }}
                  name="email"
                  autoComplete="email"
                />
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
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
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  name="repeatpassword"
                  label="Confirm password"
                  inputRef={node => {
                    this.registerPasswordRepeat = node;
                  }}
                  type="password"
                  id="repeatpassword"
                />
              </CustomGridItem>
              <CustomGridItem item xs={12}>
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
              </CustomGridItem>
            </Grid>
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              {errorMessage &&
              <div className={'alert alert-danger'}>{errorMessage}</div>
            }
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
