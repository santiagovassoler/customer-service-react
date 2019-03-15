import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CallbackPage from "./pages/callback";
import Auth from "./components/Auth";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  link: createHttpLink({ 
    uri: 'http://localhost:4000/graphql' ,
    request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: Auth.getIdToken(),
      },
    }));
    },
    }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App container">
      <Auth>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/dashboard" component={DashboardPage}/>
              <Route path="/callback" component={CallbackPage}/>
            </Switch>
          </Router>
        </div>
      </Auth>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);