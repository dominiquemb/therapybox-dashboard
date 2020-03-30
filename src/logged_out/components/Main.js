import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import TabMetadata from "./navigation/TabMetadata";
import Background from "../../assets/background1.png";

AOS.init({ once: true });

const styles = theme => ({
  wrapper: {
    'background': `url(${Background})`,
    'overflowX': "hidden",
    'height': '100vh',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
  },
});

class Main extends PureComponent {
  state = {
    selectedTab: null,
    dialogOpen: null,
    cookieRulesDialogOpen: false
  };

  componentDidMount() {
  }

  selectPage = (tab) => {
    smoothScrollTop();
    const { title } = TabMetadata[tab];
    document.title = title;
    this.setState({ selectedTab: tab });
  };

  switchSelectedTab = tab => {
    this.setState({ selectedTab: tab });
  };

  handleCookieRulesDialogOpen = () => {
    this.setState({ cookieRulesDialogOpen: true });
  };

  handleCookieRulesDialogClose = () => {
    this.setState({ cookieRulesDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const {
      cookieRulesDialogOpen
    } = this.state;
    return (
      <div className={classes.wrapper}>
        {!cookieRulesDialogOpen && (
          <CookieConsent
            handleCookieRulesDialogOpen={this.handleCookieRulesDialogOpen}
          />
        )}
        <CookieRulesDialog
          open={cookieRulesDialogOpen}
          onClose={this.handleCookieRulesDialogClose}
        />
        <Routing
          selectTab={this.selectPage}
        />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
