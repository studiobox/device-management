import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/login'
import LandingPage from './pages/LandingPage'
import Subscription from './components/Subscription'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={login} />
          <Route path="/" component={LandingPage} />
          >
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
