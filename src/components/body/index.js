import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopStories from "./TopStories";
import BestStories from "./BestStories";
import NewStories from "./NewStories";

const Body = () => (
  <>
    <Switch>
      <Route exact path="/" component={TopStories} />
      <Route path="/newstories" component={NewStories} />
      <Route path="/beststories" component={BestStories} />
    </Switch>
  </>
);

export default Body;
