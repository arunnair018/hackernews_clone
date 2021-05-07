import React from "react";
import { Switch, Route } from "react-router-dom";
import Stories from "./Stories";

const Body = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => <Stories type={"newstories"} />} />
      <Route
        exact
        path="/:type"
        render={(props) => <Stories type={props.match.params.type} />}
      />
    </Switch>
  </>
);

export default Body;
