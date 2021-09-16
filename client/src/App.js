import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import TeamList from "./Components/Teams/TeamList";
import Nav from "./Components/Navbar/Navbar"
import CreateTeam from './Components/Teams/CreateTeam';
import TeamInfo from './Components/Teams/Teaminfo';
// import './App.css';
import {toast} from 'react-toastify';

toast.configure();

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Switch>
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/login" component={Login} />
          <Route path="/" component={HomePage} />
      
          <Route path="*"><NotFound /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
