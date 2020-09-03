import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      {/* This component would be inside every route */}
      <Navigation/>

      {/* Routes */}
      <div className="container p-4">
        <Route exact path="/" component= {NotesList}/>
        <Route path="/edit/:id" component= {CreateNote}/>
        <Route path="/create" component= {CreateNote}/>
        <Route path="/user" component= {CreateUser}/>
      </div>


    </Router>
  );
}

export default App;
