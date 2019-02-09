import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Header from './header/header';
import NotFound from '../pages/NotFound';
import AddTask from './task/AddTask';
import TaskDetail from '../components/task/TaskDetail';
import TaskEdit from '../components/task/TaskEdit';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import AddProject from './project/AddProject';
import UserDetail from './user/UserDetail';
import SideNav from './sidenav/SideNav';
import UsersPage from '../pages/UsersPage';
import TasksPage from '../pages/TasksPage';
import ProjectsPage from '../pages/ProjectsPage';
import Footer from '../components/footer/footer';
import projectDetail from './project/projectDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="content">
            <SideNav />
            <div className="main">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  {/* <Route path="/add-task" component={AddTask} /> */}
                  <Route path="/add-task/:idProj?" component={AddTask} />
                  <Route path="/add-project" component={AddProject} />
                  <Route path="/projects-page" component={ProjectsPage} />
                  <Route path="/project-detail/:id" component={projectDetail} />
                  <Route path="/about" component={About} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/user-detail/:id" component={UserDetail} />
                  <Route path="/users-page" component={UsersPage} />
                  <Route path="/task-detail/:id" component={TaskDetail} />
                  <Route path="/task-edit/:id" component={TaskEdit} />
                  <Route path="/tasks-page" component={TasksPage} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
