import React from "react";
import { RouterProvider } from "react-router-dom";
import Routers from "./router/routes";

const App = () => {
  return <RouterProvider router={Routers} />;
};

export default App;