import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box, isWidthUp, withWidth, withStyles, Link, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import authenticationService from '../../../shared/services/authentication.service';
import userService from '../../../shared/services/user.service';

//import BlogCard from "./BlogCard";

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
  noDecoration: {
    textDecoration: "none !important"
  },
});

const PageTitle = withStyles({
    root: {
        color: '#ffffff',
        fontWeight: 400,
    }
})(Typography)

const CustomCard = withStyles({
    root: {
        border: '3px solid #ffe65e',
        borderRadius: '7px',
        minHeight: 310,
        background: 'rgba(201,221,251,0.6)',
    }
})(Card);

const CustomLink = withStyles({
    root: {
        '&:hover': {
            textDecoration: 'none',
        },
    }
})(Link);

const CustomCardHeader = withStyles({
    root: {
        background: '#ffe65e',
        color: '#000000',
        textAlign: 'center',
    }
})(CardHeader);

class Home extends PureComponent {
  state = {
    currentUser: authenticationService.currentUserValue,
    userFromApi: null,
    widgets: [
        {
            id: 'weather',
            title: 'Weather',
            api: '',
        },
        {
            id: 'news',
            title: 'News',
            api: '',
            expandedUrl: '/news'
        },
        {
            id: 'sport',
            title: 'Sport',
            api: '',
            expandedUrl: '/sport'
        },
        {
            id: 'photos',
            title: 'Photos',
            api: '',
            expandedUrl: '/photos'
        },
        {
            id: 'tasks',
            title: 'Tasks',
            api: '',
            expandedUrl: '/tasks'
        },
        {
            id: 'clothes',
            title: 'Clothes',
            api: '',
            expandedUrl: '/clothes',
        },
    ],
  };

  componentDidMount() {
    const { selectTab } = this.props;
    const { currentUser } = this.state;

    selectTab('Home');

    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
  }

  getWeatherWidget = () => {
      let location = false;
      let latitude = false;
      let longitude = false;
      if (window.navigator && window.navigator.geolocation) {
        location = window.navigator.geolocation
    }
    if (location){
        console.log(location);
        location.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude= position.coords.longitude;
            console.log(latitude);
            console.log(longitude);
        })
    }
    // return !this.props.isGeolocationAvailable ? (
    //     <div>Your browser does not support Geolocation</div>
    // ) : !this.props.isGeolocationEnabled ? (
    //     <div>Geolocation is not enabled</div>
    // ) : this.props.coords ? (
    //     <table>
    //         <tbody>
    //             <tr>
    //                 <td>latitude</td>
    //                 <td>{this.props.coords.latitude}</td>
    //             </tr>
    //             <tr>
    //                 <td>longitude</td>
    //                 <td>{this.props.coords.longitude}</td>
    //             </tr>
    //             <tr>
    //                 <td>altitude</td>
    //                 <td>{this.props.coords.altitude}</td>
    //             </tr>
    //             <tr>
    //                 <td>heading</td>
    //                 <td>{this.props.coords.heading}</td>
    //             </tr>
    //             <tr>
    //                 <td>speed</td>
    //                 <td>{this.props.coords.speed}</td>
    //             </tr>
    //         </tbody>
    //     </table>
    // ) : (
    //     <div>Getting the location data&hellip; </div>
    // );
  }

  getWidgetHtml = (id) => {
    let html = '';
    switch(id) {
        case 'weather':
            html = this.getWeatherWidget();
            break;
        case 'news': 
            html = 'News';
            break;
        default: 
            html = '';
    }
    return html;
  }

  getWidgets = () => {
    const { classes, width } = this.props;
    const { widgets } = this.state;
    const gridRows = [[], [], []];
    let rows;
    let xs;
    if (isWidthUp("md", width)) {
      rows = 3;
      xs = 4;
    } else if (isWidthUp("sm", width)) {
      rows = 2;
      xs = 6;
    } else {
      rows = 1;
      xs = 12;
    }
    widgets.forEach((widget, index) => {
      gridRows[index % rows].push(
        <Grid key={widget.id} item xs={12}>
          <Box mb={3}>
            <CustomLink href={widget.expandedUrl ? widget.expandedUrl : '#'}>
                <CustomCard>
                    <CustomCardHeader title={widget.title} />
                    <CardContent>
                        {this.getWidgetHtml(widget.id)}
                    </CardContent>
                </CustomCard>
            </CustomLink>
          </Box>
        </Grid>
      );
    });
    return gridRows.map((element, index) => (
      <Grid key={index} item xs={xs}>
        {element}
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;
    const { userFromApi } = this.state;

    return (
        <div className={classes.homeWrapper}>
        <PageTitle variant="h2" align="center">Good day { userFromApi ? userFromApi.first_name : ''}</PageTitle>
        <Box
            display="flex"
            justifyContent="center"
            className={classNames(classes.wrapper/*, "lg-p-top"*/)}
        >
            <div className={classes.blogContentWrapper}>
            <Grid container spacing={3}>
                {this.getWidgets()}
            </Grid>
            </div>
        </Box>
        </div>
    );
  }
}

Home.propTypes = {
  selectTab: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Home)));
