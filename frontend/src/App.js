import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation} from 'react-router-dom'

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
import { AppContextProvider } from './AppContext';

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
  const location = useLocation();
  const shouldShowNavigation = (location.pathname !== '/') && (location.pathname !== '/signin') && (location.pathname !== '/signup');

  return (
    <div className='App'>
      {shouldShowNavigation && <Header/>}
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
      {shouldShowNavigation && <Footer/>}
    </div>
  )
}


export default App;
