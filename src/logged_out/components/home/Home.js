import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";

class Home extends PureComponent {
  componentDidMount() {
    const { selectTab } = this.props;
    selectTab('Home');
  }

  render() {
    return (
      <Fragment>
        <HeadSection />
        <FeatureSection />
        <PricingSection />
      </Fragment>
    );
  }
}

Home.propTypes = {
  selectTab: PropTypes.func.isRequired
};

export default Home;
