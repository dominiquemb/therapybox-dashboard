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


const CustomTextField = withStyles({
    root: {
      display: 'inline-flex',
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

const SearchButton = withStyles({
  root: {
    backgroundColor: '#ffe65e',
    color: '#000000',
    fontSize: 16,
    display: 'inline-flex',
    marginLeft: 40,
  },
})(Button);

class Sport extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
            teams: [],
      };
      this.query = {};
  }
  componentDidMount() {
    const { selectTab } = this.props;

    selectTab('Sport');
  }

  getLosingTeams = (evt) => {
    evt.preventDefault();
    let winningTeam = this.query.value;
    userService.getLosingTeams(winningTeam).then(teams => {
      this.setState({ teams });
    });
  }

  getTeamList = () => {
    const { teams } = this.state;
    const gridRows = [];
    teams.forEach((team, index) => {
        gridRows.push(
              <ListItemText>{team}</ListItemText>
        );
    });
    return gridRows.map((element, index) => (
      <ListItem>
        {element}
      </ListItem>
    ));
  };

  render() {
    const { classes } = this.props;
    const { teams } = this.state;
    const { value: winningTeam } = this.query;
    let showTeams = false;

    if (teams.length) {
      showTeams = true;
    }

    return (
        <div className={classes.homeWrapper}>
            <PageTitle variant="h2" align="center">Champion's League Challenge</PageTitle>
            <Box
                display="flex"
                justifyContent="center"
                className={classNames(classes.wrapper)}
            >
                <div className={classes.blogContentWrapper}>
                  <form className={classes.form} onSubmit={evt => this.getLosingTeams(evt)} noValidate>
                        <Grid container spacing={3}>
                            <Grid key="teams" item xs={12}>
                              <Box display="flex" mb={3}>
                                <CustomTextField
                                    required
                                    id="query"
                                    placeholder="Input winning team name"
                                    inputRef={node => {
                                        this.query = node;
                                    }}
                                    name="query"
                                />
                                <SearchButton type="submit">Search</SearchButton>
                              </Box>
                            </Grid>
                            <Grid key="teams" item xs={12}>
                              { showTeams && 
                                <Typography variant="body2">{`${winningTeam}`} has beat the following teams:</Typography>
                              }
                            </Grid>
                            <Grid key="teams" item xs={12}>
                              <List>
                                {this.getTeamList()}
                              </List>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Box>
        </div>
    );
  }
}

Sport.propTypes = {
  selectTab: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Sport));
