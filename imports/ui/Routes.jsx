import React from "react";
import { Route } from "react-router-dom";
import { Info, LinkPage } from "./pages";

const Routes = () => {
  return (
    <>
      <Route path="/" component={Info} exact />
      <Route path="/link/:id" component={LinkPage} />
    </>
  );
};

export default Routes;
