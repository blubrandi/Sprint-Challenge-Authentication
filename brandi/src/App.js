import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to='/register'>Register | </NavLink>
        <NavLink to='/login'>Login | </NavLink>
        <NavLink to='/jokes'>Jokes | </NavLink>
        {/* <div onClick={logout}>Logout</div> */}
      </header>
    </div>
  );
}

export default App;
