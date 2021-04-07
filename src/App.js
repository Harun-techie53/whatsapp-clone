import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import './App.css';

function App() {
  const [ { user }, dispatch ] = useStateValue();
  return (
    <div className="app">
    {
      !user ? <Login /> : (
      <div className="app__body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
            <Sidebar />
              <Chat />
            </Route>
            <Route path="/">
            <Sidebar 
              user={user} />
              <Chat />
            </Route>
          </Switch>
        </Router>
        
      </div>
      )
    }
    </div>
  );
}

export default App;
