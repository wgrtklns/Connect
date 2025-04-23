import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main authenticated tabs navigator
function MainTabs() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={() => <Footer />}
      >
        <Tab.Screen name="Friends" component={FriendsList} />
        <Tab.Screen name="Music" component={MusicList} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}

// App routes component
function AppRoutes() {
  const { isAuth, authUser } = useAppContext();

  useEffect(() => {
    authUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Track" component={Track} />
            <Stack.Screen name="Connect" component={MusicForm} />
          </>
        ) : (
          <>
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main App component
function App() {
  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
}

App()