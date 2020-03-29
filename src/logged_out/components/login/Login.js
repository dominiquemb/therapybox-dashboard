import React, { PureComponent, Fragment } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
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
      marginTop: 100,
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
    footer: {
        padding: 50,
        fontSize: 23,
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
    },
});

const SignupLink = withStyles({
  root: {
      color: '#ffe65e',
  },
})(Link);

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

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { 
      loading: false,
      errorMessage: false,
      files: [],
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
    selectTab('Login');
  }

  login = (evt) => {
    evt.preventDefault();
    
    const { history } = this.props;
    let { errorMessage } = this.state;

    this.setState({
      loading: true
    });
    //setStatus(null);
    authenticationService.login(this.loginUsername.value, this.loginPassword.value)
      .then(
          user => {
              const { from } = this.props.location.state || { from: { pathname: "/c/home" } };
              history.push(from);
          },
          error => {
              //setSubmitting(false);
              //setStatus(error);
              this.setState({ errorMessage });
          }
      );
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
          
          {/* <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required')
            })}
            onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
              console.log('????');
              setStatus();
              authenticationService.login(username, password)
                  .then(
                      user => {
                          //const { from } = this.props.location.state || { from: { pathname: "/" } };
                          this.props.history.push("/c/home");
                      },
                      error => {
                          setSubmitting(false);
                          setStatus(error);
                      }
                  );
            }}
            >
              {formik => (
              <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={10}>
                <CustomGridItem item xs={12} sm={6}>
                <label htmlFor="username">Username</label>
          <input id="username" {...formik.getFieldProps('username')} />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input id="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
                </CustomGridItem>
                <CustomGridItem item xs={12} sm={6}>
                </CustomGridItem>
              </Grid>
              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </div>
              { status &&
                <div className={'alert alert-danger'}>{status}</div>
              }
              </form>
            )}
          </Formik> */}

          <form className={classes.form} onSubmit={this.login} noValidate>
            <Grid container spacing={10}>
              <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  inputRef={node => {
                    this.loginUsername = node;
                  }}
                  name="username"
                  autoComplete="username"
                />
              </CustomGridItem>
              <CustomGridItem item xs={12} sm={6}>
                <CustomTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  inputRef={node => {
                    this.loginPassword = node;
                  }}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </CustomGridItem>
            </Grid>
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </div>
            {errorMessage &&
              <div className={'alert alert-danger'}>{errorMessage}</div>
            }
          </form>
        </div>
        <footer className={classes.footer}>
            {"New to the Hackathon?"}
            &nbsp;
            <SignupLink 
                href="/signup"
            >
                {"Sign up"}
            </SignupLink>
        </footer>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  selectTab: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default withRouter(withStyles(styles)(Login));
