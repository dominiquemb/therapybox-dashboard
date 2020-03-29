import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline, withStyles } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import history from './shared/functions/history';
import authenticationService from './shared/services/authentication.service';

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

const styles = theme => ({
  '@global': {
    html: {
      height: '100vh',
    },
    body: {
      height: '100vh',
    },
  },
});

const CustomCssBaseline = withStyles(styles, { withTheme: true })(CssBaseline);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
    }));
  }

  logout() {
      authenticationService.logout();
      history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);

    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <CustomCssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                  <LoggedInComponent />
              </Route>
              <Route> 
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </Router>
    );
  }
}

serviceWorker.register();

export default App;
