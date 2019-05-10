import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import './App.css';

import Register from './components/Register'
import Login from './components/Login'


function App() {
  return (
    <div className="App">
      <header>
        <NavLink to='/register'>Register | </NavLink>
        <NavLink to='/login'>Login | </NavLink>
        <NavLink to='/jokes'>Jokes | </NavLink>
        {/* <div onClick={logout}>Logout</div> */}
      </header>
      <main>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </main>
    </div>
  );
}

export default App;
