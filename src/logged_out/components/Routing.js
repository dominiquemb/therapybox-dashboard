import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Signup from "./signup/Signup";
import Login from "./login/Login";

function Routing(props) {
  const { blogPosts, selectTab } = props;

  return (
    <Switch>
      <PropsRoute
        exact
        path="/signup"
        component={Signup}
        selectTab={selectTab}
      />
      <PropsRoute
        exact
        path="/login"
        component={Login}
        selectTab={selectTab}
      />
      <PropsRoute path="/" component={Login} selectTab={selectTab} />
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectTab: PropTypes.func.isRequired,
};

export default Routing;
