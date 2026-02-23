import "./Hero.css";
import React from "react";

function Hero() {
  return (
    <section style={{ padding: "4rem", textAlign: "center" }}>
      <img
        src="/profile.jpg"
        alt="Jacob Liu"
        style={{ width: "220px", height: "220px", borderRadius: "50%" }}
      />
      <h1>Jacob Liu</h1>
      <p>Software Engineering student focused on backend & full-stack projects.</p>
    </section>
  );
}

export default Hero;