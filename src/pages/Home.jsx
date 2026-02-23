import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      <Hero />
      <section style={{ padding: "2rem" }}>
        <h2>Projects</h2>
        <div>
          <h3>Expense Tracker</h3>
          <p>Spring Boot + PostgreSQL backend with JWT auth.</p>
          <Link to="/projects">View Details</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;