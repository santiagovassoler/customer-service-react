import React, {Component} from 'react';
import Can from "../components/Can";
import TopBar from "../components/TopBar";
import CustomerList from "../components/CustomerList";
import CustomerChart from "../components/CustomerChart";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthConsumer } from "../authContext";
import Forbidden from '../pages/Forbidden';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
  });

class DashboardPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      
   }
  }
  render(){
    const { classes } = this.props;
    return(
         <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="dashboard-page:visit"
        yes={() => (
          <div className={classes.root}>
          <CssBaseline />
            <TopBar/>
           
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h2">
              Orders
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <CustomerChart />
            </Typography>
            <Typography variant="h4" gutterBottom component="h2">
              Customers
            </Typography>
            <div className={classes.tableContainer}>
              <CustomerList />
            </div>
          </main>
          </div>
        )}
        no={() => <Forbidden/>}
      />
    )}
  </AuthConsumer>     
      );
  }

}

export default withStyles(styles)(DashboardPage);