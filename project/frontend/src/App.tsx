import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingSpinner from './components/UI/LoadingSpinner';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <h1>Welcome to the Frontend Application</h1>
            <LoadingSpinner size="lg" />
          </Route>
          {/* Additional routes can be added here */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;