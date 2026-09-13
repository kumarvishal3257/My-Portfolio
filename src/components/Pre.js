import React from "react";

function Pre({ load }) {
  if (!load) return null;
  return <div id="preloader" />;
}

export default Pre;
