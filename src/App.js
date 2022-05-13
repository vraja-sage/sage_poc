import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ConfigurationPage from './Components/ConfigurationPage';
import LayoutsPage from './Components/LayoutsPage';
import DisplayReport from './Components/DisplayReport';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand btn" to="/">
              Home
            </Link>
          </div>
        </nav>

        <div className="container">
          <Switch>
            <Route path="/configuration/:id" component={ConfigurationPage} />
            <Route path="/reportDisplay" component={DisplayReport} />
            <Route path="/" component={LayoutsPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
