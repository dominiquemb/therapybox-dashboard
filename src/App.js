import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline, withStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";

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

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

serviceWorker.register();

export default App;
