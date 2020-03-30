import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Home from "./home/Home";
import Photos from "./photos/Photos";
import Tasks from "./tasks/Tasks";
import Sport from "./sport/Sport";
import PrivateRoute from "../../shared/components/PrivateRoute";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

function Routing(props) {
  const {
    classes,
    selectTab,
  } = props;
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PrivateRoute
          path="/c/home"
          component={Home}
          selectTab={selectTab}
        />
        <PrivateRoute
          path="/c/photos"
          component={Photos}
          selectTab={selectTab}
        />
        <PrivateRoute
          path="/c/tasks"
          component={Tasks}
          selectTab={selectTab}
        />
        <PrivateRoute
          path="/c/sport"
          component={Sport}
          selectTab={selectTab}
        />
        <PrivateRoute
          path=""
          component={Home}
          selectTab={selectTab}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Routing);
