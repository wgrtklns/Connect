import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FriendsList from './components/FriendsList';
import Profile from './components/Profile';
import MusicList from './components/MusicList';
import Registration from './components/Registration';
import SignIn from './components/SignIn';
import Track from './components/Track';
import MusicForm from './components/MusicForm';

function App() {
  return (
    <div>
      <Header/>
      <MusicForm/>
      <Footer/>
    </div>
  );
}


export default App;
