import React, { useState, PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Checkbox, Button, TextField, Grid, Box, isWidthUp, withWidth, withStyles, Link, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import authenticationService from '../../../shared/services/authentication.service';
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

const TaskNumber = withStyles({
  root: {
      color: '#ffffff',
      fontSize: 23,
      paddingTop: 7,
      paddingRight: 20,
  }
})(Typography);

const PageTitle = withStyles({
    root: {
        color: '#ffffff',
        fontWeight: 400,
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

const PlusButton = withStyles({
  root: {
    color: '#ffe65e',
    fontWeight: 100,
    fontSize: 65,
    lineHeight: '0.6',
  },
})(Button);

const SaveNewTaskButton = withStyles({
  root: {
    backgroundColor: '#ffe65e',
    color: '#000000',
    fontSize: 16,
  },
})(Button);

class Photos extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
            images: [],
            errorMessage: false,
            tasks: [],
            showNewTaskField: false,
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            files: [],
      };
      this.taskCheckboxesValues = {};
      this.fieldUpdateTimeout = false;
      this.newTaskField = false;
      this.taskCheckboxes = {};
      this.taskCheckboxesSetters = {};
      this.newTaskStatus = false;
      this.tasksFields = {};

  }
  componentDidMount() {
    const { selectTab } = this.props;
    const { currentUser } = this.state;

    selectTab('Tasks');

    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    userService.getTasks(currentUser.id).then(tasks => {
      this.setState({ tasks });
      this.processTasks(tasks);
    });
  }

  processTasks = (tasks) => {
    tasks.map(task => {
      let checkboxValue = task.completed ? task.completed : false;
      this.setState({ [`checkbox-${task.id}`]: checkboxValue });
      return task;
    })
  }

  saveTask = () => {
    let { errorMessage, userFromApi } = this.state;

    userService.addTask({
      id: userFromApi.id,
      task: {
          description: this.newTaskField.value,
          completed: this.newTaskStatus.checked,
      }
    })
    .then(
        result => {
            userService.getTasks(userFromApi.id).then(tasks => {
              this.setState({ tasks, showNewTaskField: false });
            });
        },
        error => {
            //setSubmitting(false);
            //setStatus(error);
            this.setState({ errorMessage });
        }
    );
  }


  enableNewTaskField = () => {
    this.setState({ showNewTaskField: true });
  }

  handleFieldChange = (evt, taskId) => {
    let { errorMessage, userFromApi } = this.state;

    if (this.fieldUpdateTimeout) {
      clearTimeout(this.fieldUpdateTimeout);
      this.fieldUpdateTimeout = false;
    }

    this.fieldUpdateTimeout = setTimeout(() => {
      userService.updateTask({
        id: userFromApi.id,
        task: {
            id: taskId,
            description: this.tasksFields[taskId].value,
            completed: this.getCheckboxState(taskId), 
        }
      })
      .then(
          result => {
              userService.getTasks(userFromApi.id).then(tasks => this.setState({ tasks }));
          },
          error => {
              //setSubmitting(false);
              //setStatus(error);
              this.setState({ errorMessage });
          }
      );
    }, 500);
  }

  handleCheckboxChange = (evt, taskId) => {
    this.setState({ [`checkbox-${taskId}`]: evt.target.checked });
    let { errorMessage, userFromApi } = this.state;

    userService.updateTask({
      id: userFromApi.id,
      task: {
          id: taskId,
          description: this.tasksFields[taskId].value,
          // do not use state here because it hasn't been updated yet with the most recent checkbox value
          completed: evt.target.checked, 
      }
    })
    .then(
        result => {
            userService.getTasks(userFromApi.id).then(tasks => this.setState({ tasks }));
        },
        error => {
            //setSubmitting(false);
            //setStatus(error);
            this.setState({ errorMessage });
        }
    );
  }

  getCheckboxState = (id) => {
    let value = this.state[`checkbox-${id}`] ? true : false;
    return value;
  }

  getTaskRows = () => {
    const { tasks, showNewTaskField } = this.state;
    const gridRows = [];
    tasks.forEach((task, index) => {
        gridRows.push(
            <Grid key={task.id} item xs={12}>
                <Box display="flex" mb={3}>
                    <TaskNumber variant="body1">{index+1}.&nbsp;</TaskNumber>
                    <CustomTextField
                        required
                        fullWidth
                        id={task.id}
                        inputRef={node => {
                            this.tasksFields[task.id] = node;
                        }}
                        defaultValue={task.description}
                        onChange={evt => this.handleFieldChange(evt, task.id)}
                        name={task.id}
                    />
                    <CustomCheckbox
                        color="secondary"
                        checked={this.getCheckboxState(task.id)}
                        onChange={evt => this.handleCheckboxChange(evt, task.id)}
                        inputRef={node => {
                            this.taskCheckboxes[task.id] = node;
                        }}
                        inputProps={{ 'aria-label': 'completion status' }}
                    />
                </Box>
            </Grid>
        );
    });
    if (showNewTaskField) {
        gridRows.push(
            <Grid key="add" item xs={12}>
                <Box display="flex" mb={3}>
                    <CustomTextField
                        required
                        id="add"
                        inputRef={node => {
                            this.newTaskField = node;
                        }}
                        name="add"
                    />
                    <CustomCheckbox
                        color="secondary"
                        inputRef={node => {
                            this.newTaskStatus = node;
                        }}
                        inputProps={{ 'aria-label': 'completion status' }}
                    />
                </Box>
            </Grid>
        );
    }
    return gridRows.map((element, index) => (
      <Grid key={index} item xs={12}>
        {element}
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;
    const { showNewTaskField } = this.state;

    return (
        <div className={classes.homeWrapper}>
            <PageTitle variant="h2" align="center">Tasks</PageTitle>
            <Box
                display="flex"
                justifyContent="center"
                className={classNames(classes.wrapper/*, "lg-p-top"*/)}
            >
                <div className={classes.blogContentWrapper}>
                    <form onSubmit={this.saveTasks} noValidate>
                        <Grid container spacing={3}>
                            {this.getTaskRows()}
                            <Grid key="add" item xs={12}>
                                { !showNewTaskField &&
                                    <PlusButton onClick={this.enableNewTaskField.bind(this)}>+</PlusButton>
                                }
                                { showNewTaskField && 
                                    <SaveNewTaskButton onClick={this.saveTask.bind(this)}>Save New Task</SaveNewTaskButton>
                                }
                            </Grid>
                        </Grid>
                    </form>
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
