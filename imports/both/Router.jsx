import { Meteor } from "meteor/meteor";

let Router = null;

if (Meteor.isServer) {
  import { StaticRouter } from "react-router-dom";
  Router = StaticRouter;
} else {
  import { BrowserRouter } from "react-router-dom";
  Router = BrowserRouter;
}

export default Router;
