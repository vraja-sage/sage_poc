import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ConfigurationPage from './Components/ConfigurationPage';
import LayoutsPage from './Components/LayoutsPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand btn" to="/">
              Home
            </Link>
          </div>
        </nav>

        <div className="mt-5 pt-5 container">
          <Switch>
            <Route path="/configuration/:id" component={ConfigurationPage} />
            <Route path="/" component={LayoutsPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
