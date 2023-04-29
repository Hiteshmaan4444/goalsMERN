import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    <div>
      <>
        <Router>
          <div className='container'>
            <Header/>
            <Routes>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Dashboard/>}/>
            </Routes>
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;
