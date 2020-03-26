import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Signup from "./signup/Signup";

function Routing(props) {
  const { blogPosts, selectTab } = props;

  return (
    <Switch>
      {/*
      {blogPosts.map(post => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.imageSrc}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(blogPost => blogPost.id !== post.id)}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectTab={selectTab}
        blogPosts={blogPosts}
      />
      */}
      <PropsRoute
        exact
        path="/signup"
        component={Signup}
        selectTab={selectTab}
      />
      <PropsRoute path="/" component={Home} selectTab={selectTab} />
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectTab: PropTypes.func.isRequired,
};

export default Routing;
