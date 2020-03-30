import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TextField, Checkbox, Grid, Box, isWidthUp, withWidth, withStyles, Link, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import authenticationService from '../../../shared/services/authentication.service';
import userService from '../../../shared/services/user.service';
import PieChart from 'react-minimal-pie-chart';

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
})(Typography)

const CustomCard = withStyles({
    root: {
        border: '3px solid #ffe65e',
        borderRadius: '7px',
        minHeight: 310,
        background: 'rgba(201,221,251,0.6)',
    }
})(Card);

const PhotoCard = withStyles({
    root: {
        height: '100%',
        width: '100%',
    }
})(Card);

const PhotoCardContent = withStyles({
  root: {
      display: 'flex',
      justifyContent: 'center',
  }
})(CardContent);

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

const TaskNumber = withStyles({
  root: {
      color: '#ffffff',
      fontSize: 16,
      paddingTop: 9,
  }
})(Typography);

const CustomTextField = withStyles({
  root: {
    display: 'flex-inline',
    flexGrow: 1,
    margin: 'auto',
    '& input': {
      color: '#ffffff',
    },
    '& label': {
      color: '#ffffff',
    },
    '& .MuiInput-underline:before': {
        borderBottom: '2px solid white',
    },
    '&:hover': {
      '& .MuiInput-underline:before': {
        borderBottom: '2px solid white',
      },
    },
  },
})(TextField);

const CustomCheckbox = withStyles({
  root: {
    display: 'flex-inline',
  },
})(Checkbox);

class Home extends PureComponent {
  state = {
    currentUser: authenticationService.currentUserValue,
    userFromApi: null,
    images: [],
    imagePreviews: [],
    tasks: [],
    taskPreviews: [],
    clothes: [],
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
            expandedUrl: '/c/news'
        },
        {
            id: 'sport',
            title: 'Sport',
            api: '',
            expandedUrl: '/c/sport'
        },
        {
            id: 'photos',
            title: 'Photos',
            api: '',
            expandedUrl: '/c/photos'
        },
        {
            id: 'tasks',
            title: 'Tasks',
            api: '',
            expandedUrl: '/c/tasks'
        },
        {
            id: 'clothes',
            title: 'Clothes',
            api: '',
        },
    ],
  };

  componentDidMount() {
    const { selectTab } = this.props;
    const { currentUser } = this.state;

    selectTab('Home');

    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    userService.getClothes(currentUser.id).then(clothes => this.setState({ clothes }));
    userService.getImages(currentUser.id).then(images => {
      let imagesCopy = images.slice();
      let imagePreviews = imagesCopy.splice(0,4);
      this.setState({ images, imagePreviews });
    });
    userService.getTasks(currentUser.id).then(tasks => {
      let tasksCopy = tasks.slice();
      let taskPreviews = tasksCopy.splice(0,3);
      this.setState({ tasks, taskPreviews });
    });
  }

  getClothesWidget = () => {
    const { clothes } = this.state;
    console.log(clothes);
    return (
      <PieChart
        animate={true}
        animationDuration={500}
        animationEasing="ease-out"
        cx={50}
        cy={50}
        data={clothes}
        label={(item) => {
          const { dataIndex, data } = item;
          const itemDetails = data[dataIndex];
          let { title, percentage } = itemDetails;
          title = title[0].toUpperCase() + title.substring(1);
          percentage = percentage.toFixed();
          return `${title} ${percentage}%`;
        }}
        labelPosition={50}
        labelStyle={{
          fontFamily: 'sans-serif',
          fontSize: '3px',
          fill: '#000000',
        }}
        lengthAngle={360}
        lineWidth={100}
        onClick={undefined}
        onMouseOut={undefined}
        onMouseOver={undefined}
        paddingAngle={0}
        radius={42}
        rounded={false}
        startAngle={0}
        viewBoxSize={[
          100,
          100
        ]}
      />
    );
  }

  getPhotosWidget = () => {
    const { imagePreviews } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={2} alignItems="stretch">
        { imagePreviews.map(image => (
        <Grid key={image.id} item xs={12} sm={6}>
          <PhotoCard>
            <PhotoCardContent>
              <img src={image.pic} className={classes.photo} alt={image.name} />
            </PhotoCardContent>
          </PhotoCard>
        </Grid>
        ))}
        { !imagePreviews.length && (
          <Grid key="no-photos" item xs={12} sm={6}>
            <span>
              No images to show. Click here to add some.
            </span>
          </Grid>
        )}
      </Grid>
    );
  }

  getTaskRows = () => {
    const { taskPreviews } = this.state;
    const gridRows = [];
    taskPreviews.forEach((task, index) => {
        gridRows.push(
            <Grid key={task.id} item xs={12}>
                <Box display="flex" mb={3}>
                    <TaskNumber variant="body1">{index+1}.&nbsp;</TaskNumber>
                    <CustomTextField
                        required
                        fullWidth
                        disabled
                        id={task.id}
                        value={task.description}
                        name={task.id}
                    />
                    <CustomCheckbox
                        color="secondary"
                        disabled
                        checked={task.completed}
                        inputProps={{ 'aria-label': 'completion status' }}
                    />
                </Box>
            </Grid>
        );
    });
    return gridRows.map((element, index) => (
      <Grid key={index} item xs={12}>
        {element}
      </Grid>
    ));
  };

  getTasksWidget = () => {
    const { tasks } = this.state;
    return (
      <div class="tasks-container">
        <Grid container spacing={3}>
            {this.getTaskRows()}
            { !tasks.length && 
              <Grid key="no-tasks" item xs={12} sm={6}>
                <span>
                  No tasks to show. Click here to add some.
                </span>
              </Grid>
            }
        </Grid>
      </div>
    )
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
            html = '';
            break;
        case 'photos':
            html = this.getPhotosWidget();
            break;
        case 'tasks':
            html = this.getTasksWidget();
            break;
        case 'clothes':
            html = this.getClothesWidget();
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
