import React, { PureComponent, Fragment } from "react";
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
  state = { 
    loading: false,
    files: [],
    fileDataURLs: [],
    uploadDialogOpen: false,
  };

  componentDidMount() {
    const { selectTab } = this.props;
    selectTab('Login');
  }

  login = () => {
    const { setStatus, history } = this.props;
    this.setState({
      loading: true
    });
    setStatus(null);
    if (this.loginEmail.value !== "test@web.com") {
      setTimeout(() => {
        setStatus("invalidEmail");
        this.setState({
          loading: false
        });
      }, 1500);
    } else if (this.loginPassword.value !== "test") {
      setTimeout(() => {
        setStatus("invalidPassword");
        this.setState({
          loading: false
        });
      }, 1500);
    } else {
      setTimeout(() => {
        history.push("/c/dashboard");
      }, 150);
    }
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
