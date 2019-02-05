import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Header from './header/header';
import NotFound from '../pages/NotFound';
import AddTask from '../pages/AddTask';
import TaskDetail from '../components/task/TaskDetail';
import TaskEdit from '../components/task/TaskEdit';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import AddProject from './project/AddProject';
import UserDetail from './user/UserDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/add-task" component={AddTask} />
              <Route path="/add-project" component={AddProject} />
              <Route path="/about" component={About} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/user-detail/:id" component={UserDetail} />
              <Route path="/task-detail/:id" component={TaskDetail} />
              <Route path="/task-edit/:id" component={TaskEdit} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
