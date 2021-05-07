import React from "react";
import { Switch, Route } from "react-router-dom";
import { storyTypes } from "../../utilities/Constants";
import PageNotFound from "./PageNotFound";
import Stories from "./Stories";

const Body = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => <Stories type={storyTypes.NEW} />} />
      <Route
        exact
        path="/:type"
        render={(props) => <Stories type={props.match.params.type} />}
      />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Body;
