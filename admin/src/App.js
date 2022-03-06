import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import LandingPage from "./pages/landingpage/LandingPage";
import NewUser from "./pages/newUser/NewUser";
import CharityList from "./pages/charityList/CharityList";
import Charity from "./pages/Charity/Chairty";
import NewCharity from "./pages/newCharity/NewCharity";
import NewHelp from "./pages/newHelp/NewHelp";
import Login from "./pages/login/Login";
import HelpList from "./pages/helpList/HelpList";
import Help from "./pages/Help/Help"
import ReactNotification from 'react-notifications-component'
import { useSelector } from "react-redux";
import 'react-notifications-component/dist/theme.css'
import NotFoundPage from "./pages/404page/NotFoundPage";

function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin );
  return (
    <Router>
      
      <Switch>
         <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/newhelp">
          <NewHelp />
        </Route>
        <Route path="/login">
          <Login /> 
        </Route>
       
        
        {admin && (
          <>
            <Topbar/>
            <div className="container">
              <Sidebar/>
              <Route exact path="/dashboard">
                <Home />
              </Route>
              <Route path="/donors">
                <UserList />
              </Route>
              
              <Route path="/donor/:donorId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/Charities">
                <CharityList />
              </Route>
              <Route path="/Charity/:CharityId">
                <Charity />
              </Route>
              <Route path="/newCharity">
                <NewCharity />
              </Route>
              <Route path="/helps">
                <HelpList />
              </Route>
              <Route path="/help/:helpId">
                <Help />
              </Route>
              <ReactNotification />
            </div>
       
          </>
        )}
       
      </Switch>
    
    </Router>
  );
}

export default App;
