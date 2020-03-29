import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box, isWidthUp, withWidth, withStyles, Link, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import authenticationService from '../../../shared/services/authentication.service';
import userService from '../../../shared/services/user.service';
import ImageUploader from 'react-images-upload';

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

const fileDropStyles = {
    fileContainer: {
      border: '3px solid #ffe65e',
      minHeight: 160,
      width: 310,
      backgroundColor: 'rgba(112,130,160,0.6)',
    },
    button: {
      height: '100%',
      width: '100%',
      fontSize: 142,
      backgroundColor: 'transparent',
    },
}

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

const PhotoCardContent = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
    }
  })(CardContent);

class Photos extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
            images: [],
            errorMessage: false,
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            files: [],
      };
  }
  componentDidMount() {
    const { selectTab } = this.props;
    const { currentUser } = this.state;

    selectTab('Photos');

    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    userService.getImages(currentUser.id).then(images => {
      this.setState({ images });
    });
  }

  async handleSave(files, fileDataURLs) {
    this.setState({
        files
    });
    this.addPic(files);
  }

  addPic = (files) => {
    let { currentUser, errorMessage, userFromApi } = this.state;

    userService.addImages({
      id: userFromApi.id,
      images: files,
    })
    .then(
        result => {
            userService.getImages(currentUser.id).then(images => {
                this.setState({ images });
            });
        },
        error => {
            //setSubmitting(false);
            //setStatus(error);
            this.setState({ errorMessage });
        }
    );
  }

  getPhotoBoxes = () => {
    const { classes, width } = this.props;
    const { images } = this.state;
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
    images.forEach((image, index) => {
      if (index > 0) {
        gridRows[index % rows].push(
            <Grid key={image.id} item xs={12}>
            <Box mb={3}>
                <CustomCard>
                    <PhotoCardContent>
                        <img src={image.pic} className={classes.photo} alt={image.name} />
                    </PhotoCardContent>
                </CustomCard>
            </Box>
            </Grid>
        );
      } else {
        gridRows[index % rows].push(
            <Grid key="add" item xs={12}>
            <Box mb={3}>
                <CustomCard>
                    <PhotoCardContent>
                        <ImageUploader
                            withIcon={false}
                            withPreview={true}
                            buttonStyles={fileDropStyles.button}
                            fileContainerStyle={fileDropStyles.fileContainer}
                            withLabel={false}
                            buttonText='+'
                            onChange={this.handleSave.bind(this)}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </PhotoCardContent>
                </CustomCard>
            </Box>
            </Grid>
        );
      }
    });
    return gridRows.map((element, index) => (
      <Grid key={index} item xs={xs}>
        {element}
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.homeWrapper}>
            <PageTitle variant="h2" align="center">Photos</PageTitle>
            <Box
                display="flex"
                justifyContent="center"
                className={classNames(classes.wrapper/*, "lg-p-top"*/)}
            >
                <div className={classes.blogContentWrapper}>
                <Grid container spacing={3}>
                    {this.getPhotoBoxes()}
                </Grid>
                </div>
            </Box>
        </div>
    );
  }
}

Photos.propTypes = {
  selectTab: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Photos));
