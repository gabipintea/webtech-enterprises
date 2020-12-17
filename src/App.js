import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div>
        <Router>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;