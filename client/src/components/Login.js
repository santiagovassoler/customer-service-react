import React from "react";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AuthConsumer } from "../authContext";

const styles = theme => ({
root: {
      display: 'flex',
    },
  });

const Login = () => (
  <AuthConsumer>
    {({ initiateLogin }) => (
	  <Button 
      fullWidth
 	    variant="contained" 
  		color="primary"  
  		onClick={initiateLogin}>  Log In
      </Button>      
    )}
  </AuthConsumer>
);

export default withStyles(styles)(Login);

