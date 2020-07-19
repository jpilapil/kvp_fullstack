import React from "react";

import Navigation from "../ui/Navigation";

export default function AppTemplate(props) {
  return (
    <div>
      <Navigation />
      <div className="container">
        {/* displays everything passed into AppTemplate component */}
        {props.children}
      </div>
    </div>
  );
}
