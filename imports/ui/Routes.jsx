import React from "react";
import { Route } from "react-router-dom";
import { Info, LinkPage, dynamicImport } from "./pages";

const Routes = () => {
  return (
    <>
      <Route path="/" component={Info} exact />
      <Route path="/link/:id" component={LinkPage} />
      <Route path="/dynamicImport" component={dynamicImport} exact />
    </>
  );
};

export default Routes;
