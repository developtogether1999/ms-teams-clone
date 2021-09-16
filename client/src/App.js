import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import Assignments from './routes/Assignments';

import { Tabs } from 'react-bootstrap';
import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  return (
    <div className="App">
      <Tabs/>
       <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/auth/register" component={Register} />
        <Route path="/Assignments" component={Assignments} />
        <Route path="/auth/login" component={Login} />
        <Route path="*"><NotFound /></Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
