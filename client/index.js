import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./components/App";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import "./style/style.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <HashRouter>
          <App>
            <Switch>
              <Route exact path="/" component={() => <SongList />} />
              <Route exact path="/songs/new" component={() => <SongCreate />} />
              <Route
                exact
                path="/songs/:id"
                component={(props) => <SongDetail {...props} />}
              />
            </Switch>
          </App>
        </HashRouter>
      </ApolloProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
