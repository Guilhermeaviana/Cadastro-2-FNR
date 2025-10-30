
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Navibar from './components/template/Navbar';
import Routes from "./routes";
import './global.css';

function App() {
  return (
    <Router>
      <Navibar />
      <main>
        <section>
          {/* Este link para "/" agora abrirá sua página Welcom */}
          <Link to="/">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
              </svg>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L8 2.596l3.75 1.865 2.404-.961L8.186 1.113zM14.154 4.5l-2.404.961L8 7.404l-3.75-1.943L1.846 4.5l-1.846 3.5 2.404.961L8 10.904l3.75-1.943 2.404-.961L14.154 4.5zM1.846 11.5l2.404.961L8 14.404l3.75-1.943 2.404-.961L14.154 8l-2.404.961L8 10.904 4.25 8.961 1.846 8l-1.846 3.5z"/>
              </svg>
            </li>
          </Link>
          <Link to="/categories">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
              </svg>
            </li>
          </Link>
        </section>
        <article>
          <Routes />
        </article>
      </main>
    </Router>
  );
}

export default App;