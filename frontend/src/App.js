import React, { useContext, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation, useNavigate} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import FriendsList from './components/FriendsList';
import Profile from './components/Profile';
import MusicList from './components/MusicList';
import Registration from './components/Registration';
import SignIn from './components/SignIn';
import Track from './components/Track';
import MusicForm from './components/MusicForm';
import SignUp from './components/SignUp';
import { AppContextProvider, useAppContext } from './AppContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppContextProvider>    
  );
}

function AppRoutes() {
  const {isAuth} = useAppContext()
  const location = useLocation();
  const navigate = useNavigate()
  const shouldShowHeader = (location.pathname !== '/') && (location.pathname !== '/signin') && (location.pathname !== '/signup');
  const shouldShowFooter = (location.pathname !== '/') && (location.pathname !== '/signin') && (location.pathname !== '/signup') && (location.pathname !== '/track') && (location.pathname !== '/connect');
  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [])
  
  return (
    <div className='App'>
      {shouldShowHeader && <Header/>}
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/friends' element={<FriendsList />} />
        <Route path='/music' element={<MusicList />} />
        <Route path='/track' element={<Track />} />
        <Route path='/connect' element={<MusicForm />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {shouldShowFooter && <Footer/>}
    </div>
  )
}


export default App;
