import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home.js";
import Posts from "./posts/Posts";
import Subscription from "./subscription/Subscription";
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
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    transactions,
    handleNumberChange,
    handleSwitchToggle,
    handleSelectChange,
    toggleAccountActivation,
    CardChart,
    statistics,
    targets,
    isAccountActivated,
    selectTab,
    selectDashboard,
    selectPosts,
    selectSubscription,
    openAddBalanceDialog
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
          path=""
          component={Home}
          selectTab={selectTab}
          // handleNumberChange={handleNumberChange}
          // handleSwitchToggle={handleSwitchToggle}
          // handleSelectChange={handleSelectChange}
          // toggleAccountActivation={toggleAccountActivation}
          // pushMessageToSnackbar={pushMessageToSnackbar}
          // CardChart={CardChart}
          // statistics={statistics}
          // targets={targets}
          // isAccountActivated={isAccountActivated}
          // selectDashboard={selectDashboard}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  pushMessageToSnackbar: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleNumberChange: PropTypes.func,
  handleSwitchToggle: PropTypes.func,
  handleSelectChange: PropTypes.func,
  toggleAccountActivation: PropTypes.func,
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectPosts: PropTypes.func.isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Routing);
