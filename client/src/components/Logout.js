import React from "react";
import Button from '@material-ui/core/Button';
import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <Button 
 	    variant="contained" 
  		color="secondary"  
  		onClick={logout}>  Log out
      </Button> 
    )}
  </AuthConsumer>
);

export default Logout;