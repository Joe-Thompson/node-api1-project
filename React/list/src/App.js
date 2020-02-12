import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import UpdateForm from './Components/UpdateForm';
import CreateForm from './Components/CreateForm';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/update/:id" component={UpdateForm} />
      <Route exact path="/create" component={CreateForm} />
    </div>
  );
}

export default App;
