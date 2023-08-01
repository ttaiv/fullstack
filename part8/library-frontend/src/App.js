import { Link, Route, Routes } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const NavigationMenu = () => {
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

  return (
    <div style={menuStyle}>
      <Link to='/' style={linkStyle}>authors</Link>
      <Link to='/books' style={linkStyle}>books</Link>
      <Link to='/addBook' style={linkStyle}>add book</Link>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <NavigationMenu />
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
