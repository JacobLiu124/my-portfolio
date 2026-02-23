import React from "react";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Projects Page</h1>
      <p>Here you can describe your projects in more detail.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Projects;