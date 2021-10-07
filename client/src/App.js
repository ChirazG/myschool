import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Admin from './pages/Admin';
import TeacherProfile from './pages/TeacherProfile';
import { PrivateRoute } from './pages/PrivatrRoute';
import Password from './pages/Password';
import LoginAdmin from './pages/LoginAdmin';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/loginadmin' component={LoginAdmin} />
          <Route path='/login' component={Login} />
          <Route exact path="/password-reset" component={Password} />
          <PrivateRoute exact path='/admin' component={Admin} />
          <PrivateRoute path='/teacherprofile/:{user.id}' role="teacher" component={TeacherProfile} />
          <PrivateRoute path='/profile/:{user.id}' role="student" component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;