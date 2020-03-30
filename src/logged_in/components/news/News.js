import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Checkbox, Button, TextField, Grid, Box, ListItemText, withWidth, withStyles, Link, Typography, Card, CardContent, CardHeader, ListItem, List } from "@material-ui/core";
import userService from '../../../shared/services/user.service';

const styles = theme => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
    marginTop: 50,
  },
  photo: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
  noDecoration: {
    textDecoration: "none !important"
  },
});

const PageTitle = withStyles({
    root: {
        color: '#ffffff',
        fontWeight: 400,
    }
})(Typography);

class News extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
            news: {},
      };
  }
  componentDidMount() {
    const { selectTab } = this.props;

    selectTab('News');

    userService.getNews().then(news => this.setState({ news }));
  }

  render() {
    const { classes } = this.props;
    const { news } = this.state;

    return (
        <div className={classes.homeWrapper}>
            <PageTitle variant="h2" align="center">Latest News</PageTitle>
            <Box
                display="flex"
                justifyContent="center"
                className={classNames(classes.wrapper)}
            >
                <div className={classes.blogContentWrapper}>
                    <Typography variant="h2">{news.title}</Typography>
                    <Typography variant="body1">{news.description}</Typography>
                </div>
            </Box>
        </div>
    );
  }
}

News.propTypes = {
  selectTab: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(News));
