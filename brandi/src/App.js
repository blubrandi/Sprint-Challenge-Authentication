import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'

import Register from './components/Register'
import Login from './components/Login'
import Jokes from './components/Jokes'

const AppContainer = styled.div`
  font-family: sans-serif;

  header {
    background-color: #333;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

    a, .Link {
      color: #fff;
      text-decoration: none;
      padding-right: 15px;
      cursor: pointer;
    }
  }
`

function App(props) {

  function logout() {
    localStorage.removeItem('jwt')
    props.history.push('/login')
  }

  return (
    <div className="App">
      <AppContainer>
        <header>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/jokes'>Jokes</NavLink>
          <div className="Link" onClick={logout}>Logout</div>
        </header>
        <main>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/jokes' component={Jokes} />
        </main>
      </AppContainer>
    </div>
  );
}

export default withRouter(App)
