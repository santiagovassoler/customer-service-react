import React, {Component} from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "../constants/auth0-variables";
import { AuthProvider } from "../authContext";


const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: 'https://svapps.eu.auth0.com/userinfo',
  responseType: "token id_token",
  scope: 'openid profile read:current_user user_metadata app_metadata',
});

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
    authenticated: JSON.parse(localStorage.getItem('authenticated')) || false,
    user: JSON.parse(localStorage.getItem('user')) || '',
  }
  
}
 
  initiateLogin = () => {
    auth.authorize();
  };

  
  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },  
    });
     localStorage.clear();
     auth.logout({
      returnTo: 'http://localhost:3000/',
      client_id: AUTH_CONFIG.clientId
    });
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} Occured`);
        return;
      }
      this.setSession(authResult.idTokenPayload);
    });
  };

  setSession(data) {
    const user = {
      id: data.sub,
      email: data.email,
      role: data["https://svapps:eu:auth0:com/roleapp_metadata"].role
    };
    this.setState({
      authenticated: true,
      user
    });
    localStorage.setItem("authenticated", true)
    localStorage.setItem('user', JSON.stringify(user))
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
