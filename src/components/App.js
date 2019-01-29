import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Header from './header/header';
import NotFound from '../pages/NotFound';
import AddTask from '../pages/AddTask';
import TaskDetail from '../pages/TaskDetail';
import TaskEdit from '../pages/TaskEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add-task" component={AddTask} />
              <Route exact path="/about" component={About} />
              <Route exact path="/task-detail/:id" component={TaskDetail} />
              <Route exact path="/task-edit/:id" component={TaskEdit} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
