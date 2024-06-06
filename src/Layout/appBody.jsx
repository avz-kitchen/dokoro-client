// AppBody.jsx
import React from "react";
import { Outlet } from "react-router-dom";

function AppBody() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default AppBody;
