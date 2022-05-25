import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DisplayReport from './Components/DisplayReport';

function App() {
  return (
    <Router>
        <div className="container">
          <Switch>
            <Route path="/reportDisplay" component={DisplayReport} />
            <Route path="/" component={DisplayReport} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
