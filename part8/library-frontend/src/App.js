import { Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const NavigationMenu = ({ loginSuccesful, handleLogout }) => {
  const menuStyle = {
    background: '#f0f0f0',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
  };

  const logoutStyle = {
    ...linkStyle,
    cursor: 'pointer'
  };

  return (
    <div style={menuStyle}>
      <Link to='/' style={linkStyle}>authors</Link>
      <Link to='/books' style={linkStyle}>books</Link>
      {loginSuccesful &&
        <>
          <Link to='/addBook' style={linkStyle}>add book</Link>
          <Link to='/recommended' style={linkStyle}>recommended</Link>
          <span onClick={handleLogout} style={logoutStyle}>logout</span>
        </>
      }
      {!loginSuccesful && <Link to='/login' style={linkStyle}>login</Link>}
    </div>
  )
}

const App = () => {

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <NavigationMenu loginSuccesful={token !== null} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommended' element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
