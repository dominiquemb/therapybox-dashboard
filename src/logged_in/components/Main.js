import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import TabMetadata from "./navigation/TabMetadata";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import Background from "../../assets/background1.png";

const styles = theme => ({
  main: {
    'background': `url(${Background})`,
    'overflowX': "hidden",
    'height': '100vh',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    // 'marginLeft': theme.spacing(9),
    'transition': theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

class Main extends PureComponent {
  state = {
    selectedTab: null
  };

  componentDidMount() {
  }

  /**
   * We have to call the pushSnackBarMessage function of this
   * child's consecutiveSnackbarMessages component. Thats why we pass it
   * when the component did mount to this components state.
   */
  getPushMessageFromChild = pushFunction => {
    this.pushMessageToSnackbar = pushFunction;
  };

  selectPage = (tab) => {
    smoothScrollTop();
    const { title } = TabMetadata[tab];
    document.title = title;
    this.setState({ selectedTab: tab });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ConsecutiveSnackbarMessages
          getPushMessageFromChild={this.getPushMessageFromChild}
        />
        <main className={classNames(classes.main)}>
          <Routing
            selectTab={this.selectPage}
          />
        </main>
      </Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
